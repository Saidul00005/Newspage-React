import React, { Component } from 'react'
import Newsitem from './Newsitem.js'

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false
        }
    }

    async componentDidMount(){
       let url= "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1d898f9052114ee3abe2a55718fe044b"
       let data = await fetch(url);  
       let parsedData = await data.json()
       this.setState({articles: parsedData.articles})
      }
  render() {
    return (
      <div className="container my-3">
        <h2>Headlines</h2>
        
        <div className="row">
            {this.state.articles.map((element)=>{
              return <div className="col-md-3" key={element.url} >
              <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage}
              newsUrl={element.url}/>
              </div>
            })}
        </div>
       

      </div>
    )
  }
}

export default News