import React, { Component, PropTypes } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ExportList from './ExportList';
import MainNav from './MainNav';
import ExportForm from './ExportForm';
import style from './style';
import { connect } from 'react-redux';
import { exportsGetData, exportsPostData, uploadsClearErrored, uploadsHasErrored, uploadsClearSucceeded, uploadsHasSucceeded, addGraphMember, selectGraphType } from '../actions/exports';
import createBrowserHistory from 'history/createBrowserHistory'

class App extends Component {

  componentDidMount() {
    this.props.getExports('https://vgdkp.herokuapp.com/api/exports');
  }

  // const history = createBrowserHistory()

  render() {



    return (
      <Router>
        <div>

          <MainNav />



           <hr/>

          <Route exact path="/ce" render={(props) => (<ExportList data={ this.props.exports.ce }
                                                                addGraphMember= {this.props.addGraphMember}
                                                                selectGraphType={this.props.selectGraphType}/>)} />
          <Route exact path="/ggc" render={(props) => (<ExportList data={ this.props.exports.ggc }
                                                                addGraphMember= {this.props.addGraphMember}
                                                                selectGraphType={this.props.selectGraphType}/>)} />
          <Route exact path="/dp" render={(props) => (<ExportList data={ this.props.exports.dp }
                                                                addGraphMember= {this.props.addGraphMember}
                                                                selectGraphType={this.props.selectGraphType}/>)} />
          <Route exact path="/ev" render={(props) => (<ExportList data={ this.props.exports.ev }
                                                                addGraphMember= {this.props.addGraphMember}
                                                                selectGraphType={this.props.selectGraphType}/>)} />
          <Route path="/upload" render={(props) => (<ExportForm onExportSubmit={ this.props.postExport }
                                                                uploadsClearErrored={ this.props.uploadsClearErrored }
                                                                uploadsThrowErrored={ this.props.uploadsThrowErrored }
                                                                uploadsHasErrored= {this.props.uploadsHasErrored }
                                                                uploadsClearSucceeded={ this.props.uploadsClearSucceeded }
                                                                uploadsThrowSucceeded={ this.props.uploadsThrowSucceeded }
                                                                uploadsHasSucceeded= {this.props.uploadsHasSucceeded } />)} />

        </div>
      </Router>

    )
  }
}

App.propTypes = {
  getExports: PropTypes.func.isRequired,
  postExport: PropTypes.func.isRequired,
  uploadsClearErrored: PropTypes.func.isRequired,
  uploadsThrowErrored: PropTypes.func.isRequired,
  uploadsClearSucceeded: PropTypes.func.isRequired,
  uploadsThrowSucceeded: PropTypes.func.isRequired,
  addGraphMember: PropTypes.func.isRequired,
  selectGraphType: PropTypes.func.isRequired,
  exports: PropTypes.object.isRequired,
  exportsHasErrored: PropTypes.bool.isRequired,
  exportsIsLoading: PropTypes.bool.isRequired,
  uploadsHasErrored: PropTypes.bool.isRequired,
  uploadsHasSucceeded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        exports: state.exports,
        exportsHasErrored: state.exportsHasErrored,
        exportsIsLoading: state.exportsIsLoading,
        uploadsHasErrored: state.uploadsHasErrored,
        uploadsHasSucceeded: state.uploadsHasSucceeded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExports: (url) => dispatch(exportsGetData(url)),
        postExport: (url, data) => dispatch(exportsPostData(url, data)),
        uploadsClearErrored: (bool) => dispatch(uploadsClearErrored(bool)),
        uploadsThrowErrored: (bool) => dispatch(uploadsHasErrored(bool)),
        uploadsClearSucceeded: (bool) => dispatch(uploadsClearSucceeded(bool)),
        uploadsThrowSucceeded: (bool) => dispatch(uploadsHasSucceeded(bool)),
        addGraphMember: (member) => dispatch(addGraphMember(member)),
        selectGraphType: (graphType) => dispatch(selectGraphType(graphType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
