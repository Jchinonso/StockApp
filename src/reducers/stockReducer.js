import {
  FETCH_ALL_SYMBOLS,
  POPULATE_QUOTES,
  POPULATE_LIST_QUOTES,
  DELETE_SYMBOL,
  GET_SYMBOLS_SUCCESS,
  GET_SYMBOLS_REQUEST
} from "../actions/actionTypes";

const initialState = {
  symbols: [],
  quotes: [],
  selectedSymbols: [],
  loaded: true
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SYMBOLS_REQUEST:
      return {
        ...state,
        loaded: false
      };
    case GET_SYMBOLS_SUCCESS:
      return {
        ...state,
        loaded: true
      };
    case FETCH_ALL_SYMBOLS:
      return {
        ...state,
        symbols: action.data
      };
    case POPULATE_LIST_QUOTES:
      const updatedListSymbols = Object.keys(action.data).map(item => {
        return action.data[`${item}`].quote;
      });

      const filterListUpdatedQuote = state.quotes.filter(item => {
        return action.symbol.includes(item.symbol);
      });

      return {
        ...state,
        quotes: filterListUpdatedQuote
      };

    case POPULATE_QUOTES:
      const { symbol } = action;

      const filteredKeys = state.selectedSymbols.filter(item => {
        return item !== symbol;
      });
      const updatedSymbols = Object.keys(action.data).map(item => {
        return action.data[`${item}`].quote;
      });

      const filterUpdatedQuote = state.quotes.filter(
        item => item.symbol !== symbol
      );
      return {
        ...state,
        quotes: [...filterUpdatedQuote, ...updatedSymbols],
        selectedSymbols: [...filteredKeys, symbol]
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
