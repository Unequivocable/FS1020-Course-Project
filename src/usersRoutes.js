import express from "express";
import { v4 as uuidv4 } from "uuid";
import jwtGenerator from "jsonwebtoken";
import { getHash, verifyHash } from "../lib/middleware/hashHandlers";
import { doesUserExist, emailCheck } from "../lib/middleware/userValidate";
import { addData, userFile } from "../lib/middleware/dataHandler.js";

const router = express.Router();

// DO NOT EDIT ABOVE, unless adding new imports.

router.use(emailCheck, doesUserExist);

router.post("/auth", async (req, res, next) => {
  try {
    if (await verifyHash(req.hashPass, req.body.password)) {
      const token = jwtGenerator.sign( { email: req.body.email }, process.env.JWT_SECRET, { expiresIn: "15m" } );
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "incorrect credentials provided" });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/users", async (req, res, next) => {
  try {
    req.body.id = uuidv4();
    const newReq = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
    };

    req.body.hashedPassword = await getHash(req.body.password);
    delete req.body.password;
    await addData(userFile, req.body);
    return res.status(200).json(newReq);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DO NOT EDIT BELOW
export default router;
