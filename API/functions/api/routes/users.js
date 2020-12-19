const express = require("express");
const admin = require("firebase-admin");
const myrouter = express.Router();
const db = admin.firestore();
const dbName = 'users';

myrouter.get('/',(req,res) => {
    res.status(200).send("User API works");
});

//Create - POST
myrouter.post('/create/:id',(req,res) => {
    (async() => {
        try {
            await db.collection(dbName).doc('/' + req.params.id + '/').create({
                docID: req.params.id,
                uid: req.body.uid,
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state
            })
            console.log("----Data Added----");
            return res.status(200).json();
        } catch (err) {
            console.log("Error");
            return res.status(500).json(err);
        }
    })();
});

//Read - GET
myrouter.get('/read',(req,res) => {
    ( async() => {
        try {
            let response =[];
            await db.collection(dbName).get().then(snap => {
                snap.forEach(doc => {
                    response.push(doc.data());
                })
                return response;
            })
            console.log("----Read all data----");
            return res.status(200).json(response);
        } catch (error) {
            console.log("Error");
            return res.status(500).json();
        }
    })();
});

//Update - PUT
myrouter.put('update/:id',(req,res) => {
    ( async() => {
        try {
            await db.collection(dbName).doc('/' + req.params.id + '/').update({
                uid: req.body.uid,
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state
            });
            console.log("----Data Updated----");
            return res.status(200).json();
        } catch (error) {
            console.log("Error");
            return res.status(500).json();
        }
    })();
});



//Delete
myrouter.delete('/delete/:id',(req,res) => {
    ( async() => {
        try {
            await db.collection(dbName).doc(req.params.id).delete();
            console.log("----Data deleted----");
            return res.status(200).json();    
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    })();
});

module.exports = myrouter;