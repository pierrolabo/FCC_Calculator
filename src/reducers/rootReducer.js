const initState = {
  display: '0',
  lastEntered: '',
  pastCalculation: [
    '3',
    '2',
    '+',
    '6',
    '5',
    '*',
    '7',
    '8',
    '/',
    '9',
    '5',
    '-',
    '2',
    '1',
    '+',
  ],
};
const nbr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['-', '+', '*', '/'];
const rootReducer = (state = initState, action) => {
  //A number has been pressed
  if (action.type === 'DISPLAY_NUMBER') {
    console.log('A number has been pressed: ', action.msg);
    //if the first number is zero and not dec replace by new value
    if (!isDec(state.display) && state.display[0] === '0') {
      //If two 0 or more followed
      if (action.msg === '0') {
        return state;
      }
      console.log('res', [...state.lastEntered, ...action.msg]);
      return {
        ...state,
        pastCalculation: [...state.pastCalculation, ...action.msg],
        lastEntered: action.msg,
        display: [...state.lastEntered, ...action.msg],
      };
    } else {
      return {
        ...state,
        pastCalculation: [...state.pastCalculation, ...action.msg],
        lastEntered: action.msg,
        display: [...state.display, ...action.msg],
      };
    }
  }
  //An operator has been pressed
  if (action.type === 'DISPLAY_OPERATOR') {
    console.log('An operator has been pressed');
    //if the last entered is an operator change for the new
    if (operator.indexOf(state.lastEntered) >= 0) {
      console.log('last one was an operator');
      return {
        ...state,
        lastEntered: action.msg,
        display: action.msg,
        pastCalculation: [
          ...state.pastCalculation.slice(0, state.pastCalculation.length - 1),
          action.msg,
        ],
      };
    } else {
      console.log('last one was NOT operator');

      return {
        ...state,
        lastEntered: action.msg,
        display: action.msg,
        pastCalculation: [...state.pastCalculation, action.msg],
      };
    }
  }
  //A decimal has been pressed
  if (action.type === 'DISPLAY_DECIMAL') {
    console.log('A decimal has been pressed');
    //Nbr is already dec, return
    if (isDec(state.display)) {
      return state;
    }
    //last entered is an operator
    if (operator.indexOf(state.lastEntered) >= 0) {
      return {
        ...state,
        lastEntered: '0.',
        display: '0.',
        pastCalculation: [...state.pastCalculation, '0.'],
      };
    } else if (state.display[0] === '0') {
      return {
        ...state,
        lastEntered: '0.',
        display: '0.',
        pastCalculation: [...state.pastCalculation, '0.'],
      };
    } else {
      return {
        ...state,
        lastEntered: '.',
        display: [...state.display, ...action.msg],
        pastCalculation: [...state.pastCalculation, ...action.msg],
      };
    }
  }
  //A minus has been pressed
  if (action.type === 'DISPLAY_MINUS') {
    console.log('A minus has been pressed');
    //if last entered is minus
    if (state.lastEntered === '-') {
      return state;
    } else {
      return {
        ...state,
        lastEntered: action.msg,
        display: action.msg,
        pastCalculation: [...state.pastCalculation, action.msg],
      };
    }
  }
  //An equal has been pressed
  if (action.type === 'DISPLAY_EQUAL') {
    console.log('An equal has been pressed');
    console.log('EQUAL: ', state.pastCalculation);
    calculation(state.pastCalculation);
  }
  //A reset has been pressed
  if (action.type === 'CLEAR_ACTION') {
    console.log('A reset been pressed');
    return {
      display: '0',
      lastEntered: '',
      pastCalculation: [],
    };
  }
  return state;
};

//Return true if the display is already dec
const isDec = (str) => str.indexOf('.') >= 0;

const calculation = (arr) => {
  //list of minus number
  //list of operator
  let a = cleanOperation(arr);
  console.log(a);
};
const cleanOperation = (arr) => {
  let nbr = [];
  return [...arr].reduce((acc, val, i) => {
    console.log('processing: ', val, 'acc', acc);
    let length = arr.length;
    //we start with a minus nbr
    if (val === '-' && i === '0') {
      nbr.push(val);
      return acc;
    }
    //if its a number we continu
    if (!isNaN(val)) {
      nbr.push(val);
      return acc;
    }
    //if its an operator we push nbr into acc
    if (isNaN(val) && val !== '-') {
      console.log('pass:');
      acc.push(nbr.join(''));
      acc.push(val);
      nbr = [];
      return acc;
    }
    if (val === '-' && isNaN(arr[i - 1])) {
      acc.push(nbr.join(''));
      nbr = [];
      nbr.push(val);
      return acc;
    }
    if (val === '-' && isNaN(arr[i - 1])) {
      acc.push(nbr.join(''));
      nbr = [];
      nbr.push(val);
      return acc;
    }
    if (val === '-' && !isNaN(arr[i - 1])) {
      acc.push(nbr.join(''));
      nbr = [];
      acc.push(val);
      return acc;
    }
    return acc;
    //s'il est précédé de rien ou d'un operateur c'est un nbr negatif
  }, []);
};
export default rootReducer;
