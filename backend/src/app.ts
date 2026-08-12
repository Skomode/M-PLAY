
import express from 'express';
import songRoutes from "./routes/songRoutes"
import commentRoutes from "./routes/commentRoutes"
import userRoutes from "./routes/userRoutes"
import authRoutes from "./routes/authRoutes"
import uploadRoutes from "./routes/uploadRoutes";

const app = express();

app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/song", songRoutes)
app.use("/api/comment", commentRoutes)



export default app;
