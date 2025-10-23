import express, { Request, Response } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import Hotel, { HotelType } from "../models/Hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

// @route POST /api/my-hotels
// @desc Create a new hotel
// @access Private
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilites is required"),
  ],
  upload.array("imageFiles", 10),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //1. upload the images to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataUri = `data:${image.mimetype};base64,${b64}`;
        const res = await cloudinary.v2.uploader.upload(dataUri);
        return res.url;
      });

      //2. if upload was successful, add the URLs to the new hotel
      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //3. save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      //4. return a 201 status
      res.status(201).json({ message: "Hotel created successfully", hotel });
    } catch (error) {
      console.error("Error creating hotels:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;