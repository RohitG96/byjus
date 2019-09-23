import React from 'react';
import { connect } from 'react-redux';
import { Spin, Col, Row } from 'antd';
// import * as moment from 'moment';
import { Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import fetchJobProfiles from './actions/fetchJobProfiles';
// import { Collapse } from 'antd';



import { Table } from 'antd';
// const { Panel } = Collapse;

// const data = [
//   {
//     applylink: "https://www.techgig.com/jobs/Senior-Knowledge-Analyst-CKA/59843",
//     companyname: "Boston Consultancy Group",
//     created: "",
//     enddate: "",
//     experience: "4-6 yrs",
//     jd: "",
//     location: "Bengaluru/Bangalore",
//     salary: "",
//     skills: "cassandra",
//     source: "techgig",
//     startdate: "",
//     timestamp: 1528959791.958316,
//     title: "Senior Knowledge Analyst CKA",
//     type: "",
//     __v: 0,
//     _id: "5b2b8a98263a5020388e87dc"
//   }
// ];

class Entries extends React.PureComponent {
  state = {
    fetch: false,
    sortedInfo: { columnKey: "location", order: "descend" },
  }
  getColumns() {
    let columns = [
      {
        title: 'Loacation',
        dataIndex: 'location',
        sorter: (a, b) => ('' + a.location).localeCompare(b.location),
        sortOrder: this.state.sortedInfo.columnKey === 'location' && this.state.sortedInfo.order,
        width: '15%',
        ...this.getColumnSearchProps("location")
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        sorter: (a, b) => ('' + a.skills).localeCompare(b.skills),
        width: '15%',
        sortOrder: this.state.sortedInfo.columnKey === 'skills' && this.state.sortedInfo.order,
        ...this.getColumnSearchProps("skills")
      },
      {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => ('' + a.title).localeCompare(b.title),
        width: '15%',
        sortOrder: this.state.sortedInfo.columnKey === 'title' && this.state.sortedInfo.order,
        ...this.getColumnSearchProps("title")
      },
      {
        title: 'Company Name',
        dataIndex: 'companyname',
        sorter: (a, b) => ('' + a.companyname).localeCompare(b.companyname),
        width: '15%',
        sortOrder: this.state.sortedInfo.columnKey === 'companyname' && this.state.sortedInfo.order,
        ...this.getColumnSearchProps("companyname")
      },
      {
        title: 'Experience',
        dataIndex: 'experience',
        sorter: (a, b) => ('' + a.experience).localeCompare(b.experience),
        width: '10%',
        sortOrder: this.state.sortedInfo.columnKey === 'experience' && this.state.sortedInfo.order,
        ...this.getColumnSearchProps("experience")
      },
      {
        title: 'Source',
        dataIndex: 'source',
        sorter: (a, b) => ('' + a.source).localeCompare(b.source),
        width: '10%',
        sortOrder: this.state.sortedInfo.columnKey === 'source' && this.state.sortedInfo.order,
        ...this.getColumnSearchProps("source")
      },
      {
        title: 'Created At',
        dataIndex: 'created',
        sorter: (a, b) => ('' + a.created).localeCompare(b.created),
        width: '10%',
        sortOrder: this.state.sortedInfo.columnKey === 'created' && this.state.sortedInfo.order,
        ...this.getColumnSearchProps("created")
      },
      {
        title: 'Expires At',
        dataIndex: 'enddate',
        sorter: (a, b) => ('' + a.enddate).localeCompare(b.enddate),
        width: '10%',
        sortOrder: this.state.sortedInfo.columnKey === 'enddate' && this.state.sortedInfo.order,
        ...this.getColumnSearchProps("enddate")
      }
    ];
    return columns
  }

  getLocationFilters(index) {
    let hashes = this.props.newPage.profileList.reduce((hashes, val) => {
      hashes[val[index]] = val[index]
      return hashes
    })
    console.log(hashes)
    return Object.keys(hashes).map((val) => {
      return { type: val, name: val || "undefined" }
    })


  }

  componentDidMount() {
    this.props.fetchJobProfiles();
  }

  sortOnJobLocation() {
    this.setState({ ...this.state, data: this.props.newPage.sorted(this.state.params) })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      ...this.state,
      sortedInfo: sorter,
    });

  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => { return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    let value = selectedKeys[0]
    console.log("dataindex", dataIndex, value)
    let count = this.props.newPage.profileList.reduce((acc, record) => {
      if (record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()))
        acc++
      return acc
    }, 0)
    console.log("count", count)
    this.setState({ ...this.state, searchText: selectedKeys[0], count: count });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {

    console.log(this.props.collection)
    if (this.props.newPage.status === "loading" || this.props.newPage.status === "ready")
      return (<div><br /><Spin size="large" />Loading</div>)
    if (this.props.newPage.status === "error")
      return (<h1> Error </h1>)
    if (this.props.newPage.status === "success" && this.state.fetch === false) {
      this.setState({ ...this.state, fetch: true, count: this.props.newPage.profileList.length, expiring: false })
    }
    return (
      <div>
        {/* <Row>
          <Collapse accordion>
            <Panel header="CLick here to see expiring job list" key="1">
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Table
                    columns={this.getColumns()}
                    rowKey={record => record._id}
                    dataSource={this.props.newPage.profileList}
                    // pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
            </Panel>
          </Collapse>
        </Row> */}
        <Row>
          <h1>Total Records found: {this.state.count}</h1>
        </Row>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <Table
              columns={this.getColumns()}
              rowKey={record => record._id}
              dataSource={this.props.newPage.profileList}
              // pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </div>
    );
  }

}

const mapStateToProps = ({ entries: { collection, newPage } }) => ({ collection, newPage });
const actions = { fetchJobProfiles };

export default connect(
  mapStateToProps,
  actions,
)(Entries);