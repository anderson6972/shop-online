import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FECTH_COLLECTIONS_START,
});

export const fetchCollectionsSucces = collectionsMap => ({
    type: ShopActionTypes.FECTH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FECTH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());//esto activa el action fetchCollectionsStar y se puede hacer gracias a redux-thunk

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSucces(collectionsMap));
        }).catch(
            error => dispatch(fetchCollectionsFailure(error.message))
        );
    }
}