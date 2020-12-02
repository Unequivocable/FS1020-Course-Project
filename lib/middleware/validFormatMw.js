// const rightProps = req => {
//     if ( req.path == "/auth" ){
//         return authProp
//     }else if ( req.path == "/contact_form/entries" ){
//         return entryProp
//     } else if ( req.path == "/users" ){
//         return userProp
//     }
//     return ["Not Found"]
// }

const checkProps = (req) => {
    let errors = []
    // let props = [ "email", "password", "phonenumber" ]
   
    if(req.body.phonenumber){
        (/^(\()?([2-9][02-8][02-9])([)-])?([2-9][0-9][0-9])([-])?([0-9][0-9][0-9][0-9])*$/.test(phoneNum)!=true)
    }
 
    // const missingProp = neededProp.filter( key => !Object.keys(req.body).includes(key) );
    // if (missingProp.length > 0){
    //     missingProp.forEach( prop => errors.push(prop) );
    // }
    // return errors
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