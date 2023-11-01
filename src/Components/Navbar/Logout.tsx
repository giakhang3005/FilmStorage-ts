import React from 'react'
import {Button, message} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'
import {useContext} from 'react'
import {Data, IContext} from '../../App'

type Props = {}

export function Logout({}: Props) {
    const {setUser} = useContext(Data) as IContext

    const handleLogout = (): void => {
        sessionStorage.removeItem('user')
        setUser(null)
        message.success('Logged out')
        localStorage.clear();
    }
  return (
    <span>
         <Button type="primary" onClick={handleLogout} icon={<LogoutOutlined />} style={Object.assign({width: '100%'}, {boxShadow: 'none'})}>Logout</Button>
    </span>
  )
}