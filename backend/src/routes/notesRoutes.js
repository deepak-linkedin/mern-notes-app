import express from "express";
import { getAllNotes,getNoteById,createNote,updateNote,deleteNote } from "../controllers/notesController.js"; 

const router = express.Router();

router.get("/",getAllNotes);

router.get("/:id",getNoteById);

router.post("/",createNote);

router.put("/:id",updateNote);

router.delete("/:id",deleteNote);

export default router; 

//mongodb+srv://vitiandeepak23_db_user:KRoLFBUCElWlQYTp@cluster0.tn2mz6m.mongodb.net/?appName=Cluster0