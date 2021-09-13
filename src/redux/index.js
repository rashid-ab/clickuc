import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStore } from 'redux';

const initialState = {
  user: '',
  silverLimit: '',
  goldenLimit: '',
  platinumLimit: '',
  ads: 4,
  goldenads: 4,
  platinumads: 3,
  coins: 10,
  uc:10,
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, user: action.user };
    case 'SILVERLIMIT':
      return { ...state, silverLimit: action.silverLimit };
    case 'GOLDENLIMIT':
      return { ...state, goldenLimit: action.goldenLimit };
    case 'PLATINUMLIMIT':
      return { ...state, platinumLimit: action.platinumLimit };
      case 'ADS':
      return { ...state, ads: action.ads };
    case 'GOLDENADS':
      return { ...state, goldenads: action.goldenads };
    case 'PLATINUMADS':
      return { ...state, platinumads: action.platinumads };
    case 'COINS':
      return { ...state, coins: action.coins };
    case 'UC':
      return { ...state, uc: action.uc };
    default:
      break;
  }
  return state;
};
export const store = createStore(reducer);
