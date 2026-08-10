
import express from 'express';
import songRoutes from "./routes/songRoutes"
import commentRoutes from "./routes/commentRoutes"
import userRoutes from "./routes/userRoutes"
import authRoutes from "./routes/authRoutes"

const app = express();

app.use(express.json());
app.use("/api/authRoutes", authRoutes)
app.use("/api/userRoutes", userRoutes)
app.use("/api/songRoutes", songRoutes)
app.use("/api/commentRoutes", commentRoutes)



export default app;
