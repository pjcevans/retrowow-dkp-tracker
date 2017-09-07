import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

class DkpMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  render() {

    if (this.props.data) {
      if (this.props.data[0]) {
        var dkpLength = 0;
        var averageDkp = 0;
        let reversedData = this.props.data;
        reversedData.reverse();

        let latestExport = reversedData[0];
        let dkpValues = []

        //remove all zero value dkp entries
        dkpValues = latestExport.dkparray.filter(item => {
          return parseInt(item.dkp, 10) !== 0;
        })

        var totalDkp = 0;

        dkpValues.forEach((item) => {
          totalDkp += parseInt(item.dkp, 10);
        });

        if (dkpValues.length) {
          dkpLength = dkpValues.length;
          averageDkp = Math.round(totalDkp / dkpLength);
        }

      }
    }

    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          Show / Hide text data
        </Button>
        <Panel collapsible expanded={this.state.open}>
          <p>{totalDkp} DKP spread across {dkpLength} characters</p>
          <p>Average DKP = {averageDkp}</p>
        </Panel>
      </div>
    )
  }
}

export default DkpMetadata;
