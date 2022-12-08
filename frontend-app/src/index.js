import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import Profile from './components/Profile';
import Landing from './components/Landing';

export { SignUp, SignIn, Wallet, Transactions, Profile, Landing};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
