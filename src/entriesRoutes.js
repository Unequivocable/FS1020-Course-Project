import express from 'express';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

// placeholder until FS is added into project
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


 //JWT validation here--secure GETs only allowed

router.get('/contact_form/entries', (req, res) => {
    res.status(200).send(`${req.method} to ${req.path}`)
 })

router.get('/contact_form/entries/:id', (req, res) => {
    res.status(200).send(`${req.method} to ${req.path}`)
})





 // DO NOT EDIT BELOW
 export default router;
