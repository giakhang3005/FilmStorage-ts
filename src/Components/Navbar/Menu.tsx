import React from 'react'
import { Link } from "react-router-dom";

type Props = {
  path: string;
  isDarkMode: boolean;
}

export function Menu({path, isDarkMode}: Props) {
  return (
    <ul id={isDarkMode ? "darknav" : "lightnav"}>
      <li>
        <Link
          className={
            path === "/" ? (isDarkMode ? "activedark" : "activelight") : ""
          }
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={
            path === "/about" ? (isDarkMode ? "activedark" : "activelight") : ""
          }
          to="/about"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className={
            path === "/news" ? (isDarkMode ? "activedark" : "activelight") : ""
          }
          to="/news"
        >
          News
        </Link>
      </li>
      <li>
        <Link
          className={
            path === "/contact"
              ? isDarkMode
                ? "activedark"
                : "activelight"
              : ""
          }
          to="/contact"
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}
