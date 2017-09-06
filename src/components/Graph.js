import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// <Graph data={this.props.data}
//        graphData={this.props.graphData}
//        removeGraphMember={this.props.removeGraphMember}
//        toggleGraphAverage={this.props.toggleGraphAverage} />

const Graph = (props) => {

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  var exportTableMembers = ["Cjzz", "Delnadre"];
  var exportTableLines = [];
  var exportTableData = [
    {
      "Cjzz": 500,
      "Delnadre": 600,
      day: "mon",
      date: 123
    },
    {
      "Cjzz": 600,
      "Delnadre": 700,
      day: "tue",
      date: 124
    },
    {
      "Cjzz": 800,
      "Delnadre": 200,
      day: "wed",
      date: 125
    }
  ]
  console.log(props.graphData)
  // exportTableMembers = props.graphData.members;


  props.graphData.forEach(member => {
    exportTableLines.push(<Line key={member} type="monotone" dataKey={member} stroke={getRandomColor()}  />)
  })

  return(
    <LineChart width={700} height={550} data={exportTableData}>
      {exportTableLines}

      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  )

}
export default Graph
