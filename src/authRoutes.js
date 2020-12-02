import fs from 'fs'; 
import express from 'express';


const router = express.Router();

// DO NOT EDIT ABOVE, unless adding new imports.


router.post('/auth', (req, res) => {
    res.status(200).json(req.route)

})

 // DO NOT EDIT BELOW
 export default router;
