import argon2, { hash } from  'argon2';

//NOTE-- password used for the hashedPassword below was 12345678
// userFile array is temporary until I add in the FS modules
const userFile = [
  {
    "id": "b34adff-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "name": "Some Name",
    "email": "newaddress@email.com",
    "hashedPassword": '$argon2i$v=19$m=4096,t=3,p=1$W4DklPsfa8RDXoj05vSRNw$Ch8u8hl5EJyLBhsRiu7wde5WUWFayurShZbaLbc7wrg'
  }
  ]

//Hashes the password

async function getHash (password){  
    try {
      return await argon2.hash(password)
    } catch (err) {
      console.error(err)
    }
  }
  
//Verifies the stored hashed password and returns true or false

async function verifyHash (hashedPass, reqPass){
    try {
      if (await argon2.verify(hashedPass, reqPass)) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error(err)
    }
  }
  
// Finds the existing stored email and returns the hashed password associated with it

const finder = (findValue) => {
  let findEmail = userFile.find(user => user.email == findValue)

  if (findEmail){
    return findEmail.hashedPassword
  } 
 }
  
// The actual middleware for checking the email exists, returning an error if not, and then passing the hashed password along to the next step
// I realize I could combine this and the finder function above quite easily--but I was resuing the finder ability in the middleware below so I thought it worked ok as it's own helper function

    const emailExists = (req, res, next) => {
      const hashPass = finder(req.body.email)

      if(!hashPass){
       res.status(401).json( { "message": "incorrect credentials provided" } )
      } else {
       req.hashPass = hashPass
        next()
      }
    }

    //This wasn't specifically in the project request but the business analyst side of me needs to account for the situation of someone attempting to add a user with an existing email address so doesUserExist gets called before a new user POST is allowed to ensure the email isn't already stored.  Since we are pulling the hashed password based on email we can't have multiple users with the same email.

    const doesUserExist = (req, res, next) => {
        const userExists = finder(req.body.email)

        if (userExists){
          res.status(400).send( { "message": "User already exists.  Please login" } )
        } else next ()
    }

    export {
        emailExists,
        getHash,
        verifyHash,
        userFile,
        doesUserExist
    }