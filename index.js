import express from "express";
import entries from "./src/entriesRoutes.js";
import users from "./src/usersRoutes.js";
import hasAllProps from "./lib/middleware/propsValidate";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware to validate appropriate fields are sent and they contain appropriate data

app.use(hasAllProps);

app.use("/contact_form/entries", entries);

app.use("/", users);

//Error handlers

app.use((req, res, next) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.error(err);
    res.status(403).json({ message: err.inner.message });
  } else {
    console.error(err.stack);
    return res
      .status(500)
      .send({ error: "An unexpected error has ended this request" });
  }
});

export default app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}.`);
});
