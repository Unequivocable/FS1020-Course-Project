import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import argon2, { hash } from  'argon2';

const router = express.Router();

// placeholder until FS is added into project
const userFile = [
  {
    "id": "b34adff-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "name": "Some Name",
    "email": "address@email.com"
},
{
  "id": "b34adff-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "name": "Some Name",
  "email": "address@email.com"
}
]

async function getHash (password){  
  try {
    return await argon2.hash(password)
  } catch (err) {
    console.error(err)
  }
  }

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
// DO NOT EDIT ABOVE, unless adding new imports.


router.post('/auth', (req, res) => {
  const hashPass = a //find email from req.body.email and match hashedPassword in file
  const goodPass = verifyHash(hashPass, req.body.password)
  res.status(200).json(req.route)
})



 router.post('/users', (req, res) => {

  getHash(req.body.password).then(password => req.body.hashedPassword = password)
  delete req.body.password

  req.body.id = uuidv4()

  //I was originally returning the original req.body in the status response and it was properly returning what I wanted--but that was only because the hash response takes a moment to be added to req.body--and so I didn't want to leave it in case the response delayed and the new hashed password ended up being added to req.body before the response sent it back.  Making a copy removed that possibility

  const newReq = { id: req.body.id, name: req.body.name, email: req.body.email }
  res.status(200).json(newReq)

  userFile.push(req.body)

})


 // DO NOT EDIT BELOW
 export default router;
