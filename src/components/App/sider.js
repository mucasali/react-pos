import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'

const {Sider} = Layout

const sider2 = ({menus, path})=>{

    return(
        <Sider width={200}>
            <Menu
                mode="inline"
                style={{height: '100%'}}
            >
                {
                    menus && menus.map((menu, iter)=>{
                        return (
                            <Menu.Item
                                key={menu.name}
                                selected
                            >
                                <Link to="/">
                                    <Icon type={menu.icon}/>
                                    <span>{menu.title}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </Sider>
    )
}

export default sider2;
