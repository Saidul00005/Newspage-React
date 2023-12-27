import React, { Component } from 'react'
import Newsitem from './Newsitem.js'

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
       let url= "https://newsapi.org/v2/top-headlines?country=us&catagory=business&apiKey=1d898f9052114ee3abe2a55718fe044b&pageSize=20"
       let data = await fetch(url) 
       let parsedData = await data.json()
       this.setState({articles: parsedData.articles, totalArticles:parsedData.totalResults})
      }

      handleNextClick = async ()=> {
        // console.log("next")
        if (this.state.page + 1>Math.ceil(this.state.totalArticles/20)){

        }
        else{
          let url= `https://newsapi.org/v2/top-headlines?country=us&catagory=business&apiKey=1d898f9052114ee3abe2a55718fe044b&page=${this.state.page +1}&pageSize=20`
          let data = await fetch(url);  
          let parsedData = await data.json()
          this.setState({
                 page:this.state.page + 1,
                 articles: parsedData.articles
  
          })
        }
       
      }

      handlePreviousClick = async ()=> {
        // console.log('previous')
        let url= `https://newsapi.org/v2/top-headlines?country=us&catagory=business&apiKey=1d898f9052114ee3abe2a55718fe044b&page=${this.state.page-1}&pageSize=20`
        let data = await fetch(url);  
        let parsedData = await data.json()
        this.setState({
               page:this.state.page - 1,
               articles: parsedData.articles

        })
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

      <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
       

      </div>
    )
  }
}

export default News