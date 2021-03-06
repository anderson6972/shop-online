import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverViewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({fetchCollectionsStart, match}) => {

    // componentDidMount() {
    //     const { fetchCollectionsStart } = this.props;
    //     fetchCollectionsStart();
    // }

    useEffect (() => {
        fetchCollectionsStart();
    },[fetchCollectionsStart])
    
        // const { match} = this.props;
        return (
            <div className='shop-page'>
                <Route
                    exact path={`${match.path}`}
                    component = {CollectionsOverViewContainer} />

                <Route
                    path={`${match.path}/:collectionId`}
                    component = {CollectionPageContainer} />
            </div>
        )    
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);