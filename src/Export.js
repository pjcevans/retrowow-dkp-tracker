import React, { Component } from 'react';
import style from './style';

class Export extends Component {
  render() {
    var dkpExport = JSON.parse(this.props.export.dkpdata)
    var dkpValues = []
    for(let item in dkpExport) {
      dkpValues.push(<li key={item}>{ item + " - " + dkpExport[item] }</li>)
    }
    return (
      <div style={ style.comment }>
        <h3>{this.props.export.date}</h3>
        { dkpValues }
      </div>
    )
  }
}

export default Export;

// var dkpValues = this.props.export.dkpdata.map(item => {
//   return <li>{ item }</li>
// })
//         <ul>{ dkpValues }</ul>
