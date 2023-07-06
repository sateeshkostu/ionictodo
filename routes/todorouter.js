const express = require('express');
const mongoose = require('mongoose');
const Todoionic = require('../modals/todoschema');
const router = express.Router();

const app = express();
//express is an backend web application framework for nodejs

//Get all Todoionics
router.get('/getionics', async (req, res) => {  //// async makes a function return a Promise
    try {
        const Todoionics = await Todoionic.find({})  
        //await makes a function wait for a Promise
        res.status(200).json({ Todoionics })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})


router.post('/getionic', async (req, res) => {
  Todoionic.find({ useremail: req.body.useremail }).select().exec().then(
      doc => {
          if (doc.length) {
              console.log(doc)
              res.status(200).json({
                  message:"Data retrived successfully",
                  data: doc
              })
          } else {
              res.status(200).json({
                  message: "No Data found",
                  status: "failed",
              })
          }
      }
  ).catch(err => {
      res.status.json({
          error: err
      })
  })
});

//get id by Todoionic
router.get('/Todoionics/:useremail', (req, res) => {
    Todoionic.findOne({useremail:req.params.useremail})
        .then(Todoionic => res.json(Todoionic))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

//post a new Todoionic
router.post('/postTodoionics', async (req, res) => {
    const newTodoionic = new Todoionic({
      useremail:req.body.useremail,
      name:req.body.name,
      Description:req.body.Description,
      Assignee:req.body.Assignee,
      Reporter:req.body.Reporter,
      Startdate:req.body.Startdate,
      Enddate:req.body.Enddate,
      status:req.body.status,
      postedBy:req.body.postedBy,
      number:req.body.number
    });
    try {
      await newTodoionic.save();
      res.status(200).json({ message: 'Todoionic added',
    saveData:newTodoionic});
    } catch (error) {
      res.status(400).json({ error });
    }
  });

//update a Todoionic
router.put('/updateTodoionics/:id', (req, res) => {
    Todoionic.findByIdAndUpdate(req.params.id, req.body)  //params means parameter value
        .then(() => res.json('Todoionic updated'))
        .catch(err => res.status(400).json(`Error: ${err}`));

})

// //ddelete a Todoionic
// router.delete('/deleteTodoionics/:id', (req, res) => {
//     Todoionic.findByIdAndDelete(req.params.id)  //params means parameter value
//         .then(() => res.json('Todoionic deleted'))
//         .catch(err => res.status(400).json(`Error: ${err}`));

// })


router.delete('/deleteTodoionics/:_id' ,async(req,res)=> {
  try{
      const deletedProduct = await Todoionic.findByIdAndDelete ( {_id:req.params._id} )
      if(!deletedProduct) {
        return  res.status(404).json({error: "Product not found"})

      }
     return res.status(200).json({message: "Product Deleted",
      deletedProduct})
  } catch (error) {
       return res.status(400).send (error)
  }
  
})


router.get("/search/:key",async (req,resp)=>{
  
   // resp.send(menus);


    try{
    
        let Todoionics = await Todoionic.find(
            {
                "$or":[
                    { postedBy:{$regex:new RegExp("^"+ req.params.key, "i") } },
                    { name:{$regex:new RegExp("^"+ req.params.key, "i") } },
                    { useremail:{$regex:new RegExp("^"+ req.params.key, "i") } },
                    { number:{$regex:new RegExp("^"+ req.params.key, "i") } },
                    { Assignee:{$regex:new RegExp("^"+ req.params.key, "i") } },
                    { Reporter:{$regex:new RegExp("^"+ req.params.key, "i") } },
                    { Startdate:{$regex:new RegExp("^"+ req.params.key, "i") } },
                    { Enddate:{$regex:new RegExp("^"+ req.params.key, "i") } },
                   
                ]
            }
        )
        if(!Todoionics){
            resp.status(404).send({error: "rest not found"})
        }
        resp.status(400).json({
            TotalTodoionics:Todoionics.length,
            Todoionics})
    }catch(error){
        resp.status(401).json({error})
        console.log(error) 
    }
});

module.exports = router;