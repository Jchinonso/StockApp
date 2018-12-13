import axios from "axios";

import * as types from "./actionTypes";

export function getSymbolsRequest() {
  return {
    type: types.GET_SYMBOLS_REQUEST
  };
}

export function getSymbolsSucess() {
  return {
    type: types.GET_SYMBOLS_SUCCESS
  };
}
export function getAllSymbols(data) {
  return {
    type: types.FETCH_ALL_SYMBOLS,
    data
  };
}

export function clearState() {
  return dispatch => 
		dispatch ({
			type: types.CLEAR_STATE,
		});
}

export function populateQuotes(data, symbol) {
  return {
    type: types.POPULATE_QUOTES,
    data,
    symbol
  };
}

export function populateListQuotes(data, symbol) {
  return {
    type: types.POPULATE_LIST_QUOTES,
    data,
    symbol
  };
}

export function deleteSymbols(symbol) {
  return {
    type: types.DELETE_SYMBOL,
    symbol
  }
}

export function getSelectedSymbols(symbol) {
	return dispatch => 
		dispatch ({
			type: types.SELECTED_SYMBOLS,
			symbol
		});
}

export function fetchSymbols() {
  return dispatch => {
    return axios
      .get("https://api.iextrading.com/1.0/ref-data/symbols")
      .then(response => {
        dispatch(getAllSymbols(response.data));
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}

export function addQuotes(symbols) {
	return dispatch => {
    dispatch(getSymbolsRequest())
    return axios
      .get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`)
      .then(response => {
        dispatch(populateQuotes(response.data, symbols));
        dispatch(getSymbolsSucess())
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}

export function addListQuotes(symbols) {
  const stringifySymbols = symbols.join(',')
	return dispatch => {
    return axios
      .get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${stringifySymbols}&types=quote`)
      .then(response => {
        dispatch(populateListQuotes(response.data, symbols));
        console.log("It ended well")
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}
