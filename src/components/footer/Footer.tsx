//import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "20px", textAlign: "center", padding: "20px" }}>
          Built With 💘 By
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://prabhakar-vats.me"}
            >
              <span style={{ textDecoration: "underline" }}>Vats</span>
            </Link>
          </span>
          Copyright ©2024 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
