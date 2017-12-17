import React from 'react'
import {Layout} from 'antd'

import Sider from './sider'

const menuUsers = [
    {key: "profile", title: "Profile", icon: "user", link: "/users/profile"},
    {key: "password", title: "Change Password", icon: "key", link: "/users/password"}
]

const Users = (props)=>{
    const {component: Component} = props;
    console.log('props user.index ', props);
    return(
        <Layout style={{backgroundColor: '#FFF', margin: 20}}>
            <Sider menus={menuUsers} path={props.path}/>
            <Component {...props}/>
        </Layout>
    )

}

export default Users;
