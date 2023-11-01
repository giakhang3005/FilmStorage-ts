import React from 'react'
import { useEffect } from 'react';
import { useContext, useState } from "react";
import { message, Typography, Col, Row } from "antd";
import ".././Content.css";
import { Data, IContext } from "../../../App"
import { useNavigate } from "react-router-dom";
import { ManageMenu } from './ManageMenu';
import { FilmEdit } from './FilmEdit';
import { NewsEdit } from './NewsEdit';
import { AddFilm } from './\bFilmComponent/AddFilm';
import { EditFilm } from './\bFilmComponent/EditFilm';
import { AddNews } from './NewsComponent/AddNews';
import {EditNews} from './NewsComponent/EditNews'

type Props = {}

export function Manage({ }: Props) {
    const { isDarkMode, user, fetchFilm } = useContext(Data) as IContext;

    const { Title, Text } = Typography;
    const navigate = useNavigate();

    const checkPermission = (): void => {
        if (sessionStorage.getItem('user') === null) {
            navigate("/");
        }
    }

    useEffect(() => {
        checkPermission()
    }, [user])

    const [Option, setOption] = useState<string | null>('manageFilms')

    return (
        <div className="AboutBody" id={isDarkMode ? "DarkContentBody" : ""}>
            <Title
                className="AboutTitle"
                style={{ margin: 0 }}
                id={isDarkMode ? "DarkTitleAbout" : "LightTitleAbout"}
            >
                MANAGE
            </Title>
            <Row className="manageBody">
                <Col xs={24} sm={4}><ManageMenu Option={Option} setOption={setOption} isDarkMode={isDarkMode} /></Col>
                <Col className="manageBg" id={isDarkMode ? "darkManageBg" : "lightManageBg"} xs={24} sm={20}>
                    {
                        Option === "manageFilms" ? <FilmEdit fetchFilm={fetchFilm} setOption={setOption} /> :
                            Option === "addFilm" ? <AddFilm fetchFilm={fetchFilm} isDarkMode={isDarkMode} setOption={setOption} /> :
                                Option === "editFilm" ? <EditFilm fetchFilm={fetchFilm} isDarkMode={isDarkMode} setOption={setOption} /> :
                                    Option === "manageNews" ? <NewsEdit setOption={setOption} /> :
                                        Option === "addNews" ? <AddNews setOption={setOption} isDarkMode={isDarkMode} /> :
                                            Option === "editNews" ? <EditNews setOption={setOption} isDarkMode={isDarkMode} /> : <></>
                    }
                </Col>
            </Row>
        </div>
    )
}