import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import DealForm from "../components/Form";
import { capitalMapping, selectFamily, selectInvestment, selectSubTypeInvestment,selectFinancials,selectLegal,
selectBackground, selectReviewStatus } from "../data";

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
            selectInvestment = {selectInvestment}
            selectSubTypeInvestment = {selectSubTypeInvestment}
            selectFinancials = {selectFinancials}
            selectLegal = {selectLegal}
            selectBackground = {selectBackground}
            selectReviewStatus = {selectReviewStatus}
          />
        : <div>LOADING </div>}






      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //selectedObj : state.data.items[state.data.select]
  projects: state.data.projects,
  selectedObj: state.data.projects ? state.data.projects[state.data.select] : state.data.items[state.data.select]
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
