# FS1020 Course Project

Course Project - RESTful API for contact info

This was a project for creating RESTful API for a 'contact us' form.

Use 'npm start' to start the app listening on port 3000--accessible at http://localhost:3000.
    Configure the index.js to change port numbers or listening details.
    Configure the routes.js to edit/change route details
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

Registered Users will be logged in via POST /auth
    Required request to contain existing user data:
    "email"
    "password"

All existing contact entries can be retrieved via GET /contact_form/entries 
    User must be logged in and have an Authorization: bearer token

Specific contact entries can be retreved via ID with GET /contact_form/entries/:id
    User must be logged in and have an Authorization: bearer token
    




