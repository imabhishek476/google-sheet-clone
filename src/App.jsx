/* eslint-disable no-unused-vars */
import Grid from "./Grid";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [CountCells, setCountCells] = useState(0);

  const onChangeOption = (e) =>{
    console.log(e.target.value)
    if(e.target.value){
      setCountCells(parseInt(e.target.value))
    }
  }

  return (
    <div className="App">
      <h1>Google Sheets Clone</h1>
      <div>
        <select style={{padding:"10px", marginBottom:"10px"}}  onChange={(e)=>onChangeOption(e)} name="Hey" id="">
          <option value={0}>Please select Number of Rows & Columns</option>
          {
            Array.from({length: 10}).map((item,index)=>{
              return (
                <option key={index} value={index+1}>{index+1} x {index+1}</option>
              )
            })
          }
        </select>
      </div>
      <Grid CountCells={CountCells}/>
    </div>
  );
};

export default App;
