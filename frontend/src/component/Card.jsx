import React from 'react'
import { useNavigate } from "react-router-dom";
import "./main.css";


const Card = ({obj,setData1}) => { 
 
  const navigate = useNavigate();
  const handleClick=(wordData)=>{
    setData1(wordData);
    navigate("/data");
  }
    const wordData=obj;
    
  return (
    <div className="card" onClick={()=>handleClick(wordData)} >
      <div className="word-con">{wordData.Word}</div>
    <div className="detail-con">({wordData.type}) {wordData.defination}</div>
        </div>
  )
}

export default Card