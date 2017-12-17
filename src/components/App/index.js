import React from 'react'
import { Layout, Menu, Icon} from 'antd';
import { Switch, Route, Link} from 'react-router-dom'

import Menus from '../../config/menu'
import Header from './header'
// import Sider from './sider'
import Activity from './Activity'
import Transaction from './Transaction'
import Users from './Users'
import ChangeProfle from './Users/Profile/change'
import ChangePassword from './Users/Password/change'

// import './style.css'

class App extends React.Component {

    renderSider(menus){
        return(
            <Layout.Sider width={200}>
                <div style={{height:"32px", margin:16}}>
                    <h2><Link to="/">Proofite Look</Link></h2>
                </div>
                <Menu
                    theme="dark"
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
                                    <Link to={"/"+menu.name}>
                                        <Icon type={menu.icon}/>
                                        <span>{menu.title}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Layout.Sider>
        )
    }

    render() {
        const {Account, history} = this.props;
        return (
            <Layout style={{height: '100%'}}>
                {this.renderSider(Menus)}
                <Layout>
                    <Header account={Account} history={history}/>
                    <Switch>
                        <Users path="/users/profile" component={()=> <ChangeProfle {...this.props} /> } />
                        <Users path="/users/password" component={()=> <ChangePassword {...this.props} />} />
                        <Route path="/transaction" component={()=> <Transaction {...this.props} />} />
                        <Route path="/" component={()=> <Activity {...this.props} />} />
                    </Switch>
                </Layout>
          </Layout>
        );
    }
}

export default App;
