
import HomePage from './pages/homepages/homePage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInPage from './pages/sign-in/sign-in.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.action';

import React, {useEffect} from 'react';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  },[checkUserSession])

/* ya no lo necesito ya que redux hara el control
  constructor(){
    super();
    this.state ={
      currentUser: null
    }
  }
 */
  // unsubscribeFromAuth = null;

  // componentDidMount(){ //Nota: como estoy usando hooks ya no necesito esta funcion

  //   const { checkUserSession } = this.props;
  //   checkUserSession();

  //   // NOTA: TODA ESTA VALIDACION SE REALIZA EN user.saga
  // // const {setCurrentUser} = this.props;

  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   //   //this.setState({ currentUser: user });      
  //   //   //console.log(user);

  //   //   if(userAuth){
  //   //     const userRef = await createUserProfileDocument(userAuth);
  //   //     userRef.onSnapshot(snapshot =>{
  //   //       setCurrentUser({
  //   //           id: snapshot.id,
  //   //           ...snapshot.data()
  //   //         })          
  //   //       console.log(this.state);
  //   //     });  
                
 
  //   //   }else{
  //   //     setCurrentUser(userAuth);        
  //   //   }

  //   // })
  // }

  // componentWillUnmount(){
  //   this.unsubscribeFromAuth();
  // }

  
    return (
      <div>
        {/* <HomePage /> */}
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => 
            currentUser ? (<Redirect to='/' />) : (<SignInPage />)
            } />
        </Switch>
      </div>
    );
  
}

const mapStateToProps =createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispachToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps,mapDispachToProps)(App);
