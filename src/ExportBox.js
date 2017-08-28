import React, { Component } from 'react';
import axios from 'axios';
import DkpMetadata from './DkpMetadata';
import ExportContent from './ExportContent';
import style from './style';

class ExportBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], focus: "" };
    this.loadExportsFromServer = this.loadExportsFromServer.bind(this);
    this.handleExportSubmit = this.handleExportSubmit.bind(this);
  }
  loadExportsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleExportSubmit(dkpExport) {
    //Commented out: Display of data mechanics (concat new data before polled)
    // let people = this.state.data;
    // person.id = Date.now();
    // console.log(person)
    // let newPeople = people.concat([person]);
    // this.setState({ data: newPeople });


    // Post the data to mongo to be stored
    axios.post(this.props.url, dkpExport)
      .catch(err => {
        console.error(err);
        // this.setState({ data: people });
      });
  }
  componentDidMount() {
    this.loadExportsFromServer();
    setInterval(this.loadExportsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={ style.commentBox }>
        <h2>Certus Excessum DKP Tracker</h2>
        <DkpMetadata data={ this.state.data } />
        <ExportContent data={ this.state.data }
                       onExportSubmit={ this.handleExportSubmit }
                       focus={ this.state.focus }/>
      </div>
    )
  }
}

export default ExportBox;
