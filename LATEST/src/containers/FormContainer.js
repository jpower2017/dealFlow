import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import DealForm from "../components/Form";
import { capitalMapping, selectFamily, selectIndustry,
  selectSubTypeIndustry,selectFinancials,selectLegal,
selectBackground, selectReviewStatus,selectLeadPerson } from "../data";

class FormContainer extends Component {
  render() {
    return (


<div>
      {this.props.projects
        ?    <DealForm
            f={this.props.f}
            selectedObj={this.props.selectedObj}
            capitalMapping={capitalMapping}
            selectFamily ={selectFamily}
            selectIndustry = {selectIndustry}
            selectSubTypeIndustry = {selectSubTypeIndustry}
            selectFinancials = {selectFinancials}
            selectLegal = {selectLegal}
            selectBackground = {selectBackground}
            selectReviewStatus = {selectReviewStatus}
            selectLeadPerson = {selectLeadPerson}

          />
        : <div>LOADING </div>}






      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //selectedObj : state.data.items[state.data.select]
  projects: state.data.projects,
  selectedObj: state.data.projects ? state.data.projects[state.data.select-1] : state.data.items[state.data.select-1]
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  f: (name, value,id) => {
    dispatch(acts(name, value, id));
  },

  onClick2: id => {
    //dispatch(deleteNotification(id));
  }
});
const FormContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  FormContainer
);

export default FormContainer2;