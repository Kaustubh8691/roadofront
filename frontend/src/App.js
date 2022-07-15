import React, { useState } from 'react'
import CompoWord from './component/CompoWord';
import Data from './component/Data';
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => {
  const [data1,setData1]=useState()
  return (
   
    <BrowserRouter>
    <Routes>
      {/* list of words */}
      <Route path="/*" element={<CompoWord setData1={setData1}/>} />
      {/* word information */}
      <Route path="/data" element={<Data data1={data1} />} />
    
      
      
    </Routes>
  </BrowserRouter>
  )
}

export default App