import React from 'react'
import { Switch, Button } from 'antd'
import { BulbFilled, BulbOutlined } from '@ant-design/icons'

type Props = {
  isDarkMode: boolean;
  setIsDarkMode: (state: boolean) => void;
}

export function SwitchMode({ isDarkMode, setIsDarkMode }: Props) {
  return (

    // <Switch
    //   className="ModeSwitch"
    //   style={{ margin: "0 0 8px 0" }}
    //   checkedChildren="Dark"
    //   unCheckedChildren="Light"
    //   size="small"
    //   checked={isDarkMode}
    //   onClick={() => setIsDarkMode(!isDarkMode)}
    // />
    <Button icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
      style={Object.assign({ margin: '0 0 8px 0' }, { width: '100%' }, {boxShadow: 'none'})}
      type={isDarkMode ? `primary` : `default`}
      onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? "Dark Mode" : "Light Mode"}
    </Button>
  )
}