import { createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist';//libreria para usar el localstore
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development'){//esto es para evitar logs en produccion solo en pruebas
    middlewares.push(logger);
}

export const store = createStore( rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {store, persistor};