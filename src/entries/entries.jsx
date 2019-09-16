import React from 'react';
import { connect } from 'react-redux';
import { Spin, Col, Row } from 'antd';
// import 'antd/dist/antd.css';
// import { Link } from 'react-router-dom';
// import initNewPage from './actions/initNewPage';
import fetchJobProfiles from './actions/fetchJobProfiles';

import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class Entries extends React.PureComponent{
    state = {
      fetch:false
    }
    componentDidMount() {
        this.props.fetchJobProfiles();
      }

    render(){
        console.log(this.props.collection)
        if(this.props.newPage.status === "loading" || this.props.newPage.status === "ready")
        return (<div><br/><Spin size="large" />Loading</div>)
        if(this.props.newPage.status === "error")
        return (<h1> Error </h1>)
        // return (<Row type="flex"><Col span={4}></Col><Col span={16}><h1>Entries</h1></Col><Col span={4}></Col></Row>)
        // return (<div><Layout>
        //   <Header>Header</Header>
        //   <Content>Content</Content>
        //   <Footer>Footer</Footer>
        // </Layout></div>)
        return (
          <Table dataSource={data}>
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </span>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a>Invite {record.lastName}</a>
                <Divider type="vertical" />
                <a>Delete</a>
              </span>
            )}
          />
        </Table>
        )
      }

}

const mapStateToProps = ({ entries: { collection, newPage } }) => ({ collection, newPage });
const actions = { fetchJobProfiles };

export default connect(
  mapStateToProps,
  actions,
)(Entries);