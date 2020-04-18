const initState = {
  display: '0',
  lastEntered: '',
  pastCalculation: ['1', '0', '.', '5', '-', '5', '.', '5'],
};
const nbr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['-', '+', '*', '/'];
const rootReducer = (state = initState, action) => {
  //A number has been pressed
  if (action.type === 'DISPLAY_NUMBER') {
    //if the first number is zero and not dec replace by new value
    if (!isDec(state.display) && state.display[0] === '0') {
      //If two 0 or more followed
      if (action.msg === '0') {
        return state;
      }
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
    //if the last entered is an operator change for the new
    if (operator.indexOf(state.lastEntered) >= 0) {
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
    return {
      ...state,
      display: doCalculation(state.pastCalculation),
    };
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

const doCalculation = (arr) => {
  console.log('string', arr.join(''));
  const regexNbr = /(\d+\.\d+)|([*\/]-\d+)|(\d+)/g;
  const regexOpr = /([+\*\/-]{2})|([+\*\/-])/g;

  const nbr = arr
    .join('')
    .match(regexNbr)
    .map((val) => {
      let fullNumber = [...val]
        .filter((number) => {
          return number !== '/' && number !== '*';
        })
        .join('');
      console.log(val, '|', fullNumber);
      if (fullNumber.indexOf('.') >= 0) {
        return parseFloat(fullNumber);
      }
      return parseInt(fullNumber);
    });
  const opr = arr
    .join('')
    .match(regexOpr)
    .map((val) => {
      if (val.length !== 1) {
        if (val[1] === '+') {
          return val[1];
        }
        return val[0];
      } else {
        return val;
      }
    });
  const calculation = [...nbr].reduce((acc, val, i) => {
    switch (opr[i - 1]) {
      case '+':
        return acc + val;
      case '-':
        return acc - val;
      case '*':
        return acc * val;
      case '/':
        return acc / val;
      default:
        break;
    }
  });
  console.log('nbr', nbr);
  console.log('opr', opr);
  return calculation;
};
export default rootReducer;
