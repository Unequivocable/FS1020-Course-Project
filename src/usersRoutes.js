import fs from 'fs'; 
import express from 'express';

const router = express.Router();

// DO NOT EDIT ABOVE, unless adding new imports.




 router.post('/users', (req, res) => {
   res.status(200).send(`${req.method} to ${req.path}`)
})


 // DO NOT EDIT BELOW
 export default router;
