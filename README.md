# FS1020 Course Project

FS1020 Course Project - RESTful API for contact info

This will create a RESTful API for a 'contact us' form.

Setup:
1. Install all dependencies with 'npm install'
2. Create a .env file with the following parameters:
    PORT = //set to port to listen on
    JWT_SECRET = //will be used to generate your JWT
    USER_FILE_LOCATION=./data/users.json  //this will be where your user data is stored
    ENTRY_FILE_LOCATION=./data/entries.json //this will be where your contact form submissions are stored
3. Create two files named 'users.json' and 'entires.json' in the location you specify in the .env and ensure both files contain an empty array [].

Use 'npm start' to start the app listening on port 3000--accessible at http://localhost:3000.

Use 'npm dev' to start the app with nodemon to allow for auto-restarts upon editing/saving any of the core documents

Middleware:
    dataHandler.js configures the read/write functions agains the .json files
    hashHanders.js manages hashing passwords and verifying hashed passwords
    userValidate.js checks the incoming email address to see if the user already exists in the users.json file
    propsValidate.js validates incoming properties on requests to ensure the required fields are there and in appropriate format
        NOTE: If new properties need to be added to any of the requests the new field name would be added to the appropriate array depending on which route it's expected in.  The required format would also be added to the Format array in regExp format.          

    Routes to POST a user or Auth a user are in src/usersRoutes.js
    
    
Routes to POST a new contact us entry or to GET existing entries are in src/entriesRoutes.js

Entries can be created by sending a POST request to /contact_form/entries
    New entries require the following properties:
    "name":  // any valid string
    "email": // should be a valid email address in string@string.string format
    "phoneNumber": // ten digits -- no extra characters
    "content": // any valid string

A user with a valid JWT can access entries by sending a GET request to /contact_form/entries or /contact_form/entries/:id with a valid entry ID.  A valid JWT must be sent in the Bearer Token header.

Routes to add a new user or Auth an existing user are in src/usersRoutes.js

A new Users can be added by sending a POST request to /users
    New entries require:
    "name": // any valid string
    "password":  // must be minimum 8 characters
    "email"" // should be a valid email address in string@string.string format

Existing Users need to send a POST request to /auth to be provided with a valid JWT token
    Required request to contain existing user data:
    "email" // should be a valid email address in string@string.string format and already exist in the users.json database
    "password" // must match original password sent when user was setup





