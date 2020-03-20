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
         todo.save();
        res.redirect("/");
    }catch(err){
        res.redirect("/");
    }
});

//Update

router.get('/edit/:id',function(req,res){
    const id = req.params.id;
    Todo.find({},function(err,docs){
        res.render("changes.ejs",{Todo:docs,ids:id})
    });
})

router.post('/edit/:id',function(req,res){
    var mongodb = require('mongodb');

    Todo.updateOne({'_id': new mongodb.ObjectID(req.params.id)}, 
        { $set: {'task': req.body.newTask } },function(err){
            if(err) console.log(err);
            else{
                res.redirect('/');
            }
        });
})

//DELETE
router.get('/del/:id',function(req,res){
    const id = req.params.id;
    Todo.findByIdAndRemove(id,function(err){
        if(err)
        return res.send(500,err);
        else{
        res.redirect('/');
        }
    });
});

// //TOGGLE DONE AND NOT DONE
router.post('/check/:id', function(req, res){
    var mongodb = require('mongodb');

    if(req.body.todo1){

        Todo.updateOne({'_id': new mongodb.ObjectID(req.params.id)}, 
        { $set: {'done': true } },function(err, Todo){
            if(err) console.log(err);
            else{}
        });
    }else{
        
        Todo.updateOne({'_id': new mongodb.ObjectID(req.params.id)}, 
        { $set: {'done': false } },function(err, Todo){
            if(err) console.log(err);
            else{}
        });
    }
    res.redirect("/")
});

module.exports = router;