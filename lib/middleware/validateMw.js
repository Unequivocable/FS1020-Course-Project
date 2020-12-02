const authProp = [ "email", "password" ]
const entryProp = [ "name", "email", "phonenumber", "content" ]
const userProp = [ "name", "email", "password" ]

//Check which path the request is coming in on and based on that, pull the array that matches which properties should be in that sort of request--otherwise it returns 'not found'

const rightProps = req => {
    if ( req.path == "/auth" ){
        return authProp
    }else if ( req.path == "/contact_form/entries" ){
        return entryProp
    } else if ( req.path == "/users" ){
        return userProp
    }
    return ["Not Found"]
}


//Pulls the properties that should be in the request based on the path and checks that they all exist in the request.
// Returns an array of errors for fields that are missing

const validateProps = (req) => {
    let errors = []
    let neededProp = rightProps(req)
    const missingProp = neededProp.filter( key => !Object.keys(req.body).includes(key) );
    if (missingProp.length > 0){
        missingProp.forEach( prop => errors.push(prop) );
    }
    return errors
}

// This function checks the format of the properties that should be in the request call.  
//     Name and content are just validated that they have content in them.  
//     Phonenumber checks that there are ten numbers (phone number formatting could be controlled on the frontend).  
//     Email checks that there is data then "@" more data then "." then more data (further email validation could also be done on the frontend (or adding npm libraries to check SMTP servers).  
//     Password is checking it's minimum 8 characters.  
//  I wanted to keep each validation broken out separately so these validation rules could more easily be changed per field if required.
//  Returns array of errors of fields that are invalid

const checkProps = (req) => {
    let containsProp = rightProps(req)
    let invalidProp = []

    if (containsProp.includes("name") && ( req.body.name == null || /^\s+$/.test(req.body.name) || req.body.name == "" )){
        invalidProp.push("name")
    }

    if (containsProp.includes("content") && ( req.body.content == null || /^\s+$/.test(req.body.content) || req.body.content == "" )){
        invalidProp.push("content")
    }

    if (containsProp.includes("email") && req.body.email == null || /^\s+$/.test(req.body.email)){
        invalidProp.push("email")
    }
    if (containsProp.includes("password") && req.body.password == null || !/^\w{8,}$/.test(req.body.password)){
        invalidProp.push("password")
    }
    if (containsProp.includes("phonenumber") && req.body.phonenumber == null || !/^\d{10}$/.test(req.body.phonenumber)){
        invalidProp.push("phonenumber")        
    }
    return invalidProp
}

// This middleware collects the two arrays from validateProps (which fields are missing) and checkProps (which fields have invalid data) and sends errors messages based on those.


const hasAllProps = (req, res, next) => {
    let errors = validateProps(req)
    let invalid = checkProps(req)

    if (invalid.length > 0){
    errors.push(invalid)
    }

    if (errors.length > 0 && req.method != "GET") {
    return res.status(400).send( { message:"validation error", errors } )
    }
    next()
}

export default hasAllProps