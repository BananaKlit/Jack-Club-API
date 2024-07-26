const router = require('express').Router();



router.get('/hello' , (req , res)=>{
    res.json({'hello' : "Welcome to valet club API"})
});
const userRoutes = require("./routes/userRoutes");


module.exports = router;