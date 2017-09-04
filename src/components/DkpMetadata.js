import React, { Component } from 'react';
import style from './style';

class DkpMetadata extends Component {
  render() {


    if (this.props.data[0]) {
      var dkpLength = 0;
      var averageDkp = 0;
      let reversedData = this.props.data;
      reversedData.reverse();

      let dkpExport = JSON.parse(reversedData[0].dkpdata)
      let dkpValues = []
      for(let item in dkpExport) {
        dkpValues.push(parseInt(dkpExport[item]))
      }

      //remove all zero value dkp entries
      dkpValues = dkpValues.filter(item => {
        return item !== 0;
      })

      var totalDkp = dkpValues.reduce((sum, value) => {
        return sum + value;
      })

      if (dkpValues.length) {
        dkpLength = dkpValues.length;
        averageDkp = Math.round(totalDkp / dkpLength);
      }


      // console.log(dkpValues.length)

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
