import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BASE_URL, API_KEY } from '../constants/index';
import "../App.css";
// import { isTemplateElement } from "@babel/types";
import Photo from './Photo';
import Explanation from "./Explanation";
import Header from './Header';
import Calendar from './Calendar';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [theDate, setTheDate] = useState(Date());
  
  useEffect(() => {
    axios.get(`${BASE_URL}?api_key=${API_KEY}`) // add &date=2012-03-14 after API_KEY
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        setError(`We're experiencing technical difficulties, please try again...`)
      })
  }, [])

  const dateSelect = input => {
    setTheDate(input);
  }

  return (
    <>
    <div className='App'>
      { error && <h1>{error}</h1> }
      {/* <Calendar dateSelect={dateSelect} /> */}
    </div>
    <div className="App">
        <Header copyright={data.copyright} date={data.date} title={data.title} />
    </div>
    <div className="App">
    { <Photo photo={data.url} /> }
    </div>
    <div className="App">
      { <Explanation explanation={data.explanation} /> }
    </div>
    </>
  )
};

export default App;
