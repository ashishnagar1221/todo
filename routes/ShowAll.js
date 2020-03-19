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
});

//Update

// router.get(('/edit/:id'),function(req,res){
//     const id = req.params.id;
//     todo.find({},function(err,data){
//         res.render("changes.ejs",)
//     })
// })

//DELETE
router.get('/del/:id',function(req,res){
    const id = req.params.id;
    //console.log(id);
    Todo.findByIdAndRemove(id,function(err){
        if(err)
        return res.send(500,err);
        else{
        res.redirect('/');
        }
    });
});

// //TOGGLE DONE AND NOT DONE
router.get('/check/:id/:done',function(req,res){
    const id = req.params.id;
    let checked = !req.params.done;
    console.log(checked +" "+ typeof(checked));
    Todo.findByIdAndUpdate(id,{done:checked},function(err){
        if(err)
            return res.send(500,err);
        else{
            console.log(checked +" "+ typeof(checked));
            res.redirect('/');
        }
    })
})

module.exports = router;