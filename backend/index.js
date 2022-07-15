import fetch from "node-fetch";
import  express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv'
// const dotenv = require('dotenv').config();

dotenv.config()
const PORT = process.env.PORT || 5500;
const url="mongodb://localhost:27017";
const app=express();
app.use(express.json());
app.use(cors());

// schema strict mode-false ,some words doesn't have some keys so i make it false so we can add data that we will got from api
const datSchema=new mongoose.Schema({
     
   defination:{
    type: String
   }
},{strict:false});

const Property = mongoose.model("Property", datSchema);

let app_id="2699f9dd";
let app_key="f0dca2302a0d671ee75353948a49f27a";


// adding word in database
app.post('/word',async(req,res)=>{
    const data=req.body;
    const data1=new Property({data})
    res.json({
        data1:await data1.save()
    })
})
// get method for getting all words stored in database
app.get('/words',async(req,res)=>{
    let data=await Property.find();

    res.json({
        status:"success",
        data:await data
    })
})
// get method for finding specific word
app.get('/word/:id',async(req,res)=>{
    try{
        const key=req.params.id
    let data = await Property.find({Word:key});
    
        res.json({
            status: "success",
            data: await data,
        });
    }catch (e) {
        res.json({
          status: "err",
          message: e.message,
        });
       
    }
    
})
// get the word from api and store it to database
app.get('/:id',(req,res)=>{
    const word=req.params.id;
    try{
    let ul=`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`;
    fetch(ul, {
        method:"GET",
        mode:"no-cors",
        headers:{app_key:app_key,app_id:app_id},

    })
    .then((respose)=>respose.json())
    .then(async (data)=>{
        let word=data.id;
        if (!data.results){
            res.json({
                status: "err",
                message: "not word",
              });
        }else{
        let defination=data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        
        let datsu=data.results[0].lexicalEntries[0].entries[0].senses[0];
        let example="";
        const datas=data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
        
        if (datas){
            example=data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
            if (!example){
                example=" ";
            }
        }
        
       
        let type=data.results[0].lexicalEntries[0].lexicalCategory.text;
        let synonyms=data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms;
        let shortDefinitions=data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0];
        
        // adding data to database
        const dat= await new Property({Word:word,
            defination:defination,
            example:datsu.examples,
            type:type,
            synonyms:synonyms,
            shortDefinitions:shortDefinitions
    });
        res.json({
           
            data:await dat.save(),
            message:"data saved sucessfully"
        })}
    });

    }catch(e) {
        res.json({
          status: "err",
          message: e.message,
        });
      }
});


// connection
const connectDB = async () => {
    //  connecting with mongodb 
  
    await mongoose.connect('mongodb+srv://kaustubh:kaustubh@cluster0.elogr.mongodb.net/words?retryWrites=true&w=majority');
    console.log("mongodb connected")
  };
connectDB();
// hosting app on localhost:5000
// app.listen(5000,console.log("server running at 5000"))
app.listen(PORT, ()=> console.log("Server connected",PORT) );