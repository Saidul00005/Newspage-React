import React, { Component } from 'react'
import Newsitem from './Newsitem.js'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
      country: 'us',
      pageSize: 8,
      category: "general"
    }

    PropTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

    capitalizeFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} News`;
    }
    
    //  async updateNews () {
    //     const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d898f9052114ee3abe2a55718fe044b&page=${this.state.page}&pageSize=${this.props.pageSize}`
    //     this.setState({loading:true});
    //     let data = await fetch(url) 
    //     let parsedData = await data.json()
    //     this.setState({articles: parsedData.articles, 
    //                    totalArticles:parsedData.totalResults,
    //                    loading:false
    //                   })
   
    //  }
     async componentDidMount(){
      this.props.setProgress(10);
      const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d898f9052114ee3abe2a55718fe044b&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data = await fetch(url) 
      this.props.setProgress(30);
      let parsedData = await data.json()
      this.props.setProgress(70);
      this.setState({articles: parsedData.articles, 
                     totalArticles:parsedData.totalResults,
                     loading:false
                    })
      this.props.setProgress(100);
       }     
      // handleNextClick = async ()=> {
      //     // console.log("next")
      //     this.setState({page: this.state.page + 1})
      //     this.updateNews()
      //   }
      
      // handlePreviousClick = async ()=> {
      //   // console.log('previous')
      //   this.setState({page: this.state.page - 1})
      //   this.updateNews()
      // }

            
      fetchMoreData = async () => {
       this.setState({page: this.state.page + 1})
       const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d898f9052114ee3abe2a55718fe044b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
       let data = await fetch(url) 
       let parsedData = await data.json()
       this.setState({articles: this.state.articles.concat(parsedData.articles), 
                      totalArticles:parsedData.totalResults
                     })
      };

  render() {
    return (
      <>
        <h1 className="text-center">
        Headlines from {`${this.capitalizeFirstLetter(this.props.category)} News`}
        </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>{this.state.loading && <Spinner/>}</h4>}
        >
        <div className="container">

      
            <div className="row">
                { this.state.articles.map((element,index)=>{
                  return <div className="col-md-3" key={index} >
                  <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
                })}
            </div>
        </div>

        </InfiniteScroll>
        
      </>
     
    )
  }
}

export default News