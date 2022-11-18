import { Outlet, Link } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    <>
      <nav id="navbar">
        <Link to="/">Home</Link>
      </nav>
      
      <div id="content">
      <Outlet />
      
      <footer>
        <h2><a href="https://github.com/MadelynIsom/messageboard-cs260" target="_blank">GitHub</a></h2>
      </footer>
      </div>
    </>
  )
};

export default Layout;