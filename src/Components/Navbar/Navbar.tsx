import { useState, useEffect } from "react";
import React from 'react';
import { Typography, Button, Avatar, Popover } from "antd";
import { useContext } from "react";
import { Data } from "../../App";
import { IContext } from "../../App"
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { MenuOutlined, CloseOutlined, UserOutlined, DatabaseFilled } from "@ant-design/icons";
import { Menu } from "./Menu";
import { SwitchMode } from "./SwitchMode";
import { SignIn } from "./SignIn";
import { Logout } from "./Logout";
import { Link } from "react-router-dom"

type Props = {}

export function Navbar({ }: Props) {
    const { Title, Text } = Typography;

    const [showMenu, setShowMenu] = useState(false);

    const { isDarkMode, setIsDarkMode, setUser, user } = useContext(Data) as IContext;

    //get path
    const location = useLocation();
    const path: string = location.pathname;

    //parse user from localstorage
    const getUser = (): void => {
        const localUser = sessionStorage.getItem('user')
        localUser === null ? setUser(null) : setUser(JSON.parse(localUser))
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>

            <div className="Navbar" id={isDarkMode ? "darkNavbar" : ""}>
                <Title className="title" level={4}>
                    <span id={isDarkMode ? "darkfilms" : "lightfilms"}>Films</span>{" "}
                    <span id={isDarkMode ? "darkstorage" : "lightstorage"}>Storage</span>
                </Title>

                <Menu path={path} isDarkMode={isDarkMode} />
                <span className="lowWidthAva">
                    <p style={isDarkMode ? { color: 'white' } : { color: 'black' }}>{user?.name}</p>

                    <Popover style={{ display: 'flex' }}
                        content={
                            <>
                                {user === null ? <></> : <Link to="./manage"><Button type="default" style={Object.assign({ color: 'black' }, { background: 'white' }, { margin: '0 0 8px 0' }, { width: '100%' })} icon={<DatabaseFilled />}>Manage Data</Button></Link>}
                                <br />
                                <SwitchMode setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
                                {user === null ? <SignIn /> : <Logout />}
                            </>
                        }>

                        <Avatar src={user?.photoURL} icon={<UserOutlined />} style={Object.assign({ boxShadow: '0 0 4px white' }, { padding: 0 }, { margin: '0 1% 0 8px' })} />
                    </Popover>
                </span>
                {/* Menu Button */}
                <Button
                    className="MenuBtn"
                    id={isDarkMode ? "darkMenuBtn" : ""}
                    icon={showMenu ? <CloseOutlined /> : <MenuOutlined />}
                    onClick={() => setShowMenu(!showMenu)}
                ></Button>
            </div>

            <div
                className={`lowWidthMenu ${showMenu ? "lowWidthMenuDisplay" : "lowWidthMenuDisplayNone"
                    } `}
                id={isDarkMode ? "darkMenuHambur" : ""}
            >
                <Menu path={path} isDarkMode={isDarkMode} />
                <Popover style={{ display: 'flex' }}
                    content={
                        <>

                            {user === null ? <></> : <Link to="./manage"><Button type="default" style={Object.assign({ color: 'black' }, { background: 'white' }, { margin: '0 0 8px 0' }, { width: '100%' })} icon={<DatabaseFilled />}>Manage Data</Button></Link>}
                            <br />
                            <SwitchMode setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
                            {user === null ? <SignIn /> : <Logout />}
                        </>
                    }>

                    <Avatar src={user?.photoURL} style={Object.assign({ boxShadow: '0 0 4px white' }, { padding: 0 }, { margin: '0 1% 0 8px' })} />
                </Popover>
            </div>
        </>
    )
}