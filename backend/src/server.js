import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
//console.log("ENV:",process.env.MONGO_URI);

const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
//sample custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });
if(process.env.NODE_ENV !== "production"){
    app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
}

app.use(express.json())
app.use(rateLimiter);
//app.use(cors());

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist"))); // dist is optimized react application
    // if we get any route other than our designated routes(/api/notes/)
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

connectDB().then(()=>{
    app.listen(PORT,() => {
        console.log("Server started on PORT : 5001");
    });
});