import React, { Component, PropTypes } from 'react';
import Graph from './Graph';
// import style from './style';
import { connect } from 'react-redux';
import { removeGraphMember, toggleGraphAverage } from '../actions/exports';

class ConfiguredGraph extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>{this.props.graphData.members}
      <Graph data={this.props.data}
             graphData={this.props.graphData.members}
             removeGraphMember={this.props.removeGraphMember}
             toggleGraphAverage={this.props.toggleGraphAverage} /></div>
    )
  }
}

ConfiguredGraph.propTypes = {
  data: PropTypes.array.isRequired,
  graphData: PropTypes.object.isRequired,
  removeGraphMember: PropTypes.func.isRequired,
  toggleGraphAverage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        graphData: state.graphData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      removeGraphMember: (member) => dispatch(removeGraphMember(member)),
      toggleGraphAverage: (bool) => dispatch(toggleGraphAverage(bool)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguredGraph);
