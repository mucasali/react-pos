import React from 'react'
import {AutoComplete, Input, Icon} from 'antd'

const searchInput = ()=>{
    const dataSource = [{
      title: 'Batrai',
      children: [{
        title: 'AntDesign',
        count: 10000,
      }, {
        title: 'AntDesign UI',
        count: 10600,
      }],
    }, {
      title: 'Jam',
      children: [{
        title: 'AntDesign UI 有多好',
        count: 60100,
      }, {
        title: 'AntDesign 是啥',
        count: 30010,
      }],
    }, {
      title: 'Arang',
      children: [{
        title: 'AntDesign 是一个设计语言',
        count: 100000,
      }],
    }];

    function renderTitle(title) {
      return (
        <span>
          {title}
          <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >更多
          </a>
        </span>
      );
    }

    const options = dataSource.map(group => (
        <AutoComplete.OptGroup
            key={group.title}
            label={renderTitle(group.title)}
        >
            {group.children.map(opt => (
              <AutoComplete.Option key={opt.title} value={opt.title}>
                {opt.title}
                <span className="certain-search-item-count">{opt.count} 人 关注</span>
              </AutoComplete.Option>
            ))}
        </AutoComplete.OptGroup>
        )).concat([
        <AutoComplete.Option disabled key="all" className="show-all">
            <a
              href="https://www.google.com/search?q=antd"
              target="_blank"
              rel="noopener noreferrer"
            >
              Title
            </a>
        </AutoComplete.Option>,
    ]);

    return(
        <AutoComplete
            style={{width: 200}}
            dataSource={options}>
            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
        </AutoComplete>
    )
}

export default searchInput;
