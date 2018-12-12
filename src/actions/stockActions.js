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
			symbols
		});
}

export function populateQuotes(data, symbol) {
  return {
    type: types.POPULATE_QUOTES,
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
  console.log("got here");
  return dispatch => {
    return axios
      .get("https://api.iextrading.com/1.0/ref-data/symbols")
      .then(response => {
        dispatch(getAllSymbols(response.data));
        console.log("End the operations");
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}

export function addQuotes(symbols) {
	return dispatch => {
    return axios
      .get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`)
      .then(response => {
        dispatch(populateQuotes(response.data, symbols));
        console.log("End the operations");
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };
}
