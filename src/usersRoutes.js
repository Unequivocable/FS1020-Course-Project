import express from "express";
import { v4 as uuidv4 } from "uuid";
import jwtGenerator from "jsonwebtoken";
import {
  getHash,
  verifyHash,
  emailExists,
  doesUserExist,
} from "../lib/middleware/auth";
import {
  addData,
  userFile
} from "../lib/middleware/dataHandler.js"

const router = express.Router();

// DO NOT EDIT ABOVE, unless adding new imports.

router.post("/auth", emailExists, (req, res) => {
  const email = req.body.email;

  verifyHash(req.hashPass, req.body.password).then((match) => {
    if (match) {
      const token = jwtGenerator.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      return res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "incorrect credentials provided" });
    }
  });
});

router.post("/users", doesUserExist, async (req, res) => {
  req.body.id = uuidv4();
  const newReq = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
  };

  req.body.hashedPassword = await getHash(req.body.password);
  delete req.body.password;
  res.status(200).json(newReq);
  await addData(userFile, req.body);
});

// DO NOT EDIT BELOW
export default router;
