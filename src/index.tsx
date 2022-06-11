import '@babel/polyfill';
import 'materialize-css/dist/css/materialize.css';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

const app = document.querySelector('#app');
ReactDOM.render(<App />, app);
