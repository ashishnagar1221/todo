const router = require('express').Router();
const Todo = require('../models/datamodel');

//DISPLAY ALL TASK
router.get('/',function(req,res){
    Todo.find({},function(err,docs){
        if(err) res.json(err);
        else res.render('index',{Todo:docs})
    })
})

//ADD NEW TASK
// router.post('/',async(req,res)=>{
//     const todo = new Todo({
//         data: req.body.data
//     });
//     try{
//         await todo.save();
//         res.redirect("/");
//     }catch(err){
//         res.redirect("/");
//     }
// })
module.exports = router;