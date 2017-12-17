import React from 'react'
import {Breadcrumb, Layout} from 'antd'
import {Link} from 'react-router-dom'

const breadcrumb = (props)=>{
    const {parents, rootParent} = props;

    const renderParent = ()=>{
        let parent = parents;
        let par = []
        while(parent != null){
            par.splice(0, 0, (
                <Breadcrumb.Item key={parent._id}>
                    <Link to={'/'+parent._id}>{parent.name}</Link>
                </Breadcrumb.Item>
            ))
            parent = parent.idBucket;
        }
        return par;
    }

    return(
        <Layout style={{ padding: '0 10px 10px' }}>
            <Breadcrumb>
                <Breadcrumb.Item >
                    <Link to={'/'+rootParent}>Root</Link>
                </Breadcrumb.Item>
                { renderParent() }
            </Breadcrumb>
        </Layout>
    )
}

export default breadcrumb;
