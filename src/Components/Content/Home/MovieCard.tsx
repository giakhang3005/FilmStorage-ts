import React from 'react'
import { useState, useContext } from "react";
import { Typography, Col, Row, Button } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Data, IContext } from "../../../App";

type Props = {}

export function MovieCard({ }: Props) {
  const { isDarkMode, filmsList } = useContext(Data) as IContext;
  const { Title } = Typography;

  return (
    <div className="MovieCardComp">
      <Title
        level={2}
        className="MovieCardCompTitle"
        id={isDarkMode ? "darkModeCardCompTitle" : ""}
      >
        MOVIES
      </Title>
      <Row className="FilmCardContainer">
        {filmsList?.map((film, key) => {
          return (
            <Col
              xs={20}
              sm={20}
              md={7}
              lg={7}
              className={`MovieCard`}
              key={key}
            >
              <img src={film.image} loading="lazy" />
              <div className="MovieCardContent">
                <p className="MovieCardText">{film.title}</p>
                <p className="MovieCardText">{film.year}</p>
                <p className="MovieCardText">{film.nation}</p>
                <Button
                  icon={<EyeFilled />}
                  shape="round"
                  type="default"
                  className="MovieCardText"
                >
                  <Link to={`/detail/${film.id}`}>More details</Link>
                </Button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  )
}