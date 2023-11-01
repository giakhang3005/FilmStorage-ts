import React from 'react'
import { Typography, Button, Table, Tag, Popover, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { IFilmsList, Data, IContext } from '../../../App'
import { useState } from 'react'
import axios from 'axios';

type Props = {
  setOption: (option: string) => void;
  fetchFilm: () => void;
}

export function FilmEdit({ setOption, fetchFilm }: Props) {
  const { Title } = Typography

  //Global State
  const { filmsList, isDarkMode } = React.useContext(Data) as IContext;

  //Internal State
  const [showModal, setShowModal] = useState<boolean>(false)
  const [trailerUrl, setTrailerUrl] = useState<string>("")

  //Handle show trailer
  const handleShowTrailer = (url: string): void => {
    setShowModal(true)
    setTrailerUrl(url)
  }

  //!handle delete
  const [loading, setLoading] = useState<boolean>(false)
  const handleDelete = (id: number) => {
    setLoading(true)
    axios.delete(`https://65388587a543859d1bb18661.mockapi.io/khangtng/v1/lab7/${id}`)
      .then(() => {
        message.success('Deleted successfully');
        fetchFilm()
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  //!handle edit
  const handleEdit = (film: IFilmsList) => {
    localStorage.setItem('editingFilm', JSON.stringify(film));
    setOption('editFilm')
  }

  //Columns for table
  const columns: ColumnsType<IFilmsList> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      key: 'nation',
    },
    {
      title: 'Image',
      key: 'image',
      align: 'center',
      render: (film) => {
        return (
          //Hover to show image
          <Popover placement='left' content={<img style={Object.assign({ maxHeight: '200px' }, { margin: 0 }, { padding: 0 })} src={film.image} />}>
            <Tag className='trailerTag' color={isDarkMode ? "#ab1a13" : "#d62d24"}>Hover</Tag>
          </Popover>
        )
      }
    },
    {
      title: 'Trailer',
      key: 'trailer',
      align: 'center',
      render: (film) => {
        //Click to open trailer modal
        return <Tag className='trailerTag' color={isDarkMode ? "#ab1a13" : "#d62d24"} onClick={() => handleShowTrailer(film.trailer)}>View</Tag>
      }
    },
    {
      title: '',
      key: 'manage',
      render: (film) => {
        //Click to open trailer modal
        return (
          <>
            <EditOutlined onClick={() => handleEdit(film)} style={{ margin: '0 8px 0 0' }} />
            <DeleteOutlined onClick={() => handleDelete(film.id)} style={isDarkMode ? { color: '#ab1a13' } : { color: '#d62d24' }} />
          </>
        )
      }
    },
  ]
  return (
    <div style={Object.assign({ height: '100%' }, { overflow: 'scroll' })}>
      <Title level={2} style={Object.assign({ margin: 0 }, { padding: '0 5% 0 15px' }, { display: 'flex' }, { justifyContent: 'space-between' }, isDarkMode && { color: 'white' })}>

        {/* Title */}
        <span style={Object.assign({ padding: '0 0 5px 0' }, { borderBottom: '1px solid' }, isDarkMode && { borderColor: 'white' })}>
          Manage Films
        </span>

        {/* Add Button */}
        <Button onClick={() => setOption("addFilm")} style={Object.assign({margin: '3px 0 0 0'}, { fontWeight: 600 }, { boxShadow: '0 0 5px gray' })} type={isDarkMode ? "primary" : "default"} icon={<PlusOutlined />}>
          ADD FILM
        </Button>
      </Title>

      {/* Table */}
      <Table size="middle" style={Object.assign({ margin: '8px 20px 0 0' }, { height: '100%' })} columns={columns} dataSource={filmsList} loading={filmsList.length === 0 || loading} rowKey="id" />

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
            <iframe
              className='embedVideo'
              width="1000"
              height="650"
              src={trailerUrl}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // allowFullscreen={true}
            ></iframe>
          )}
        </div>
      </div>
    </div>

  )
}