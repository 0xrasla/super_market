import React from "react";
import Sidebar from "../fixed_UI/sidebar/sidebar";
import { Navbar } from "../fixed_UI/navbar/navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 4 }}>
        <Navbar />
        <div className='bg-default-300 overflow-y-hidden'>{children}</div>
      </div>
    </div>
  );
}

export default layout;
