import {
  FETCH_ALL_SYMBOLS,
  POPULATE_QUOTES,
  SELECTED_SYMBOLS,
  DELETE_SYMBOL
} from "../actions/actionTypes";

const initialState = {
  symbols: [],
  quotes: [],
  selectedSymbols: []
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SYMBOLS:
      return {
        ...state,
        symbols: action.data
      };

    case POPULATE_QUOTES:
      const filteredKeys = state.selectedSymbols.filter(item => {
        return item !== action.symbol;
      });
      const updatedSymbols = Object.keys(action.data).map(item => {
        return action.data[`${item}`].quote;
      });
      return {
        ...state,
        quotes: [...state.quotes, ...updatedSymbols],
        selectedSymbols: [...filteredKeys, action.symbol]
      };
    case DELETE_SYMBOL:
      let { selectedSymbols, quotes } = state;
      const filteredQuotes = quotes.filter(
        item => item.symbol !== action.symbol
      );
      const filteredSymbols = selectedSymbols.filter(
        item => item !== action.symbol
      );
      return {
        ...state,
        selectedSymbols: filteredSymbols,
        quotes: filteredQuotes
      };
    default:
      return state;
  }
}
