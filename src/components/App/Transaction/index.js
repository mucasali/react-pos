import React from 'react'
import {Layout, Icon, Card, Form, Input, AutoComplete} from 'antd'

import ProductSearch from '../Product/components/searchInput';
import Table from './components/table'
import './styles.css'

const {Content} = Layout

class Transaction extends React.Component{

    render(){
        return(
            <Content className="transaction">
                <div classname="container">
                    <p className="total">2.000.000</p>
                </div>
                <div className="container">
                    <Card>
                        <Form
                            layout="inline"
                        >
                            <Form.Item
                                label="Produk"
                            >
                                <ProductSearch />
                            </Form.Item>
                            <Form.Item
                                label="Qty"
                            >
                                <Input placeholder="Qty" id="error" />
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
                <div className="container">
                    <Table/>
                </div>
            </Content>
        )
    }

}

export default Transaction;
