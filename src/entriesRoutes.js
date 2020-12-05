import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'express-jwt'


const router = express.Router();

// placeholder array until FS is added into project
const entryFile = [
    {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "some string",
        "email": "add@email.com", 
        "phoneNumber": "2343000234",
        "content": "User's first message goes here"
    },
    {
        "id": "9b1deb4d-3b7d-4bad-8df0-2b0d7b3dcb6d",
        "name": "some other string",
        "email": "address@email.com", 
        "phoneNumber": "2343331234",
        "content": "User's second message goes here"
    }
       
];

// DO NOT EDIT ABOVE, unless adding new imports.

router.post('/contact_form/entries', (req, res) => {
    req.body.id = uuidv4()
    entryFile.push(req.body)
    res.status(200).json(req.body)
 })


 //JWT validation -- only authenticated JWT can access GETs after this point

router.use( jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256']} ))

router.get('/contact_form/entries', (req, res) => {
    res.status(200).send(entryFile)
 })

router.get('/contact_form/entries/:id', (req, res) => {
    const entryID = entryFile.find(entry => entry.id == req.params.id)
    
    if (!entryID) {
        return res.status(404).send(`{ 
            "message": "entry ${req.params.id} not found" 
        }`)
    } else res.status(200).send(entryID)
})





 // DO NOT EDIT BELOW
 export default router;
