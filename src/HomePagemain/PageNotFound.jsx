import React from "react";


const PageNotFound1 = () => {
  return (
    <div className="notfound">
      {/* Row: 404 + Image */}
      <div className="notfound-code-wrapper">
        <h1 className="notfound-code">404</h1>
        {/* <img
          src="./img/404box.png"
          alt="404 Illustration"
          className="notfound-img"
        /> */}
      </div>

      {/* Text + Button */}
      <h2 className="notfound-title">Sorry, Page Not Found</h2>
      <p className="notfound-text">
        The page you requested could not be found.
      </p>
      <button
        className="notfound-btn"
        onClick={() => (window.location.href = "/")}
      >
        GO BACK HOME
      </button>
    </div>
  );
};

export default PageNotFound1;
