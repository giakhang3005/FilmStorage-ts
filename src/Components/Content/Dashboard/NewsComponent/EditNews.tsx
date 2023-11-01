import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Row, Col, Typography, Input, DatePicker, message, Spin, Popover } from 'antd'
import { LeftOutlined, EyeFilled } from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios'
import { INewsList, News } from "../../News"

type Props = {
    isDarkMode: boolean;
    setOption: (value: string) => void
}

export function EditNews({isDarkMode, setOption}: Props) {

    const { Title } = Typography;

    //parse film from localStorage
    const parseEditingFilm = () => {
        const localStorageNews = localStorage.getItem('editingNews')
        if (localStorageNews !== null) {
            const news = JSON.parse(localStorageNews)
            setId(news.id)
            setTitle(news.title)
            setDescription(news.description)
            setImage(news.image)
            setLink(news.link)
            setTimeString(news.time)
        }
    }
    useEffect(() => {
        parseEditingFilm()
    }, [])

     //! STATE
     const [showModal, setShowModal] = useState<boolean>(false)
     const [loading, setLoading] = useState<boolean>(false)
     const [id, setId] = useState<string>('')
     const [title, setTitle] = useState<string>('')
     const [description, setDescription] = useState<string>('')
     const [link, setLink] = useState<string>('')
     const [timeString, setTimeString] = useState<string>('')
     const [image, setImage] = useState<string>('')

     const handleSubmit = () => {
        const newNews = {
            title: title.trim(),
            description: description.trim(),
            image: image,
            link: link,
            time: timeString,
        }

        const titleErr = newNews.title === ""
        const descriptionErr = newNews.description === ""
        const imageErr = !newNews.image.includes('/')
        const linkErr = !newNews.link.includes('/')

        if (!titleErr && !descriptionErr && !imageErr && !linkErr) {
            setLoading(true)
            axios.put(`https://65388587a543859d1bb18661.mockapi.io/khangtng/v1/lab7_news/${id}`, newNews)
                .then(() => {
                    message.success('Updated successfully');
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false))

        } else {
            message.error('You can not leave anything empty and image, post link must be an url')
        }
     }
    return (
        <div style={Object.assign({ height: '100vh' }, { overflow: 'scroll' })}>
            {/* Title */}
            <Button disabled={loading} type="text" onClick={() => setOption("manageNews")} icon={<LeftOutlined />}>Back</Button>
            <Title level={2} style={Object.assign({ margin: 0 }, { padding: '0 5% 0 15px' }, { display: 'flex' }, { justifyContent: 'space-between' }, isDarkMode && { color: 'white' })}>
                <span style={Object.assign({ padding: '0 0 5px 0' }, { borderBottom: '1px solid' }, isDarkMode && { borderColor: 'white' })}>
                    EDIT NEWS
                </span>
            </Title>

            <Spin spinning={loading}>
                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Title: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} className='name' placeholder="Enter title" maxLength={100} showCount></Input>
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Description: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} style={{ margin: '0 0 7px 0' }} className='name' placeholder="Enter a short description" maxLength={300} showCount />
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Image: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input className='image' placeholder="Enter image url" value={image.trim()} onChange={(e) => setImage(e.target.value.trim())}></Input>
                    </Col>
                    <Col xs={1}>
                        {image.length > 0 && (<Popover content="Preview Image">
                            <EyeFilled className='showModalEye' id={isDarkMode ? 'eyeDark' : 'eyeLight'}
                                onClick={() => { setShowModal(true) }} />
                        </Popover>)}
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Post Link: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input value={link.trim()} onChange={(e) => setLink(e.target.value.trim())} className='name' placeholder="Enter a short description" ></Input>
                    </Col>
                    <Col xs={1}>
                        {link.length > 0 && (
                            <Popover content="Preview link">
                                <a style={isDarkMode ? { color: 'white' } : { color: 'black' }} href={link} target="_blank">
                                    <EyeFilled className='showModalEye' id={isDarkMode ? 'eyeDark' : 'eyeLight'} />
                                </a>
                            </Popover>
                        )}
                    </Col>
                </Row>


                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>

                    </Col>
                    <Col xs={9}>
                        <Button
                            onClick={handleSubmit}
                            type="primary" style={{ boxShadow: 'none' }}>UPDATE</Button>
                    </Col>
                </Row>
            </Spin>

            {/* Modal */}
            <div
                id="myModal"
                className="modal"
                style={showModal ? { display: "block" } : { display: "none" }}
            >
                {/* Modal content */}
                <div
                    className="modal-content"
                    id={isDarkMode ? "modalblack" : "modalwhite"}
                >
                    <span className="close" onClick={() => setShowModal(false)}>
                        &times;
                    </span>
                    {showModal && (
                        <img style={{ maxHeight: '650px' }} src={image} />
                    )}
                </div>
            </div>
        </div>
    )
}