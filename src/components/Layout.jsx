import React from "react";
import Nav from './Nav'
import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <>
      <Nav />
      <Sidebar children={children} />
     
    </>
  );
}

export default Layout;
