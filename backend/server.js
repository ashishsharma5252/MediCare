import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import doctorRouter from "./routes/doctorRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import serviceAppointmentRouter from "./routes/serviceAppointmentRoute.js";

const app = express();
const port = process.env.PORT || 6000;

const allowedOrigins = ["https://medicareashish.netlify.app", "https://medicareashish2.netlify.app"];

// middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(clerkMiddleware());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// DB
connectDB();

// Routes
app.use("/api/doctors", doctorRouter);
app.use("/api/services", serviceRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/service-appointments", serviceAppointmentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
