import React, { Component } from 'react';
import ExportList from './ExportList';
import ExportForm from './ExportForm';
import ExportShowAll from './ExportShowAll';

class ExportContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    let contentItems = [];
    if (this.props.focus === "") {
      contentItems.push(<ExportList data={ this.props.data }/>)
      contentItems.push(<ExportForm onExportSubmit={ this.props.onExportSubmit }/>)

    } else if (this.props.focus === "all") {
      contentItems.push(<ExportShowAll data={ this.props.data }/>)

    } else if (this.props.focus === "single") {

    } else if (this.props.focus === "import") {
      contentItems.push(<ExportForm onExportSubmit={ this.props.onExportSubmit }/>)
    }
    return (
      <div>
        {contentItems}
      </div>
    )
  }
}

export default ExportContent;
// {this.state.content}

// <ExportList data={ this.props.data }/>
// <ExportForm onExportSubmit={ this.props.onExportSubmit }/>

// <ExportList data={ this.props.data }/>
// <ExportForm onExportSubmit={ this.props.onExportSubmit }/>
