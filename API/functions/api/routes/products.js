const express = require("express");
const admin = require("firebase-admin");
const db = admin.firestore();
const myrouter = express.Router();
const dbName = 'products';

//Create - POST
myrouter.post('/create/:id', (req,res) => {
    ( async() => {
        try {
            await db.collection(dbName).doc('/' + req.params.id + '/').create({
                docID: req.params.id,
                uid: req.body.uid,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                paymentOptions: req.body.paymentOptions,
                image0: req.body.image0,
                image1: req.body.image1,
                category: req.body.category,
                colour: req.body.colour,
                material: req.body.material,
                size: req.body.size,
                renterName: req.body.renterName
            })
            console.log("---Data added---");
            return res.status(200).json();
        } catch (error) {
            console.log("Error adding data" );
            return res.status(500).json();
        }
    })();
});

//Read - GET
myrouter.get('/read',(req,res) => {
    ( async() => {
        try {
            let response=[];
            await db.collection(dbName).get().then(snap =>{
                snap.forEach(doc => {
                    response.push(doc.data());
                })
                return response;
            })
            console.log("Data Read")
                return res.status(200).json(response);
        } catch (error) {
            console.log("Error reading data");
            return res.status(500).json();
        }
    })();
})

//Update - PUT
myrouter.put('/update/:id',(req,res) => {
    (async() => {
        try {
            await db.collection(dbName).doc(req.params.id).update({
                uid: req.body.uid,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                paymentOptions: req.body.paymentOptions,
                image0: req.body.image0,
                image1: req.body.image1,
                category: req.body.category,
                colour: req.body.colour,
                material: req.body.material,
                size: req.body.size,
                renterName: req.body.renterName
            })
            console.log('----Updated Successfully----');
            return res.status(200).json();
        } catch (error) {
            console.log('----Error updating data----');
            return res.status(500).json();
        }
    })();
});


//DELETE
myrouter.delete('/delete/:id', (req,res) => {
    (async()=>{
        try {
            await db.collection(dbName).doc(req.params.id).delete();
            console.log("----Data deleted successfully----");
            return res.status(200).json();          
        } catch (error) {
            console.log("Error");
            return res.status(500).json();
        }
    })();
});


module.exports=myrouter;