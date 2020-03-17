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
router.post('/',(req,res)=>{
    console.log(req.body);
    const todo = new Todo({
        task: req.body.task
    });
    try{
        //console.log(todo);
         todo.save();
        res.redirect("/");
    }catch(err){
        res.redirect("/");
    }
})
module.exports = router;