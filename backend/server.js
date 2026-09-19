import app from "./app.js";
import cloudinary from "cloudinary";
import cors from "cors";

// CORS Configuration
app.use(
  cors({
    origin: [
      /https:\/\/job-portal-.*\.vercel\.app$/,
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${PORT} busy, trying ${PORT + 1}...`);
    app.listen(PORT + 1, () => {
      console.log(`Server running at port ${PORT + 1}`);
    });
  } else {
    throw err;
  }
});