import React from 'react'
import {Layout} from 'antd'
import {inject} from 'mobx-react'


class Activity extends React.Component {
    state = {
        collapsed: false,
    };

    constructor({Account, match}){
        super()
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    // componentWillMount(){
    //     // console.log('on willmount ', this.props, this.state);
    //     this.getList()
    // }
    //
    // componentWillReceiveProps(){
    //     this.getList()
    // }
    //
    // async getList(){
    //     const {Account, Bucket, history} = this.props;
    //     const params = history.location.pathname !== "/" ? history.location.pathname : Account.profile._id;
    //     this.idBucket = params.replace("/","");
    //     const result = await Bucket.list(Account.token, this.idBucket);
    //     // console.log('on getList ', result)
    //     if(result.status === 403){ history.push('/login')}
    // }

    render() {
        const {Account, Bucket, history} = this.props;
        return (
            <Layout >

            </Layout>
        );
    }
}

export default inject('Bucket')(Activity);
