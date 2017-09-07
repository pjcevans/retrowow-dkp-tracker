import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Graph = (props) => {

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  var selectedGraphMembers = ["Cjzz", "Delnadre"];
  var selectedGraphLines = [];
  var selectedGraphData = [];
  var selectedGraphChangeData = [];
  var selectedGraphMemberButtons = [];
  selectedGraphMembers = props.graphData.members;
  selectedGraphData = [];
  selectedGraphChangeData = [];

  // For each export within the exports database
  props.data.forEach((dataset) => {
    let graphItem = {};
    let timeUTC = new Date(parseInt(dataset.date, 10)).toUTCString().toString();
    graphItem.date = timeUTC;
    graphItem.day = timeUTC.substring(0,11);
    // For each item within the dkp export, add dkp values for the selected players
    dataset.dkparray.forEach((item) => {
      let lastDKPValue = 0;
      if (selectedGraphMembers.indexOf(item.name) !== -1) {
        graphItem[item.name] = parseInt(item.dkp, 10);
      }
    })
    selectedGraphData.push(graphItem);
  })

  if (props.graphData.graphType === "changeDkp") {
    selectedGraphMembers.forEach((member) => {
      let lastDKPValue = 0
      selectedGraphData.forEach((item, index) => {
        if (item[member]) {
          let saveDKP = parseInt(item[member], 10);
          // Skip first dkp score since first change value will be way too high -
          // Most databases do not start from Raid Day 1, as such the first value
          // Will always be too high.
          if (index > 0) {
            item[member] = parseInt(item[member], 10) - lastDKPValue;
          } else {
            item[member] = 0;
          }
          lastDKPValue = saveDKP;
        }
      })

    })

  }


  selectedGraphMembers.forEach(member => {
    selectedGraphLines.push(<Line key={member} type="monotone" dataKey={member} stroke={getRandomColor()}  />)
  })

  selectedGraphMembers.forEach(member => {
    selectedGraphMemberButtons.push(<li key={member}><button onClick={() => props.removeGraphMember(member)}>{member}</button></li>)
  })

  return(
    <div>
      <LineChart width={700} height={550} data={selectedGraphData}>
        {selectedGraphLines}

        <XAxis dataKey="day" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip />
        <Legend />
      </LineChart>
      <h4>Remove from graph:</h4>
      <ul>
        {selectedGraphMemberButtons}
      </ul>
    </div>
  )

}
export default Graph
