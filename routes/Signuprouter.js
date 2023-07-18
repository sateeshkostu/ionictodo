const express = require('express');
const mongoose = require('mongoose');
const ionic = require('../modals/Signupschema');
const router = express.Router();

const app = express();
//express is an backend web application framework for nodejs

//Get all todos
router.get('/getsignup', async (req, res) => {  //// async makes a function return a Promise
    try {
        const signup = await ionic.find({})
        //await makes a function wait for a Promise
        res.status(200).json({ signup })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

//get id by todo
// 

router.post('/logindetails', async (req, res) => {
    ionic.find({ Email: req.body.Email, Password: req.body.Password }).select().exec().then(
        doc => {

            if (doc.length) {
                console.log(doc)
                res.status(200).json({
                    message: "Login Successfull",
                    data: doc
                })
            } else {
                res.status(200).json({
                    message: "No Matching data found",
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

// role login

router.post('/logindetailsForAdmin', async (req, res) => {
    ionic.find({ Email: req.body.Email, Password: req.body.Password, role: "admin" }).select().exec().then(
        doc => {

            if (doc.length) {
                console.log(doc)
                res.status(200).json({
                    message: "Login Successfull",
                    data: doc
                })
            } else {
                res.status(200).json({
                    message: "No Matching data found",
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

//post a new todo
router.post('/signupdetails', async (req, res) => {
    const newSignup = new ionic({
        fName: req.body.fName,
        lName: req.body.lName,
        Email: req.body.Email,
        Password: req.body.Password,
        Confirmpassword: req.body.Confirmpassword,
        phoneNo: req.body.phoneNo,
        role: req.body.role,
        RooneID: req.body.RooneID,
        team: req.body.team,
    });

    //first check if user already existed
    await ionic.findOne({ Email: req.body.Email }).select().exec().then(doc => {
        if (doc == null) {  //if no user found then create new user
            newSignup.save().then(result => {

                res.status(200).json({
                    message: "user signuped successfully",
                    status: "success",
                    Email: result.Email,
                    data: result
                });

            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err,
                    ststus: "failed"
                });
            })
        } else {
            res.status(500).json({
                message: "user already exist",
                status: "failed"
            })
        }
    })
});

//ddelete a todo
router.delete('/deletetodos/:id', (req, res) => {
    ionic.findByIdAndDelete(req.params.id)  //params means parameter value
        .then(() => res.json('user deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));

})



module.exports = router;