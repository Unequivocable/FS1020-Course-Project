import fs from 'fs'; 
import express from 'express';

const router = express.Router();

// DO NOT EDIT ABOVE, unless adding new imports.

router.post('/contact_form/entries', (req, res) => {
    res.status(200).send(`${req.method} to ${req.path}`)

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
