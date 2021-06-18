import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionsSucces,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    
    try {//este codigo reemplaza el thunk redux, es decir el codigo comentado abajo y se quita del sjop.action
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSucces(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

    //     collectionRef.get().then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSucces(collectionsMap));
    // }).catch(
    //     error => dispatch(fetchCollectionsFailure(error.message))
    // );
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FECTH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}