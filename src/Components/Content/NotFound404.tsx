import React from 'react'
import { useContext } from "react";
import { Data, IContext } from "../../App";
import { Button } from "antd";
import "./Content.css";

type Props = {}

export function NotFound404({ }: Props) {
  const { isDarkMode } = useContext(Data) as IContext;
  return (
    <div className="ContentBody" id={isDarkMode ? "DarkContentBody" : ""}>
      {isDarkMode ? (
        <img className="notFoundImg" src="./assets/404notfound.png" />
      ) : (
        <img className="notFoundImg" src="./assets/404light.jpg" />
      )}
    </div>
  )
}