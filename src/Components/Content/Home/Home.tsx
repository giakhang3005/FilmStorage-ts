import React from 'react'
import { useContext } from "react";
import { Data, IContext } from "../../../App";
import ".././Content.css";
import { Carousel, Spin } from "antd";
import {MovieCard} from './MovieCard'

type Props = {}

export function Home({}: Props) {
  const {isDarkMode} = useContext(Data) as IContext;
  return (
<div className="ContentBody" id={isDarkMode ? "DarkContentBody" : ""}>
      <Carousel className="PosterSlider" autoplay >
        <img src="./assets/poster4.png" />
        <img src="./assets/poster5.png" />
        <img src="./assets/poster1.png" />
        <img src="./assets/poster2.png" />
        <img src="./assets/poster3.png" />
      </Carousel>
      
      <MovieCard />
    </div>
  )
}