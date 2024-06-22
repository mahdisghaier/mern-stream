const videoController=require('../controllers/VideoController.js');
const express=require('express');
const router=express.Router();


router.post('/upload', videoController.uploadVideo);


module.exports = router;
