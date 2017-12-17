import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import './header.css'
const {Header} = Layout
const {SubMenu} = Menu

const header = observer(({account, history})=>{
  // const {profile} = account;
  // console.log('on header ', profile, logOut)

  const handleClick = ({key})=>{
    // console.log('click ', key)
    switch(key){
        case 'profile': history.push('/users/profile'); break;
        case 'logout': account.logOut(); history.push('/login'); break;
        default: break;
    }
  }

  return(
    <Header className="header">
        <Icon
            className="trigger"
            type={"menu-unfold"}
        />
        <div className="rightWarpper">
            <Menu mode="horizontal" className="menu" onClick={handleClick}>
                <SubMenu
                    style={{
                        fontSize: 80,
                    }}
                    title={
                        <span>
                            <Icon type="user" style={{fontSize:20}}/>
                            {account.username}
                        </span>
                    }
                >
                    <Menu.Item key="profile" >
                        <Icon type="setting"/> Profile
                    </Menu.Item>
                    <Menu.Item key="logout" >
                        <Icon type="logout"/> Sign out
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    </Header>
  )
})

export default header;
