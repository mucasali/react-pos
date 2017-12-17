import React, {Component} from 'react'
import {Col, Icon, Popover, Menu, Modal} from 'antd'

const confirm = Modal.confirm;

export default class Item extends Component{

  constructor(){
    super()
    this.state = {
      showPopover : false
    }
  }

  hidePopover(){
    this.setState({showPopover: false})
  }

  handleVsiblePopover(visible){
    this.setState({showPopover: visible})
  }

  showDeleteConfirm(store, account, item){
    confirm({
      title: 'Are you sure delete this '+item.type+' ??',
      content: item.type+' '+item.name,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk(){
        store.delete(account.token, item._id)
      }
    })
  }

  showInfoItem(item){
    // console.log('on showInfoItem', item, item.detail)
    Modal.info({
      title: item.name,
      width: 'fit-content',
      content: (
        <div>
          {
            item.detail && Object.keys(item.detail).map((detail, iter)=>{
              return <p key={iter}>{detail} : {item.detail[detail]}</p>
            })
          }
        </div>
      ),
      okText: 'Ok'
    })
  }

  handleOpen(item, history){
    if(item.type === 'folder'){
      history.push('/'+item._id);
    }else if(item.detail && item.detail.url){
      window.open(item.detail.url, '_blank')
    }
  }

  handleClick({key}){
    const {store, item, account, history} = this.props;
    console.log('on handleClick', this.props)
    this.hidePopover();
    switch(key){
      case 'open' : this.handleOpen(item, history); break;
      case 'info' : this.showInfoItem(item); break;
      case 'rename' : store.showInput(store.typeUpdate, item); break;
      case 'remove' : this.showDeleteConfirm(store, account, item); break;
      default: break;
    }
  }

  popOver(iconOpen, _id){

    return (
      <Menu onClick={this.handleClick.bind(this)}>
        <Menu.Item key='open'>
          <p><Icon type={iconOpen}/> Open</p>
        </Menu.Item>
        <Menu.Item key='info'>
          <p><Icon type="info-circle-o"/> Get Info </p>
        </Menu.Item>
        <Menu.Item key='rename'>
          <p><Icon type="edit"/> Rename </p>
        </Menu.Item>
        <Menu.Item key="remove">
          <p><Icon type="delete"/> Delete </p>
        </Menu.Item>
      </Menu>
  )}

  render(){
    const {name, type, _id} = this.props.item;
    const icon = type === 'folder' ? 'folder' : 'file';

    return(
      <Col xs={20} sm={8} md={6} lg={4} xl={2} className="colContent" >
        <Popover
          placement="right"
          title={name}
          content={this.popOver(icon, _id)}
          trigger="click"
          visible={this.state.showPopover}
          onVisibleChange={this.handleVsiblePopover.bind(this)}
        >
            <Icon type={icon}/>
        </Popover>
        {name ? <p>{name}</p> : ""}
      </Col>
    )
  }
}
