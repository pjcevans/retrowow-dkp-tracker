import React, { Component } from 'react';
import style from './style';

class ExportForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '', dkp: '', guild: 'Certus Excessum', password: ''  };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDkpChange = this.handleDkpChange.bind(this);
    this.handleGuildChange = this.handleGuildChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  fillDate() {
    this.setState({ date: Date.now().toString() });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleDateChange(e) {
    this.setState({ date: e.target.value });
  }
  handleGuildChange(e) {
    this.setState({ guild: e.target.value });
  }
  handleDkpChange(e) {
    this.setState({ dkp: e.target.value });
  }
  handleSubmit(e) {
    // Prevent normal submit as post is handled by axios
    e.preventDefault();
    let exportArray = []

    // Values for submission are taken from local state which is used to
    // set form fields
    let date = this.state.date.trim();
    let dkp = this.state.dkp.trim();
    if (!date || !dkp) {
      return;
    }
    console.log(this.state.guild)
    // Cleanse dataset to remove silly LUA boilerplate
    let stringStart = dkp.indexOf("{")
    let shortenedString = dkp.substring(stringStart)
    let filteredString = shortenedString.replace(/=/g, ":")
    filteredString = filteredString.replace(/[\[\]']+/g,'')
    filteredString = filteredString.replace(/,(?=[^,]*$)/, '')
    let parsedData = JSON.parse(filteredString);
    for (var key in parsedData) {
      let exportItem = {};
      exportItem.name = key;
      exportItem.dkp = parsedData[key];
      exportArray.push(exportItem);
    }
    // Submit the export and clear current state
    this.props.onExportSubmit('http://localhost:3001/api/exports', { date: date, guild: this.state.guild, dkparray: exportArray, password: this.state.password });
    this.setState({ date: '', dkp: '', password: '' });
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
        <ul style={ style.exportFormList }>
          <li style={ style.exportFormListItem }>
            <button style={ style.commentFormPost }
                    onClick={ () => this.fillDate() }
                    type="button">Current date</button>
            <input
              type='text'
              placeholder='The date in milis...'
              style={ style.commentFormText}
              value={ this.state.date }
              onChange={ this.handleDateChange } />
            </li>
          <li style={ style.exportFormListItem }>
            <label for="dkp">Addon output: </label>
            <input
              name='dkp'
              type='text'
              placeholder='The output of the export addon...'
              style={ style.commentFormText}
              value={ this.state.dkp }
              onChange={ this.handleDkpChange } />
          </li>
          <li style={ style.exportFormListItem }>
            <label for="guild">Guild: </label>
            <select name="guild" onChange={ this.handleGuildChange } >
              <option value="Certus Excessum" selected="selected">Certus Excessum</option>
              <option value="Goldshire Golfclub">Goldshire Golfclub</option>
              <option value="De Profundis">De Profundis</option>
            </select>
          </li>
          <li style={ style.exportFormListItem }>
            <label for="password">Password: </label>
            <input
              name='password'
              type='text'
              placeholder='Enter super secure password...'
              style={ style.commentFormText}
              value={ this.state.password }
              onChange={ this.handlePasswordChange } />
          </li>
          <li style={ style.exportFormListItem }>
              <input
                type='submit'
                style={ style.commentFormPost }
                value='Submit' />
          </li>
        </ul>
      </form>
    )
  }
}

export default ExportForm;
