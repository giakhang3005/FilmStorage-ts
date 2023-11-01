import React from 'react'
import { Typography, Button, Table, Tag, Popover, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { Data, IContext } from '../../../App'
import { useState } from 'react'
import { INewsList } from "../News"
import axios from 'axios';

type Props = {
  setOption: (option: string) => void;
}

export function NewsEdit({ setOption }: Props) {
  const { Title } = Typography

  //Global State
  const { isDarkMode } = React.useContext(Data) as IContext;

  //Internal State
  const [newsList, setNewsList] = useState<Array<INewsList> | []>([])

  const getNews = () => {
    setLoading(true)
    axios.get('https://65388587a543859d1bb18661.mockapi.io/khangtng/v1/lab7_news')
      .then((res) => setNewsList(res.data.reverse()))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  React.useEffect(() => {
    getNews()
  }, [])

  //!handle delete
  const [loading, setLoading] = useState<boolean>(false)
  const handleDelete = (id: number) => {
    setLoading(true)
    axios.delete(`https://65388587a543859d1bb18661.mockapi.io/khangtng/v1/lab7_news/${id}`)
      .then(() => {
        message.success('Deleted successfully');
        getNews();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  //!handle edit
  const handleEdit = (news: INewsList) => {
    localStorage.setItem('editingNews', JSON.stringify(news));
    setOption('editNews')
  }

  //Columns for table
  const columns: ColumnsType<INewsList> = [
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
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      key: 'image',
      align: 'center',
      render: (news) => {
        return (
          //Hover to show image
          <Popover placement='left' content={<img style={Object.assign({ maxHeight: '200px' }, { margin: 0 }, { padding: 0 })} src={news.image} />}>
            <Tag className='trailerTag' color={isDarkMode ? "#ab1a13" : "#d62d24"}>Hover</Tag>
          </Popover>
        )
      }
    },
    {
      title: 'Post',
      key: 'post',
      render: (news) => {
        //Click to open trailer modal
        return <a href={news.link} target="_blank"><Tag className='trailerTag' color={isDarkMode ? "#ab1a13" : "#d62d24"}>View</Tag></a>
      }
    },
    {
      title: '',
      key: 'manage',
      colSpan: 1,
      render: (news) => {
        //Click to open trailer modal
        return (
          <>
            <EditOutlined onClick={() => handleEdit(news)} style={{ margin: '0 8px 0 0' }} />
            <DeleteOutlined onClick={() => handleDelete(news.id)} style={isDarkMode ? { color: '#ab1a13' } : { color: '#d62d24' }} />
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
          Manage News
        </span>

        {/* Add Button */}
        <Button onClick={() => setOption("addNews")} style={Object.assign({margin: '2px 0 0 0'}, { fontWeight: 600 }, { boxShadow: '0 0 5px gray' })} type={isDarkMode ? "primary" : "default"} icon={<PlusOutlined />}>
          ADD NEWS
        </Button>
      </Title>

      {/* Table */}
      <Table pagination={{ pageSize: 5 }} size="middle" style={Object.assign({ margin: '8px 20px 0 0' }, { height: '100%' })} columns={columns}
        dataSource={newsList} loading={loading}
        rowKey="id" />
    </div>

  )
}