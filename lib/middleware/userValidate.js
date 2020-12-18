import { readData, userFile } from "./dataHandler";

// Finds the existing stored email and adds a req.user of 0 or 1 if the user exists.  Adds the hashed password to the req if user exists

const emailCheck = async (req, res, next) => {
  try {
    let currentUsers = await readData(userFile);
    let userExists = currentUsers.find((user) => user.email == req.body.email);

    if (!userExists) {
      req.user = 0;
    } else {
      req.user = 1;
      req.hashPass = userExists.hashedPassword;
    }
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Sends error if /Auth user doesn't exists or if /Users does exist 

const doesUserExist = (req, res, next) => {
  if (req.path == "/users" && req.user == 1) {
    return res.status(400).send({ message: "User already exists.  Please login" });
  }
  if (req.path == "/auth" && req.user == 0) {
    return res.status(401).json({ message: "incorrect credentials provided" });
  }
  next();
};

export { doesUserExist, emailCheck };
