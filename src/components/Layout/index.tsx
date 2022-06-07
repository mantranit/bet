import React from "react";
import AppBar from "../CustomAppBar";
import "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;
  return (
    <>
      <AppBar />
      <div className="App">
        <main className="App-main">{children}</main>
      </div>
    </>
  );
};

export default Layout;
