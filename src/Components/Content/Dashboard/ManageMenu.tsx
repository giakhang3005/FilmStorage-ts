import React from 'react'
import type { MenuProps } from 'antd';
import {Menu} from 'antd';
import {FolderOpenFilled, NotificationFilled} from '@ant-design/icons'

type Props = {
  isDarkMode: boolean;
  Option: string | null;
  setOption: (option: string) => void;
}

//decalre Item
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>['items'][number];

export function ManageMenu({ Option, setOption, isDarkMode }: Props) {

  const menuItems: MenuProps['items'] = [
    getItem("Films", "manageFilms", <FolderOpenFilled />),
    getItem("News", "manageNews", <NotificationFilled />),
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    setOption(e.key);
    // console.log(e.key)
    // console.log(Option)
  };

  return (
    <div>
      <Menu
      onClick={onClick}
      style={Object.assign({ width: '100%' }, {height: '100vh'}, {fontWeight: 600}, isDarkMode ? {background: '#1b1b1b'} : {background: 'white'})}
      theme={isDarkMode ? "dark" : "light"}
      defaultSelectedKeys={['manageFilms']}
      mode="inline"
      items={menuItems}
    />
    </div>
  )
}