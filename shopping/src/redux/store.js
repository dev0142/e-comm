import { createStore,applyMiddleware,compose } from "redux";
import reducers from "./reducers/index";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    storage,
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers)

const store=createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)));

const persistor=persistStore(store);


export default () => {
    return { store, persistor }
  }