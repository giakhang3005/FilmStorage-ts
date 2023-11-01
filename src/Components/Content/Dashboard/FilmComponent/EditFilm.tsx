import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Row, Col, Typography, Input, DatePicker, message, Spin, Popover } from 'antd'
import { LeftOutlined, EyeOutlined, EyeFilled } from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs';
// import { v4 } from 'uuid'
import axios from 'axios'
import { IFilmsList } from '../../../../App'


type Props = {
    isDarkMode: boolean;
    setOption: (option: string) => void;
    fetchFilm: () => void;
}

export function EditFilm({ setOption, isDarkMode, fetchFilm }: Props) {
    const { Title } = Typography;

    //parse film from localStorage
    const parseEditingFilm = () => {
        const localStorageFilm = localStorage.getItem('editingFilm')
        if (localStorageFilm !== null) {
            const film = JSON.parse(localStorageFilm)
            setId(film.id)
            setTitle(film.title)
            setSelectedYear(film.year)
            setNation(film.nation)
            setImage(film.image)
            setTrailer(film.trailer)
            setDescription(film.description)
        }
    }
    useEffect(() => {
        parseEditingFilm()
    }, [])

    //!States
    const [id, setId] = useState<number>()
    const [title, setTitle] = useState<string | undefined>('')
    const [selectedYear, setSelectedYear] = useState<number | undefined>(0)
    const [nation, setNation] = useState<string | undefined>('')
    const [image, setImage] = useState<string>('')
    const [trailer, setTrailer] = useState<string>('')
    const [description, setDescription] = useState<string | undefined>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<string>('')
    const now = dayjs();

    //Year handlers
    const handleYearChange = (year: dayjs.Dayjs | null): void => {
        setSelectedYear(year?.year())
    }

    //get Youtube ID
    function getId(url: string): string | null {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    //!Handle Update
    const [loading, setLoading] = useState<boolean>(false)
    const handleUpdate = (): void => {
        const embedTrailerLink = `https://www.youtube.com/embed/${trailer !== undefined ? getId(trailer) : ''}`

        const newFilm = {
            // id: v4(),
            title: title,
            year: selectedYear,
            image: image,
            description: description,
            nation: nation,
            trailer: embedTrailerLink,
        }

         //Validate Errors
         const titleErr = newFilm.title === undefined || newFilm.title === "" ? true : false
         const descErr = newFilm.description === undefined || newFilm.description === "" ? true : false
         const nationErr = newFilm.nation === undefined || newFilm.nation === "" ? true : false
         const trailerErr = !trailer?.includes('/')
         const imageErr = !image?.includes('/') 
         const yearErr = newFilm.year === 0 ? true : false

 
         //Error messages
         const emptyErrMessage = 'You can not leave anything empty'
         const linkErrMessage = 'Image and Trailer must be a link'
 
         if (!titleErr && !descErr && !nationErr && !trailerErr && !imageErr && !yearErr) {
             setLoading(true)
             axios.put(`https://65388587a543859d1bb18661.mockapi.io/khangtng/v1/lab7/${id}`, newFilm)
                 .then((res) => {
                     message.success('Updated successfully');
                     fetchFilm();
                    //  setOption("manageFilms")
                 })
                 .catch((err) => {console.log(err); message.error('Failed to Update')})
                 .finally(() => setLoading(false))
         } else {
             message.error(trailerErr || imageErr ? linkErrMessage : emptyErrMessage)
         }
        
    }

    return (
        <div style={Object.assign({ height: '100vh' }, { overflow: 'scroll' })}>
            {/* Title */}
            <Button disabled={loading} type="text" onClick={() => setOption("manageFilms")} icon={<LeftOutlined />}>Back</Button>
            <Title level={2} style={Object.assign({ margin: 0 }, { padding: '0 5% 0 15px' }, { display: 'flex' }, { justifyContent: 'space-between' }, isDarkMode && { color: 'white' })}>
                <span style={Object.assign({ padding: '0 0 5px 0' }, { borderBottom: '1px solid' }, isDarkMode && { borderColor: 'white' })}>
                    EDIT FILM
                </span>
            </Title>

            <Spin spinning={loading}>
                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Title: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input className='name' placeholder="Enter movie's name" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Year: </Title>
                    </Col>
                    <Col xs={9}>
                        <DatePicker style={{ width: '100%' }} onChange={handleYearChange} value={now.set('year', selectedYear !== undefined ? selectedYear : now.year())} picker="year" />
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Nation: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input className='nation' placeholder="Enter movie's nation" value={nation} onChange={(e) => setNation(e.target.value)}></Input>
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Image: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input className='image' placeholder="Enter movie's image url" value={image} onChange={(e) => setImage(e.target.value.trim())}></Input>
                    </Col>
                    <Col xs={1}>
                        {image.length > 0 && (<Popover content="Preview Image">
                            <EyeFilled className='showModalEye' id={isDarkMode ? 'eyeDark' : 'eyeLight'}
                                onClick={() => { setShowModal(true); setModalContent('image') }} />
                        </Popover>)}
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Trailer: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input className='trailer' placeholder="Enter movie's youtube trailer" value={trailer} onChange={(e) => setTrailer(e.target.value.trim())}></Input>
                    </Col>
                    <Col xs={1}>
                        {trailer.length > 0 && (<Popover content="Preview Trailer">
                            <EyeFilled className='showModalEye' id={isDarkMode ? 'eyeDark' : 'eyeLight'}
                                onClick={() => { setShowModal(true); setModalContent('trailer') }} />
                        </Popover>)}
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>
                        <Title level={5} className="removeMarginPadding">Description: </Title>
                    </Col>
                    <Col xs={9}>
                        <Input.TextArea className='description' placeholder="Describe about the movie" value={description} onChange={(e) => setDescription(e.target.value)}></Input.TextArea>
                    </Col>
                </Row>

                <Row className='InputContainer'>
                    <Col xs={1}></Col>
                    <Col xs={4}>

                    </Col>
                    <Col xs={9}>
                        <Button
                            onClick={handleUpdate} 
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
                        modalContent === 'trailer' ? <iframe
                            className='embedVideo'
                            width="1000"
                            height="650"
                            src={`https://www.youtube.com/embed/${trailer !== undefined ? getId(trailer) : ''}`}
                            title="YouTube video player"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        // allowFullscreen={true}
                        ></iframe> : <img style={{ maxHeight: '650px' }} src={image} />
                    )}
                </div>
            </div>
        </div>
    )
}