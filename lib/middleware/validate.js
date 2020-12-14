const authProp = ["email", "password"];
const entryProp = ["name", "email", "phoneNumber", "content"];
const userProp = ["name", "email", "password"];

//Check which path the request is coming in on and based on that, pull the array that matches which properties should be in that sort of request

const rightProps = (req) => {
  if (req.path == "/auth") {
    return authProp;
  } else if (req.path == "/contact_form/entries") {
    return entryProp;
  } else if (req.path == "/users") {
    return userProp;
  }
  return [];
};

// This function checks the format of the properties that should be in the request call.
//     Name and content are just validated that they have content in them.
//     Phonenumber checks that there are ten numbers (phone number formatting could be controlled on the frontend).
//     Email check is super basic and was pulled from a Wired.com article.
//     Password is checking it's minimum 8 characters.

//Look at creating validation object that will check this*******************  example
// const authProp = [{
//     "name": "email",
//     "type": "email"
//  }, {
//     "name": "password",
//     "type": "password",
//     "minLength": 8
//  }]
 
//  const entryProp = [{
//      "name": "name",
//      "type": "text",
//      "minLength": 1
//  }...
 

const checkProps = (req) => {
  let containsProp = rightProps(req);
  let invalidProp = [];

  if (
    containsProp.includes("name") &&
    (req.body.name == null ||
      /^\s+$/.test(req.body.name) ||
      req.body.name == "")
  ) {
    invalidProp.push("name");
  }

  if (
    containsProp.includes("content") &&
    (req.body.content == null ||
      /^\s+$/.test(req.body.content) ||
      req.body.content == "")
  ) {
    invalidProp.push("content");
  }

  if (
    containsProp.includes("email") &&
    (req.body.email == null ||
      !/.+\@.+\..+/.test(req.body.email) ||
      req.body.email == "")
  ) {
    invalidProp.push("email");
  }

  if (
    containsProp.includes("password") &&
    (req.body.password == null ||
      !/^\w{8,}$/.test(req.body.password) ||
      req.body.password == "")
  ) {
    invalidProp.push("password");
  }

  if (
    containsProp.includes("phoneNumber") &&
    (req.body.phoneNumber == null ||
      !/^\d{10}$/.test(req.body.phoneNumber) ||
      req.body.phoneNumber == "")
  ) {
    invalidProp.push("phoneNumber");
  }
  return invalidProp;
};

// This middleware collects the two arrays from validateProps (which fields are missing) and checkProps (which fields have invalid data) and sends errors messages based on those.

const hasAllProps = (req, res, next) => {
  let invalid = checkProps(req);

  if (invalid.length > 0 && req.method != "GET") {
    return res.status(400).send({ message: "validation error", invalid });
  }
  next();
};

export default hasAllProps;
