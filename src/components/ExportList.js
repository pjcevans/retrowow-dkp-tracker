import React, { Component } from 'react';
import ConfiguredGraph from './ConfiguredGraph';
import style from './style';


class ExportList extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  searchFilter(event) {
    // Ensure all player names are treated as proper nouns regardless of input case
    let caseLowered = event.target.value.substr(0,20).toLowerCase();
    let properNouned = caseLowered.charAt(0).toUpperCase() + caseLowered.slice(1);
    this.setState({
      searchTerm: properNouned
    }, () => {
      // Call function to update output based on search term
      // this.updateGallery();
      // console.log(this.state.searchTerm)
    });
  }

  render() {
    let exportTableData = [];
    let lastDKPValue = 0;
    let matchInfo = "";
    // Given a search term, build a dataset for just that user
    // Note: this should probably actually be handled with a db query
    // rather than pulling in the whole dataset and grokking it in the browser
    if (this.props.data) {
      let reversedData = this.props.data.reverse();
      reversedData.forEach(item => {
        let exportTableRow = {};
        // let parsedData = JSON.parse(item.dkpdata);
        let itemData = item.dkparray;

        // find the currently searched player's details within this export
        let match = itemData.find((item) => { return item.name === this.state.searchTerm })

        if (match) {
          // Populate table of dkp changes
          let timeUTC = new Date(parseInt(item.date, 10)).toUTCString().toString();
          exportTableRow.date = timeUTC;
          exportTableRow.day = timeUTC.substring(0,3);
          exportTableRow.dkp = parseInt(match.dkp, 10);
          exportTableRow.change = parseInt(exportTableRow.dkp, 10) - lastDKPValue;
          lastDKPValue = exportTableRow.dkp
          exportTableData.push(exportTableRow)
          // Populate match info & options
          matchInfo = <div><h3>{this.state.searchTerm}</h3><button onClick={() => this.props.addGraphMember(this.state.searchTerm)}>Add to Graph</button></div>;
        }
      })

      if (exportTableData.length > 0) {
        // Build table items for each row of data
        var exportTableRows = exportTableData.map(item => {
          return (
            <tr><td>{item.date}</td><td>{item.dkp}</td><td>{item.change}</td></tr>
          );
        })

        // Add header row
        exportTableRows.push(<tr><th>Date</th><th>Dkp</th><th>Change</th></tr>);

        // Display most recent first
        exportTableRows.reverse();
      }
    }

    return (
      <div>
        <div id="searchbar">
          <input type="text"
           id="searchbar"
           placeholder="Search for player"
           value={this.state.searchTerm}
           onChange={this.searchFilter.bind(this)} />
        </div>
        {matchInfo}
        <div style={ style.commentList }>
          <table>
            <tbody>
              { (exportTableRows) ? exportTableRows : <tr><td>No player selected</td></tr>}
            </tbody>
          </table>
            {(this.props.data) ? <ConfiguredGraph data={this.props.data}/> : null}
        </div>
      </div>
    )
  }
}

export default ExportList;

//
// <LineChart width={700} height={550} data={exportTableData}>
//   <Line type="monotone" dataKey="dkp" stroke="#8884d8" />
//   <XAxis dataKey="day" />
//   <YAxis />
//   <Tooltip />
// </LineChart>
