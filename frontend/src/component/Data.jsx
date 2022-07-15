import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./data.css";

// aftre clickin on any word tab we will move to net window which will contains all data related that word
const Data = ({data1}) => {
    // console.log(data1);
    const[synonyms,setSynonyms]=useState([]);
    const[examp,serExamp]=useState([]);
    // storing synonyms
    var str1="";
    // storing examples
    var str2="";
    const navigate = useNavigate();
   
    // moving back to main page
    const handleButton=()=>{
        navigate("/");
    }
    const getdata=()=>{
        if (data1.synonyms){
            const syn=data1.synonyms.length;
            if(syn>0){
                for(let i=0;i<syn;i++){
                    if(!str1.includes(data1.synonyms[i].text) ){
                        str1+="   "+(i+1)+") "+data1.synonyms[i].text+" . ";
                        // console.log(data1.synonyms[i].text);
                    }
                   
                }
            }
            setSynonyms(str1);
        }
        if(data1.example){
            const exe=data1.example.length;
            if(exe>0){
                for(let i=0;i<exe;i++){
                    if(!str2.includes(data1.example[i].text) ){
                        str2+="   "+(i+1)+") "+data1.example[i].text+" . ";
                        // console.log(data1.example[i].text);
                    }
                }
            }
            serExamp(str2);
        }
    }
   useEffect(() => {
    getdata()
   }, )
   
  return (
    <div className='data-container'>
        <button id='back-button' onClick={()=>{handleButton()}}>x</button>
    <div className='data-word'>{data1.Word}</div>
    <div className='data-type'>{data1.type}</div>
    <div className='data-defination'>{data1.defination} .</div>
    
    <div className='data-details'>Examples: {examp}</div>
    <div className='data-shortDefinitions'>Short Definition :{data1.shortDefinitions} .</div>
    <div className='data-syn'> Synonyms: <div className='d'>{synonyms}</div></div>
    {
    data1.synonyms.forEach((obj,index) => {
        <div >{obj}</div>
        
    })
    }
    </div>
  )
}

export default Data