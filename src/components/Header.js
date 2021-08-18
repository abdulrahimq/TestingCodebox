import React from "react";
import "../css/Header.css";

function Header({ signedin, setSignedIn, user }) {
  const signIn = (e) => {
    e.preventDefault();
    setSignedIn(true);
  };

  return (
    <header>
      <nav>
        <span className="logo"></span>
        <input type="checkbox" id="flyout-input" />
        <label htmlFor="flyout-input" className="flyout"></label>
        <div className="flyout-target">
          <div className="sandwich">
            <a href="/groups">Explore</a>
            <a href="/teams">Teams</a>
            <a href="help">Help</a>
          </div>
          <div className="user-nav">
            <a className="button" href="." onClick={signIn}>
              Sign in
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
