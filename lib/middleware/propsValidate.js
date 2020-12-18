// Required fields for each route type.

const authProp = ["email", "password"];
const entryProp = ["name", "email", "phoneNumber", "content"];
const userProp = ["name", "email", "password"];

// Regex validation format expected for each required property type

const format = {
  email: ".+\\@.+\\..+",
  password: "^\\w{8,}$",
  phoneNumber: "^\\d{10}$",
  name: "^\\S[a-zA-Z0-9,.!? ]*$",
  content: "^\\S[a-zA-Z0-9,.!? ]*$",
};

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

// Validate format from Format array against required fields in props arrays

const hasAllProps = (req, res, next) => {
  let containsProp = rightProps(req);
  let invalidProp = [];

  containsProp.forEach((prop) => {
    let thisFormat = new RegExp(format[prop]);
    if (!thisFormat.test(req.body[prop]) || !req.body[prop])
      invalidProp.push(prop);
  });
  if (invalidProp.length > 0 && req.method != "GET") {
    return res.status(400).send({ message: "validation error", invalidProp });
  }
  next();
};

export default hasAllProps;
