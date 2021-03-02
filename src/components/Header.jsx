import React from "react";

import "./header.scss";

function Header() {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <a href="/">crazeexp</a>
          </li>
          <li>
            <a href="#contact">Get in touch</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
