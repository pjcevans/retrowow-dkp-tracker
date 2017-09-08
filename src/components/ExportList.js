import React, { Component } from 'react';
import ConfiguredGraph from './ConfiguredGraph';
import CollapsibleTextOutput from './CollapsibleTextOutput';
import DkpMetadata from './DkpMetadata';
import AppInformationPanel from './AppInformationPanel';
import { Row, Grid, Col, Tooltip, ButtonGroup, Button, OverlayTrigger, Panel } from 'react-bootstrap';

class ExportList extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', activeGraph: 1 };
  }

  activateGraph(activeGraph, e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      activeGraph: activeGraph
    });
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
      // const reversedData = [...this.props.data].reverse();
      // reversedData.forEach(item => {
      this.props.data.forEach(item => {
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
          matchInfo = <div><h3>{this.state.searchTerm}</h3><Button bsStyle="primary" onClick={() => this.props.addGraphMember(this.state.searchTerm)}>Add to Graph</Button></div>;
        }
      })

      if (exportTableData.length > 0) {
        // Build table items for each row of data
        var exportTableRows = exportTableData.map(item => {
          return (
            <tr key={item.date}><td>{item.date}</td><td>{item.dkp}</td><td>{item.change}</td></tr>
          );
        })

        // Add header row
        exportTableRows.push(<tr key="header"><th>Date</th><th>Dkp</th><th>Change</th></tr>);

        // // Display most recent first
        // exportTableRows.reverse();
      }
    }

    // Tooltip information for Overlays
    const totalsTooltip = (
      <Tooltip id="tooltip"><strong>Totals</strong> This graph shows the total dkp of added players on each date</Tooltip>
    );
    const changeTooltip = (
      <Tooltip id="tooltip"><strong>Change</strong> This graph shows changes to added players dkp on each date</Tooltip>
    );

    return (
      <Grid>
        <Row>
          <DkpMetadata data={ this.props.data }/>
        </Row>

        <Row>
          <Col xs={12} md={3}>
            <Panel header={<h4>Start with a search...</h4>} bsStyle="primary">
              <input type="text"
               id="searchbar"
               placeholder="Search for player"
               value={this.state.searchTerm}
               onChange={this.searchFilter.bind(this)} />
               {matchInfo}
            </Panel>
            <AppInformationPanel />

           </Col>
           <Col xs={12} md={9}>

             <ButtonGroup justified>
               <ButtonGroup>
                 <OverlayTrigger placement="top" overlay={totalsTooltip}>
                   <Button bsStyle="info" onClick={() => this.props.selectGraphType("totalDkp")}>Totals</Button>
                 </OverlayTrigger>
               </ButtonGroup>
               <ButtonGroup>
                 <OverlayTrigger placement="top" overlay={changeTooltip}>
                  <Button bsStyle="info" onClick={() => this.props.selectGraphType("changeDkp")}>Changes</Button>
                 </OverlayTrigger>
               </ButtonGroup>
             </ButtonGroup>

             {(this.props.data) ? <ConfiguredGraph data={this.props.data} /> : null}
           </Col>
        </Row>


        <Row>
          <Col xs={0} md={2}>
          </Col>
          <Col xs={12} md={8}>
            <CollapsibleTextOutput exportTableRows={exportTableRows} selectedPlayer={this.state.searchTerm} />
          </Col>
          <Col xs={0} md={2}>
          </Col>
        </Row>

      </Grid>
    )
  }
}

export default ExportList;
