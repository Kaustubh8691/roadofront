import React  from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import "./main.css";
import { useState } from 'react';
import Card from './Card';
import img from "../images/search-13-xxl.png"
import Add from './Add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CompoWord = ({setData1}) => {

  const[trim,setTrim]=useState(false);
    const [data,setData]=useState();
    const [tri,setTri]=useState(true);
    const[searchkey,setSearch]=useState();
   const [sit,setSit]=useState(false);

// message of added word succesfully
   if(sit){
    toast.dark("Added succesfully!");
    setSit(false);
   }
    var dataone1;
    // search function
    const dats=async(dse)=>{
      setSearch(dse);
      setData(dataone1);
      try {
        await getItemsList();
        
     
        if(dse.length>0){
          const dataone2 = await dataone1.filter((Element) => Element.Word.includes(dse));
          console.log(dataone2);
          setData(dataone2);

        }else{
          setData([]);
        }
      } catch (error) {
        console.log(error)
      }
    }

// to change search tab and normal tab
    const handlesearch=async()=>{
      setTri(false);
    }
    
// get data from database
    var getItemsList = async () => {
        try{
          const res = await axios.get(`https://roadob.herokuapp.com/words`)
          console.log(res) ;       
          const list=res.data.data;
          dataone1=list;
          setData(list);
          
        }catch(err){
          console.log(err);
        }
      }
    
useEffect(()=>{
    getItemsList()
  },[]);
    
  return (
    <>
    <div>
        <div id="vocab-heading" >
          {(tri)?(
          <div className='head'>
            <div id='vocab'>Vocab</div> 
            <img onClick={()=>handlesearch()} src={img} alt="ajsh"/>
          </div>
          ): <div className='serach-div'>
            <input className='serach-input'placeholder='search' onChange={(e)=>dats(e.target.value)} autoFocus/>
            <button className='cross' onClick={()=>{setTri(true);getItemsList()}}>x</button>
            </div>}

        <div id='sub-container'> 
            <div id='words-list'>Words List</div> 
            <div className="count">
            {data?.map((obj, idx) => (  
              <Card key={idx} obj={obj}  setData1={setData1}/> 
            ))}
            </div>   
        </div>  
        <button id='button-add' onClick={()=>setTrim(true)}>+</button>
              <Add setTrim={setTrim} trim={trim} setSit={setSit}></Add>
        </div>
    </div>
    <ToastContainer
                position="bottom-left"
                autoClose={100}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                />
    </>
  )
}

export default CompoWord