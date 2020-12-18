import express from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "express-jwt";
import { readData, addData, entryFile } from "../lib/middleware/dataHandler.js";

const router = express.Router();

// DO NOT EDIT ABOVE, unless adding new imports.

router.post("/", async (req, res, next) => {
  try {
    req.body.id = uuidv4();
    await addData(entryFile, req.body);
    return res.status(200).json(req.body);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//JWT validation -- only authenticated JWT can access GETs after this point

router.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

router.get("/", async (req, res, next) => {
  try {
    let data = await readData(entryFile);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let data = await readData(entryFile);
    const entryID = data.find((entry) => entry.id == req.params.id);

    if (!entryID) {
      return res.status(404).send(`{ message: "entry ${req.params.id} not found" }`);
    } else res.status(200).send(entryID);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DO NOT EDIT BELOW
export default router;
