import React from 'react'
import {Icon, Table, Button} from 'antd'

const columns = [
    {
        title: "No.",
        dataIndex: "number",
        width: "5%"
    },{
        title: "Produk",
        dataIndex: "produk",
        key: "produk",
        width: "15%"
    },{
        title: "Detail",
        dataIndex: "detail",
        key: "detail",
        width: "15%"
    },{
        title: "Qty",
        dataIndex: "qty",
        key: "qty",
        width: "10%"
    },{
        title: "Harga",
        dataIndex: "price",
        key: "price",
        width: "10%"
    },{
        title: "Diskon",
        dataIndex: "discount",
        key: "discount",
        width: "10%"
    },{
        title: "Total",
        dataIndex: "total",
        key: "total",
        width: "10%"
    },{
        title: "Action",
        key: "action",
        width: "20%",
        render: (text, record)=>(
            <div>
                <Button icon="edit"> Ubah</Button>
                <Button icon="delete"> Hapus</Button>
            </div>
        )
    }
];

const data = [
    {
        produk: "amplas",
        detail: "-",
        qty: 12,
        price: "1,000",
        discount: 10,
        total: "11,800",
        number: "1"
    }
]

export default ()=>{
    return <Table columns={columns} dataSource={data}/>
}
