import React from 'react'
import { useContext, useState } from "react";
import { Typography } from "antd";
import "./Content.css";
import { Data, IContext } from "../../App"

type Props = {

}

export function About({ }: Props) {
  const { isDarkMode, filmsList } = useContext(Data) as IContext;
  const { Title, Text } = Typography;
  return (
    <div className="AboutBody" id={isDarkMode ? "DarkContentBody" : ""}>
      <Title
        className="AboutTitle"
        id={isDarkMode ? "DarkTitleAbout" : "LightTitleAbout"}
      >
        ABOUT
      </Title>
      <Text
        className="AboutContent"
        id={isDarkMode ? "DarkAboutContent" : ""}
      >
        Welcome to Films Storage, your cinematic haven! We're more than a
        website; we're the ultimate destination for film enthusiasts. Dive into
        our extensive collection, where every film is a piece of art waiting to
        be discovered. Our platform goes beyond storage, providing in-depth
        details, user-friendly navigation, and a thriving community for film
        lovers. Join us in celebrating the magic of cinema at Films Storage.
        🍿🎬
      </Text>
      {/* <div className="FlowingGallery">
        <ul>
          {filmsList?.map((film) => {
            return <li><img src={film.image} /></li>
          })}
        </ul>
      </div> */}
    </div>
  )
}