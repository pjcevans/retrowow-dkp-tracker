import React, { Component } from 'react';
import style from './style';

class ExportForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '', dkp: '' };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDkpChange = this.handleDkpChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleDateChange(e) {
    this.setState({ date: e.target.value });
  }
  handleDkpChange(e) {
    this.setState({ dkp: e.target.value });
  }
  handleSubmit(e) {
    // Prevent normal submit as post is handled by axios
    e.preventDefault();

    // Values for submission are taken from local state which is used to
    // set form fields
    let date = this.state.date.trim();
    let dkp = this.state.dkp.trim();
    if (!date || !dkp) {
      return;
    }

    // Cleanse dataset to remove silly LUA boilerplate
    let stringStart = dkp.indexOf("{")
    let shortenedString = dkp.substring(stringStart)
    let filteredString = shortenedString.replace(/=/g, ":")
    filteredString = filteredString.replace(/[\[\]']+/g,'')
    filteredString = filteredString.replace(/,(?=[^,]*$)/, '')


    // Submit the export and clear current state
    this.props.onExportSubmit({ date: date, dkp: filteredString });
    this.setState({ date: '', dkp: '' });
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>

        <input
          type='text'
          placeholder='The date...'
          style={ style.commentFormText}
          value={ this.state.date }
          onChange={ this.handleDateChange } />
        <input
          type='text'
          placeholder='The dkp value...'
          style={ style.commentFormText}
          value={ this.state.dkp }
          onChange={ this.handleDkpChange } />
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post' />
      </form>
    )
  }
}

export default ExportForm;
