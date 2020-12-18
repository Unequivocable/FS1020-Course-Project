import argon2, { hash } from "argon2";

//Hashes the password

async function getHash(password) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//Verifies the password against the hashed password and returns true or false

async function verifyHash(hashedPass, reqPass) {
  try {
    return await argon2.verify(hashedPass, reqPass);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { getHash, verifyHash };
