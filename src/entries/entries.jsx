import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import initNewPage from './actions/initNewPage';
import fetchJobProfiles from './actions/fetchJobProfiles';
 

class Entries extends React.PureComponent{
    componentDidMount() {
        this.props.fetchJobProfiles();
        // console.log(api.get().then(on200))
      }

    render(){
        console.log(this.props.collection)
        return (<h1>Entries</h1>)
    }

}

const mapStateToProps = ({ entries: { collection } }) => ({ collection });
const actions = { fetchJobProfiles };

export default connect(
  mapStateToProps,
  actions,
)(Entries);