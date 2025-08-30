const express = require("express");
const upload = require("../config/multer.config");
const router = express.Router();
const fileModel = require("../models/files.models");
const auth = require("../middlewares/auth");
const cloudinary=require('../config/cloudinary.config')
router.get("/home", auth, async (req, res) => {
  const files = await fileModel.find({ user: req.user.userid });
  res.render("home", { files: files });
});
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.user.userid) {
      return res.status(400).json({
        message: "Missing file or user info",
      });
    }
  const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: `your-folder-name/${req.file.filename}`,
      type: "authenticated"
    });

    const newfile = await fileModel.create({
      public_id: req.file.filename,
      url: req.file.path,
      originalname: req.file.originalname,
      user: req.user.userid,
    });
    res.status(201).json(newfile);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});
router.get("/download/:public_id", auth, async (req, res) => {
  const loggedinuserid = req.user.userid;
  const public_id = decodeURIComponent(req.params.public_id);
  console.log("User:", loggedinuserid, "File:", public_id);
  console.log("🔎 Looking for publicId:", public_id);
console.log("📁 File paths in DB:", await fileModel.find({ user:loggedinuserid }));

  const file = await fileModel.findOne({
    user: loggedinuserid,
    public_id: public_id,
  });
  if (!file) return res.status(401).json({ msg: "unauthorized" });
  const correctedPublicId = public_id.endsWith('.jpg.jpg') ? public_id : `${public_id}.jpg`; // OR fetch the actual one from DB
const signedUrl = cloudinary.url(correctedPublicId, {
  type: "authenticated",
  secure: true,
  sign_url: true,
  expires_at: Math.floor(Date.now() / 1000) + 120,
});

  res.redirect(signedUrl);
});
module.exports = router;
