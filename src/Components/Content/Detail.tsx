import React from "react";
import { useContext, useState } from "react";
import { Data, IContext, IFilmsList } from "../../App";
import "./Content.css";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Typography, Spin } from "antd";
import { TrophyOutlined, YoutubeFilled } from "@ant-design/icons";

type Props = {}

export function Detail({}: Props) {
  const {isDarkMode, filmsList} = useContext(Data) as IContext

  //   Modal handler
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Title, Text } = Typography;

  //   Get url param
  const parameter = useParams();
  let parameterID: string = parameter.id === undefined ? '' : parameter.id


  //get film by param id
  const film = filmsList?.find((filmCheck): IFilmsList | boolean => {
    return filmCheck.id === parameterID
  })

  console.log(filmsList)


  return (
    <div
      className="ContentBody DetailContainer"
      id={isDarkMode ? "DarkContentBody" : ""}
    >
      <Row>
        <Col md={1}></Col>
        <Col xs={24} md={11} className="DetailImg">
          <img className="detailImg" src={`${film?.image}`} alt="Error loading image, please back to home" />
        </Col>

        <Col sm={1}></Col>

        <Col xs={24} md={11} className="DetailContent">
          {/* Film Title */}
          <Title
            className="DetailInfo"
            id={isDarkMode ? "darkModeCardCompTitle" : ""}
          >
            {film?.title}
          </Title>

          {/* Year */}
          <Title
            className="DetailInfo"
            id={isDarkMode ? "darkModeCardCompTitle" : ""}
            level={3}
          >
            <span id={isDarkMode ? "darkkeyword" : "lightkeyword"}>Year:</span>{" "}
            {film?.year}
          </Title>

          {/* Nation */}
          <Title
            className="DetailInfo"
            id={isDarkMode ? "darkModeCardCompTitle" : ""}
            level={3}
            style={{ marginBottom: "25px" }}
          >
            <span id={isDarkMode ? "darkkeyword" : "lightkeyword"}>
              Nation:{" "}
            </span>
            {film?.nation}
          </Title>

          {/* Description */}
          <Text
            className="detailDescription"
            id={isDarkMode ? "darkModeCardCompTitle" : ""}
          >
            {film?.description}
          </Text>

          {/* Trailer */}
          <Button
            className="TrailerBtn"
            id={isDarkMode ? "trailerdark" : "trailerlight"}
            icon={<YoutubeFilled />}
            onClick={() => setIsModalOpen(true)}
          >
            Watch Trailer
          </Button>
        </Col>
      </Row>

      {/* Modal */}
      <div
        id="myModal"
        className="modal"
        style={isModalOpen ? { display: "block" } : { display: "none" }}
      >
        {/* Modal content */}
        <div
          className="modal-content"
          id={isDarkMode ? "modalblack" : "modalwhite"}
        >
          <span className="close" onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          {isModalOpen && (
            <iframe
            className='embedVideo'
              width="1000"
              height="650"
              src={film?.trailer}
              title="YouTube video player"
              style={{border: 'none'}}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // allowFullscreen={true}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  )
}