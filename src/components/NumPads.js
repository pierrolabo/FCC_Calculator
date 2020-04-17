import React from 'react';
import NumPad from '../components/NumPad';

const NumPads = () => {
  return (
    <div className='numpads-container'>
      <div className='numpads-row'>
        <NumPad id='seven' val='7' />
        <NumPad id='eight' val='8' />
        <NumPad id='nine' val='9' />
        <NumPad id='divide' val='/' />
        <NumPad id='clear' val='AC' />
      </div>
      <div className='numpads-row'>
        <NumPad id='four' val='4' />
        <NumPad id='five' val='5' />
        <NumPad id='six' val='6' />
        <NumPad id='add' val='+' />
        <NumPad id='multiply' val='*' />
      </div>
      <div className='numpads-row'>
        <NumPad id='one' val='1' />
        <NumPad id='two' val='2' />
        <NumPad id='three' val='3' />
        <NumPad id='zero' val='0' />
        <NumPad id='subtract' val='-' />
      </div>
      <div className='numpads-row'>
        <NumPad id='equals' val='=' />
        <NumPad id='decimal' val='.' />
      </div>
    </div>
  );
};

export default NumPads;
