import React from 'react'



  const NewsItem = (props)=> {
   let {title, description ,imageUrl ,newsUrl,author,date} = props;
    return (
      <div className='my-3'>
      <div className="card">
  <img src={!imageUrl?"https://www.cnbc.com/2023/10/22/israel-hamas-war-updates-and-latest-news-on-gaza-conflict.html":imageUrl} className="card-img-top" alt="pic" />
  <div className="card-body">
    <h5 className="card-title">{title}<span className="badge bg-secondary mx-2">New</span></h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} On {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem