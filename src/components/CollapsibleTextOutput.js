import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

class CollapsibleTextOutput extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  render() {

    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          Show / Hide text data
        </Button>
        <Panel collapsible expanded={this.state.open}>
          <h4>Full data for player, {this.props.selectedPlayer}</h4>
          <table>
            <tbody>
              { (this.props.exportTableRows) ? this.props.exportTableRows : <tr><td>No player selected</td></tr>}
            </tbody>
          </table>
        </Panel>
      </div>
    )
  }
}

export default CollapsibleTextOutput;
