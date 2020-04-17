import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayNumbers } from '../actions/displayNumbers';
import { displayOperators } from '../actions/displayOperators';
import { displayDecimal } from '../actions/displayDecimal';
import { displayEqual } from '../actions/displayEqual';
import { displayMinus } from '../actions/displayMinus';
import { clearAction } from '../actions/clearAction';
const nbr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['+', '*', '/'];

class NumPad extends Component {
  handleClick = (e) => {
    e.preventDefault();
    console.log('button clicked');
    if (this.props.id === 'clear') {
      this.props.clearAction();
    } else if (nbr.indexOf(this.props.val) >= 0) {
      this.props.displayNumbers(this.props.val);
    } else if (operator.indexOf(this.props.val) >= 0) {
      this.props.displayOperators(this.props.val);
    } else if (this.props.val === '.') {
      this.props.displayDecimal(this.props.val);
    } else if (this.props.val === '=') {
      this.props.displayEqual(this.props.val);
    } else if (this.props.val === '-') {
      this.props.displayMinus(this.props.val);
    }
  };

  render() {
    return (
      <button className='d' id={this.props.id} onClick={this.handleClick}>
        {this.props.val}
      </button>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    displayNumbers: (msg) => {
      dispatch(displayNumbers(msg));
    },
    clearAction: () => {
      dispatch(clearAction());
    },
    displayOperators: (msg) => {
      dispatch(displayOperators(msg));
    },
    displayDecimal: (msg) => {
      dispatch(displayDecimal(msg));
    },
    displayEqual: (msg) => {
      dispatch(displayEqual(msg));
    },
    displayMinus: (msg) => {
      dispatch(displayMinus(msg));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NumPad);
