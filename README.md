# FS1020 Course Project

FS1020 Course Project - RESTful API for contact info

This will create a RESTful API for a 'contact us' form.

Use 'npm start' to start the app listening on port 3000--accessible at http://localhost:3000.
    Configure the .env to change port numbers JWT Secret.
    Routes to POST a user or Auth a user are in src/usersRoutes.js
    Routes to POST a new contact us entry or to GET existing entries are in src/entriesRoutes.js
Use 'npm dev' to start the app with nodemon to allow for auto-restarts upon editing/saving any of the core documents

Persistant data will be stored in a JSON file and accessed via FS (note: file not created yet)

Entries can be created at POST /contact_form/entries
    New entries require the following properties:
    "name": 
    "email": // should be a valid email address
    "phoneNumber": 
    "content":

Users can be added with POST /users
    New entries require:
    "name": 
    "password":  // must be minimum 8 characters
    "email"" // should be a valid email address

Registered Users need to call POST /auth to be provided with a valid JWT token
    Required request to contain existing user data:
    "email"
    "password"

All existing contact entries can be retrieved via GET /contact_form/entries 
    User must be logged in and provide the JWT they rec'd from the POST /auth transaction

Specific contact entries can be retreved via ID with GET /contact_form/entries/:id
    User must be logged in and provide the JWT they rec'd from the POST /auth transaction and the specific ID of the entry to view

    /lib/middleware/authMw.js contains the authorization middleware that hashes the users email when a new user is added, it ensures the user's email and password match when logging in.
    /lib/middleware/validateMw.js contains the request validation middleware which confirms all the right properties are included in the various POST requests and that the content is valid.
    




