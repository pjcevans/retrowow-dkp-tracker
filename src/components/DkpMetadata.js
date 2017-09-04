import React, { Component } from 'react';
import style from './style';

class DkpMetadata extends Component {
  render() {

    if (this.props.data) {
      if (this.props.data[0]) {
        var dkpLength = 0;
        var averageDkp = 0;
        let reversedData = this.props.data;
        reversedData.reverse();

        let latestExport = reversedData[0];
        let dkpValues = []
        // for(let item in dkpExport) {
        //   dkpValues.push(parseInt(dkpExport[item]))
        // }
        console.log(latestExport)

        //remove all zero value dkp entries
        dkpValues = latestExport.dkparray.filter(item => {
          return parseInt(item.dkp) !== 0;
        })

        console.log(dkpValues)

        var totalDkp = 0;

        dkpValues.forEach((item) => {
          totalDkp += parseInt(item.dkp);
        });

        if (dkpValues.length) {
          dkpLength = dkpValues.length;
          averageDkp = Math.round(totalDkp / dkpLength);
        }


        // console.log(dkpValues.length)

      }
    }

    return (
      <div>
        <p>{totalDkp} DKP spread across {dkpLength} characters</p>
        <p>Average DKP = {averageDkp}</p>
      </div>
    )
  }
}

export default DkpMetadata;
