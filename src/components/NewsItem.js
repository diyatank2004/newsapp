import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card my-3">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span
            className="badge rounded-pill bg-info"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
        </div>
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://techcrunch.com/wp-content/uploads/2024/12/Cruise-vehicle-driving-downtown-houston-at-stoplight.jpg?resize=1200,800"
          }
          className="card-img-top"
          alt="news"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-info"
          >
            Read More
          </a>{" "}
          {/* Added rel="noreferrer" for security */}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
