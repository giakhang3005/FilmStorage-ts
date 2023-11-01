import React from 'react'
import { useState, useContext, useEffect } from "react";
import { Data, IContext } from "../../App";
import "./Content.css";
import { Col, Row, Typography, Spin } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import axios from 'axios';

type Props = {}

export interface INewsList {
  id: string;
  image: string;
  title: string;
  description: string;
  time: string;
  link: string;
}

export function News({ }: Props) {
  //declare newsList as an array of INewsList or null
  const [newsList, setNewsList] = useState<Array<INewsList> | null>(null)

  const { isDarkMode } = useContext(Data) as IContext;
  const { Text, Title } = Typography;

  //! Fetch
  const [loading, setLoading] = useState<boolean>(false)
  const fetchData = (): void => {
    setLoading(true)
    axios.get('https://65388587a543859d1bb18661.mockapi.io/khangtng/v1/lab7_news')
      .then((res) => setNewsList(res.data.reverse()))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="ContentBody" id={isDarkMode ? "DarkContentBody" : ""}>
      <Row>
        <Col xs={0} sm={1} md={2} lg={5}></Col>
        <Col xs={24} sm={22} md={20} lg={14} style={{ overflow: "scroll" }}>
          <Title
            className="NewsTitle"
            id={isDarkMode ? "DarkTitleAbout" : "LightTitleAbout"}
          >
            NEWS
          </Title>
          <Spin spinning={loading}>
            {newsList?.map((news: INewsList, index: number) => {
              return (
                <div className="NewsBox" key={index}>
                  <img className="imageNews" src={news.image}  />
                  <div className="NewsBoxContent">
                    <div>
                      <a href={news.link} target="_blank" style={isDarkMode ? { color: "#ab1a13" } : { color: "#d62d24" }}>{news.title}</a>
                    </div>
                    <div>{news.description}</div>
                    <div>
                      <ClockCircleOutlined /> {news.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </Spin>
        </Col>
        <Col xs={0} sm={1} md={2} lg={5}></Col>
      </Row>
    </div>
  );
}
