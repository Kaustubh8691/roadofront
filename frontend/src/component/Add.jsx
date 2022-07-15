import React from 'react';
import { useState } from 'react';
import "./popup.css";
import axios from 'axios';


const Add = ({setTrim,trim,getItemsList}) => {
    const [word,setWord]=useState();
//    close popup window
    const handleCancel=()=>{
        setTrim(false);
    }
    // adding word in database
    const handleAdd= async () => {
        try{
            const url="https://roadob.herokuapp.com/"+word;
          const res = await axios.get(url);
          console.log(res);
          getItemsList();
        setTrim(false);
    }catch(err){
        console.log(err);
    }}
  return (
    (trim) ? (
        <div className='popup'>
            <div className='popup-consta'>
            <div className='popup-inner'>Add to Dictionary</div>
            <label className='lebal'>New Word</label>
        <input type='text'  value={word} onChange={(e)=>setWord(e.target.value)}/>
        <div className='btns'>
        <button className='cancel' onClick={()=>handleCancel()}>CANCEL</button>
        <button className='button-close' onClick={()=>handleAdd()}>ADD</button>
        </div>
        
            </div>
        
       
       
        </div>  
  ) : ""
  )
  
}

export default Add