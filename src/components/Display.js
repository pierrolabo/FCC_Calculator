import React, { Component } from 'react';
import { connect } from 'react-redux';

class Display extends Component {
  render() {
    return (
      <div className='display'>
        <h3>{this.props.pastCalculation}</h3>
        <h3 id='display'>{this.props.display}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    display: state.display,
    pastCalculation: state.pastCalculation,
  };
};

export default connect(mapStateToProps)(Display);
