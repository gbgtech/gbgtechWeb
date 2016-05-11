import React from "react";
import RightColumn from "./RightColumn";

const UserApp = ({ children }) => (
  <div className="main-container">
    <section className="who-are-we">
      <h1>#gbgtech</h1>
    </section>
    <section className="row center-container">
      <section className="content">
        {children}
      </section>
      <RightColumn/>
    </section>
  </div>
);

export default UserApp;
