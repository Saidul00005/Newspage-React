import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



export class App extends Component {
  render() {
    return (
        <Router>
          <div>
              <Navbar/>
              <Routes>
                <Route exact path="/" element={<News key="general" pageSize={20} country="in" catagory="general" />}/>
                <Route exact path="/about" element={<News key="" pageSize={20} country="in" catagory="general" />}/>
                <Route exact path="/business" element={<News key="business" pageSize={20} country="us" catagory="business" />}/>
                <Route exact path="/entertainment" element={<News key="entertainment" pageSize={20} country="in" catagory="entertainment" />}/>
                <Route exact path="/general" element={<News key="general" pageSize={20} country="in" catagory="general" />}/>
                <Route exact path="/health" element={<News key="health" pageSize={20} country="in" catagory="health" />}/>
                <Route exact path="/science" element={<News key="science" pageSize={20} country="in" catagory="science" />}/>
                <Route exact path="/sports" element={<News key="sports" pageSize={20} country="us" catagory="sports" />}/>
                <Route exact path="/technology" element={<News key="technology" pageSize={20} country="in" catagory="technology" />}/>
              </Routes>
              
           </div>
        </Router>
      
    )
  }
}

export default App