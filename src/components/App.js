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
                                                    <ExportList data={ this.props.exports.ce }/></div>)} />
          <Route exact path="/ggc" render={(props) => (<div><DkpMetadata data={ this.props.exports.ggc }/>
                                                    <ExportList data={ this.props.exports.ggc }/></div>)} />
          <Route exact path="/dp" render={(props) => (<div><DkpMetadata data={ this.props.exports.dp }/>
                                                    <ExportList data={ this.props.exports.dp }/></div>)} />
          <Route path="/upload" render={(props) => (<ExportForm onExportSubmit={ this.props.postExport }/>)} />

        </div>
      </Router>

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



        //
        //
        // <DkpMetadata data={ this.props.exports } />
        // <ExportForm onExportSubmit={ this.props.postExport }/>
        // <ExportList data={ this.props.exports }/>
