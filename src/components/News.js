import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to update news
  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    
    setArticles(articles.concat(parsedData.articles)); // Append new articles to existing ones
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  // Fetching more data (for infinite scroll)
  const fetchMoreData = async () => {
    setPage(page + 1);
  };

  // UseEffect to fetch news and set document title when component mounts or when category changes
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsSite`;
    updateNews(); // Fetch initial news
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, props.category]);

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop:'90px'}}>
        NewsSite - Top Headlines of the World on {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults} // Correct condition for loading more
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((ele) => {
              return (
                <div className="col-md-4" key={ele.url}>
                  <NewsItem
                    title={ele.title ? ele.title.slice(0, 45) : ""}
                    description={ele.description ? ele.description.slice(0, 90) : ""}
                    imageUrl={ele.urlToImage}
                    newsUrl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
                    source={ele.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// PropTypes validation for props
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired
};

// Default props
News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
  totalResults: 0
};

export default News;
