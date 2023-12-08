import React from "react";
import {Link, useHistory} from "react-router-dom";

function NotFound() {
    const history = useHistory();
  return (
    <div className="NotFound">
        <Link to="/">Home</Link>
      <h1>Not Found</h1>
    </div>
  );
}

export default NotFound;
