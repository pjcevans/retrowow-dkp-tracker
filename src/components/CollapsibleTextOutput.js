import React, { Component } from 'react';
import { Button, Panel, Table } from 'react-bootstrap';
import style from './style';

class CollapsibleTextOutput extends Component {
  constructor(props) {
    super(props);
    this.state = { tableOpen: true };
  }

  render() {

    return (
      <div>
        <Button className={"center-block"} onClick={ ()=> this.setState({ tableOpen: !this.state.tableOpen })}>
          Show / Hide text data
        </Button>
        <Panel collapsible expanded={this.state.tableOpen}>
          <h4>Full data for player, {this.props.selectedPlayer}</h4>
          <Table responsive>
            <tbody>
              { (this.props.exportTableRows) ? this.props.exportTableRows.reverse() : <tr><td>No player selected</td></tr>}
            </tbody>
          </Table>
        </Panel>
      </div>
    )
  }
}

export default CollapsibleTextOutput;
