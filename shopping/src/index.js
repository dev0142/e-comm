import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import {Provider} from "react-redux";
import factory from "./redux/store"
import Loading from "./components/Loading"
import {PersistGate } from 'redux-persist/integration/react'

const {persistor,store} = factory();
const loading = <Loading />;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={loading} persistor={persistor} >
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

