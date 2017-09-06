import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import DkpMetadata from './DkpMetadata';
import ExportList from './ExportList';
import ExportForm from './ExportForm';
import style from './style';
import { connect } from 'react-redux';
import { exportsGetData, exportsPostData, uploadsClearErrored, uploadsHasErrored, uploadsClearSucceeded, uploadsHasSucceeded, addGraphMember } from '../actions/exports';

class App extends Component {

  componentDidMount() {
    this.props.getExports('http://localhost:3001/api/exports');
  }

  render() {



    return (
      <Router>
        <div style={ style.commentBox }>
          <h2>VanillaGaming DKP Tracker</h2>
           <ul>
             <li><Link to="/ce">Certus Excessum</Link></li>
             <li><Link to="/ggc">Goldshire Golfclub</Link></li>
             <li><Link to="/dp">De Profundis</Link></li>
           </ul>

           <hr/>

          <Route exact path="/ce" render={(props) => (<div><DkpMetadata data={ this.props.exports.ce }/>
                                                    <ExportList data={ this.props.exports.ce }
                                                                addGraphMember= {this.props.addGraphMember} /></div>)} />
          <Route exact path="/ggc" render={(props) => (<div><DkpMetadata data={ this.props.exports.ggc }/>
                                                    <ExportList data={ this.props.exports.ggc }
                                                                addGraphMember= {this.props.addGraphMember} /></div>)} />
          <Route exact path="/dp" render={(props) => (<div><DkpMetadata data={ this.props.exports.dp }/>
                                                    <ExportList data={ this.props.exports.dp }
                                                                addGraphMember= {this.props.addGraphMember} /></div>)} />
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
        addGraphMember: (member) => dispatch(addGraphMember(member))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
