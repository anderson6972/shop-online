import { createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist';//libreria para usar el localstore
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

if(process.env.NODE_ENV === 'develoment'){//esto es para evitar logs en produccion solo en pruebas
    middlewares.push(logger);
}

export const store = createStore( rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store, persistor};