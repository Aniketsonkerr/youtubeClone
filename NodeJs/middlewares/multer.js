import multer from "multer";

const storage = multer.diskStorage({
  // Optionally constrain upload location
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const upload = multer({ storage });
