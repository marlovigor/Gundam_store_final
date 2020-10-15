import React from 'react';
import ReactDOM from 'react-dom'
import Logo from './Componnts/Logo/Logo'
import Login from './Componnts/Login/LoginForm'
import { render } from '@testing-library/react';
import LandingPage from './Componnts/LandingPage/LandingPage';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('it renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('it renders Cart crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingPage/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('it renders Logo without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Logo/>, div);
  ReactDOM.unmountComponentAtNode(div);
});


test('it renders Login without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

