import React, { Component } from 'react'
import Newsitem from './Newsitem.js'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
      country: 'us',
      pageSize: 8,
      catagory: "general"
    }

    PropTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      catagory: PropTypes.string
    }
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
       let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=1d898f9052114ee3abe2a55718fe044b&pageSize=${this.props.pageSize}`
       this.setState({loading:true});
       let data = await fetch(url) 
       let parsedData = await data.json()
       this.setState({articles: parsedData.articles, 
                      totalArticles:parsedData.totalResults,
                      loading:false
                     })
      }

      handleNextClick = async ()=> {
          // console.log("next")
          let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=1d898f9052114ee3abe2a55718fe044b&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true});
          let data = await fetch(url);  
          let parsedData = await data.json()
          
          this.setState({
                 page:this.state.page + 1,
                 articles: parsedData.articles,
                 loading:false
  
          })
        }
      
      handlePreviousClick = async ()=> {
        // console.log('previous')
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=1d898f9052114ee3abe2a55718fe044b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data = await fetch(url);  
        let parsedData = await data.json()
        this.setState({
               page:this.state.page - 1,
               articles: parsedData.articles,
               loading:false

        })
      }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
        Headlines
        </h1>
        {this.state.loading && <Spinner/>}
        
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-3" key={element.url} >
              <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage}
              newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            })}
        </div>

      <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1>Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
       

      </div>
    )
  }
}

export default News