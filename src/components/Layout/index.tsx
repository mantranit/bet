import React from "react";
import CustomAppBar from "../CustomAppBar";
import "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;
  return (
    <>
      <CustomAppBar />
      <div className="App">
        <main className="App-main">{children}</main>
      </div>
    </>
  );
};

export default Layout;
