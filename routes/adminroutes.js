const express = require('express');
const mongoose = require('mongoose');
const ionic = require('../modals/Signupschema');
const Todoionic = require('../modals/todoschema');
const router = express.Router();

const app = express();

// get by role
router.post('/getByRole', async (req, res) => {
    ionic.find({ role: req.body.role }).select().exec().then(
        doc => {
            if (doc.length) {
                console.log(doc)
                res.status(200).json({
                    message: "Data retrived successfully",
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

// updateemployee
router.put('/updateProfile/:id', async (req, res) => {
    const updates = Object.keys(req.body) //keys will be stored in updates ==> req body fields
    const allowedUpdates = ['Name', 'Email', "Password", 'phoneNo', 'team'] // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowed updates
    if (!isValidOperation) {
        return res.status(400).json({ error: 'invalid updates' })
    }
    try { // used to catch errors
        const product = await ionic.findOne({ _id: req.params.id }) //finding the products based on id
        if (!product) {
            return res.status(404).json({ message: 'Invalid Details' }) //error status
        }
        updates.forEach((update) => product[update] = req.body[update]) //updating the value

        await product.save()
        res.status(200).json({
            detailsupdated: product
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})


// delete by employee
router.delete('/deleteemp/:_id', async (req, res) => {
    try {
        const deletedEmployee = await ionic.findByIdAndDelete({ _id: req.params._id })
        if (!deletedEmployee) {
            return res.status(404).json({ error: "Product not found" })

        }
        return res.status(200).json({
            message: "Employee Deleted",
            deletedEmployee
        })
    } catch (error) {
        return res.status(400).send(error)
    }

})

//get id by Employee
router.get('/employee/:_id', (req, res) => {
    ionic.findOne({_id: req.params._id})
        .then(ionic => res.json(ionic))
        .catch(err => res.status(400).json(`Error: ${err}`));
})


module.exports = router