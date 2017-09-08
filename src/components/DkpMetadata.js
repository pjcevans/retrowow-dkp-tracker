import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import style from './style';


class DkpMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = { contentOpen: true };
  }
  // Included to allow sorting of array of object by object property
  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  render() {


    if (this.props.data) {
      if (this.props.data[0]) {
        var dkpLength = 0;
        var averageDkp = 0;
        var guild = null;
        let reversedData = this.props.data;

        let latestExport = reversedData[reversedData.length - 1];
        let dkpValues = [];
        let topTen = [];
        var showTopTen = [];

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
        dkpValues.sort(this.dynamicSort("dkp"));

        for (let i = 0; i < 10; i++) {
          topTen.push(dkpValues[dkpValues.length - (i + 1)])
        }
        if (topTen.length > 0) {
          topTen.forEach(item => {
            showTopTen.push(<div key={item.name} style={style.flowItem}><p style={style.noMargin}>{item.name}</p><p style={style.noMargin}>{parseInt(item.dkp, 10)}</p></div>)
          })
        }


        guild = this.props.data[0].guild
      }
    }

    return (
      <div>
        <Panel style={{marginBottom:'2px'}} collapsible expanded={this.state.contentOpen}>
          <div style={style.flowContent}>
            <p style={style.flowItem}><strong>{guild || null}</strong></p>
            <p style={style.flowItem}>{totalDkp} DKP spread across {dkpLength} characters</p>
            <p style={style.flowItem}>Average DKP = {averageDkp}</p>
          </div>
          <div style={style.flowContent}>
            <p style={style.flowItem}>Top 10 DKP holders: </p>
            {showTopTen}
          </div>
        </Panel>
        <Button bsSize="small" className={"center-block"} onClick={ ()=> this.setState({ contentOpen: !this.state.contentOpen })}>
          {(this.state.contentOpen)
            ? <FaAngleUp size={20} />
            : <FaAngleDown size={20} />
          }
        </Button>
      </div>
    )
  }
}

export default DkpMetadata;
