import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'

  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

    
  }


  constructor(){
    super();
    this.state={
      articles: [],
      loading: false,
      page:1

    }
  }
//   promises
    async componentDidMount(){
    let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=38024dac2eb343a7bfb65f5edb7ef241&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(Url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,totalResults: parsedData.totalResults,
      loading: false

    })
  }

  handlePrevClick = async ()=>{

    let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=38024dac2eb343a7bfb65f5edb7ef241&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(Url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })

  }


  handleNextClick= async ()=>{
    if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    let Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=38024dac2eb343a7bfb65f5edb7ef241&page=${this.state.page + 1}&pageSize=2${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(Url);
    let parsedData = await data.json()
    

    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  }


  render() {
    return (
      <div className='container my-3'>
      <h1 className="text-center">NewsMonkey - Top Headlines</h1>
      {this.state.loading && <Spinner />}

      <div className="row">
      {!this.state.loading && this.state.articles.map((element)=>{
        return<div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""}  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
        </div>
        })}
        </div>
        <div className="container d-flex justify-content-between ">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News