import argon2, { hash } from "argon2";
import {
  readData,
  userFile
} from "./dataHandler"


//Hashes the password

async function getHash(password) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.error(err);
    throw (err)
  }
}

//Verifies the stored hashed password and returns true or false

async function verifyHash(hashedPass, reqPass) {
  try {
    return await argon2.verify(hashedPass, reqPass)
  } catch (err) {
    console.error(err);
    throw (err)
  }
}

// Finds the existing stored email and returns the hashed password associated with it

const finder = async (findValue) => {
  let content = await readData(userFile)
  let findEmail = content.find((user) => user.email == findValue);

  if (findEmail) {
    return findEmail.hashedPassword;
  }
};

//Figure out which of these i really need -- emailExists, doesUserExist and finder -- and be more consistent in where the res.statuses are applied (is it here or in the actual route?)  ******************************

const emailExists = async (req, res, next) => {
  const hashPass = await finder(req.body.email);

  if (!hashPass) {
    res.status(401).json({ message: "incorrect credentials provided" });
  } else {
    req.hashPass = hashPass;
    next();
  }
};

const doesUserExist = async (req, res, next) => {
  const userExists = await finder(req.body.email);

  if (userExists) {
    res.status(400).send({ message: "User already exists.  Please login" });
  } else {
    next();
  }
};

export { emailExists, getHash, verifyHash, doesUserExist };
