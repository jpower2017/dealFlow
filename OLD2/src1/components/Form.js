import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";

import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";

import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import  injectTapEventPlugin from "react-tap-event-plugin"

import {debounce} from 'throttle-debounce';
//import  {throttle} from 'throttle-debounce/throttle'


class DealForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChangeQuill = this.handleChangeQuill.bind(this);
    this.handleAdd = this.handleAdd.bind(this)
    injectTapEventPlugin();
  }

  handleChangeQuill(value) {
    //console.log("handleChangeQuill " + value);
    //  this.setState({ text: value });
    this.props.f("quill", value);
  }
  handleChangeSelect2(value) {
    console.log("handleChangeSelect " + value.toString());
    //  this.setState({ text: value });
    this.props.f("reqcapital", value);
  }
  handleChangeSelect = (event, index, value) => {
    //this.setState({value});
    console.log('handleChangeSelect '+[index,value])
      this.props.f('reqcapital', value);

  }
  handleAdd(){
    console.log('handleAdd')
    this.props.ad()
  }

  handleChange = event => {
    console.log("handleChange name: " + event.target.name);
    this.props.f(event.target.name, event.target.value);
  };
  render() {
    return (
      <div>
       <RaisedButton label="New Deal" primary={true} onClick={this.handleAdd} />
      <form style={{ padding: 20 }}>
        <div style={{backgroundColor:'#cccccc', padding:20,}}>
        RECOMMENDATION for selected project:  {this.props.selectedObj.dealname}
        <div style={{backgroundColor:'#fff'}}><ReactQuill


          onChange={debounce(1000, this.handleChangeQuill)}
          placeholder={this.props.placeholder}
          value={this.props.selectedObj.quill}
          theme={"snow"}
        >
        </ReactQuill>
        </div>
      </div>

        <TextField
          hintText="Date received"
          floatingLabelText="Date received"
          name="dateReceived"
          fullWidth={true}
          value={this.props.selectedObj.dateReceived}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Family members"
          floatingLabelText="Family members"
          name="familymembers"
          fullWidth={true}
          value={this.props.selectedObj.familymembers}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Deal name"
          floatingLabelText="Deal name"
          name="dealname"
          fullWidth={true}
          value={this.props.selectedObj.dealname}
          onChange={this.handleChange}
        />
        <TextField
          hintText="investmenttype"
          floatingLabelText="investmenttype"
          name="investmenttype"
          fullWidth={true}
          value={this.props.selectedObj.investmenttype}
          onChange={this.handleChange}
        />
        <TextField
          hintText="financials"
          floatingLabelText="investmenttype"
          name="financials"
          fullWidth={true}
          value={this.props.selectedObj.financials}
          onChange={this.handleChange}
        />
        <SelectField
         floatingLabelText="Frequency"
         value={this.props.selectedObj.reqcapital}

onChange={this.handleChangeSelect}
       >
         <MenuItem value={1} primaryText={this.props.capitalMapping[1]} />
         <MenuItem value={2} primaryText={this.props.capitalMapping[2]} />
         <MenuItem value={3} primaryText={this.props.capitalMapping[3]} />
         <MenuItem value={4} primaryText={this.props.capitalMapping[4]} />
         <MenuItem value={5} primaryText={this.props.capitalMapping[5]} />
       </SelectField>

        <TextField
          hintText="Key people"
          floatingLabelText="Key people"
          name="keypeople"
          fullWidth={true}
          value={this.props.selectedObj.keypeople}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Background"
          floatingLabelText="Background"
          name="background"
          fullWidth={true}
          value={this.props.selectedObj.background}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Lead person"
          floatingLabelText="Lead person"
          name="leadPerson"
          fullWidth={true}
          value={this.props.selectedObj.leadPerson}
          onChange={this.handleChange}
        />
        <Divider />
      </form>
    </div>
    );
  }
}

export default DealForm;
