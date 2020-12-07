import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import jwtGenerator from 'jsonwebtoken'
import { getHash, verifyHash, emailExists, userFile, doesUserExist } from '../lib/middleware/authMw'

const router = express.Router();

  // DO NOT EDIT ABOVE, unless adding new imports.


router.post('/auth',emailExists, (req, res) => {
  const email = req.body.email

  verifyHash(req.hashPass, req.body.password).then(match => {
    if(match){
    const token = jwtGenerator.sign({email}, process.env.JWT_SECRET, {expiresIn: '1m'})
    return res.status(200).json({token})
    } else {
    res.status(401).json( { "message": "incorrect credentials provided" } )
    }
  })
})

  //I was originally returning the original req.body in the status response and it was properly returning what I wanted--but that was only because the hash response takes a moment to be added to req.body and so I was concerned if my response was delayed the new hashed password could end up in req.body before the response sent it back.  That's why I make the rewReq copy and send that back.

 router.post('/users', doesUserExist, (req, res) => {
  req.body.id = uuidv4()
  const newReq = { id: req.body.id, name: req.body.name, email: req.body.email }
 
  getHash(req.body.password).then(password => req.body.hashedPassword = password)
  delete req.body.password
  res.status(200).json(newReq)
  userFile.push(req.body)
})


 // DO NOT EDIT BELOW
 export default router;
