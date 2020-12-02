const authProp = [ "email", "password" ]
const entryProp = [ "name", "email", "phonenumber", "content" ]
const userProp = [ "name", "email", "password" ]

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

const validateProps = (req) => {
    let errors = []
    let neededProp = rightProps(req)
    const missingProp = neededProp.filter( key => !Object.keys(req.body).includes(key) );
    if (missingProp.length > 0){
        missingProp.forEach( prop => errors.push(prop) );
    }
    return errors
}

const hasAllProps = (req, res, next) => {
    console.log(req.method != "GET")
    let errors = validateProps(req)
    if (errors.length > 0 && req.method != "GET") {
    return res.status(400).send( { message:"validation error", errors } )
    }
    next()
}

export default hasAllProps