import React, { Component, PropTypes } from 'react';
import DkpMetadata from './DkpMetadata';
import ExportList from './ExportList';
import ExportForm from './ExportForm';
import style from './style';
import { connect } from 'react-redux';
import { exportsGetData, exportsPostData } from '../actions/exports';

class App extends Component {
  constructor(props) {
    super(props);
    // Binding to individual component state no longer necessary as single state = redux store
    // this.props.getExports = this.props.getExports.bind(this);
    // this.props.postExport  = this.props.postExport .bind(this);
  }

  componentDidMount() {
    this.props.getExports('http://localhost:3001/api/exports');
  }

  render() {



    return (
      <div style={ style.commentBox }>
        <h2>Certus Excessum DKP Tracker</h2>
        <DkpMetadata data={ this.props.exports } />
        <ExportForm onExportSubmit={ this.props.postExport }/>
        <ExportList data={ this.props.exports }/>
      </div>
    )
  }
}

App.propTypes = {
  getExports: PropTypes.func.isRequired,
  postExport: PropTypes.func.isRequired,
  exports: PropTypes.object.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        exports: state.exports, // passing exports.exports here should work fine?
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExports: (url) => dispatch(exportsGetData(url)),
        postExport: (url, data) => dispatch(exportsPostData(url, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
