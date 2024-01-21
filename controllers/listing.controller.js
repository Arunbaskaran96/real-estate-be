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
      if (list.userRef !== req.user._id)
        return next(errorHandler(404, "You can get only your listing"));
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
