import listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errorhandler.js";

export const createListing = async (req, res, next) => {
  try {
    const newListing = await listing.create(req.body);
    res.status(200).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const deletelisting = async (req, res, next) => {
  try {
    const checklisting = await listing.findById(req.params.id);
    if (checklisting) {
      if (checklisting.userRef !== req.user._id)
        return next(errorHandler(404, "You can edit only your listings"));
      await listing.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "listing has been deleted" });
    } else {
      return next(errorHandler(404, "Listing not found!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getlist = async (req, res, next) => {
  try {
    const list = await listing.findById(req.params.id);
    if (list) {
      const data = await listing.findById(req.params.id);
      res.status(200).json(data);
    } else {
      return next(errorHandler(404, "Listing not found!"));
    }
  } catch (error) {
    next(error);
  }
};

export const updatelisting = async (req, res, next) => {
  try {
    const list = await listing.findById(req.params.id);
    if (list) {
      if (list.userRef !== req.user._id) {
        return next(errorHandler(404, "You can get only your listing"));
      }
      const data = await listing.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(data);
    } else {
      return next(errorHandler(404, "Listing not found!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";
    const lists = await listing
      .find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(lists);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
