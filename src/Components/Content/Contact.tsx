import React from 'react'
import { useContext } from "react";
import { Data, IContext } from "../../App";
import "./Content.css";
import { Typography, Button } from "antd";
import { FacebookFilled, PhoneFilled, MailFilled } from "@ant-design/icons";

type Props = {}

export function Contact({ }: Props) {
  const { isDarkMode } = useContext(Data) as IContext;
  const { Title, Text } = Typography;
  return (
    <div className="AboutBody" id={isDarkMode ? "DarkContentBody" : ""}>
      <Title
        className="AboutTitle"
        id={isDarkMode ? "DarkTitleAbout" : "LightTitleAbout"}
      >
        CONTACT
      </Title>
      <Text
        className="AboutContent"
        id={isDarkMode ? "DarkAboutContent" : ""}
        style={{ fontSize: "24px" }}
      >
        Truong Nguyen Gia Khang
        <br />
        <span style={{ fontSize: "15px" }}>FPT University HCM, Viet Nam</span>
      </Text>
      <span className="ContactBtnContainer">
        <a href="mailto:someone@example.com">
          <Button
            className="ContactBtn"
            type="primary"
            icon={<MailFilled />}
          ></Button>
        </a>
        <a href="https://www.facebook.com/danny.neee" target="_blank">
          <Button
            className="ContactBtn"
            type="primary"
            icon={<FacebookFilled />}
          ></Button>
        </a>
        <a href="tel:0353610713">
          <Button
            className="ContactBtn"
            type="primary"
            icon={<PhoneFilled />}
          ></Button>
        </a>
      </span>
    </div>
  )
}