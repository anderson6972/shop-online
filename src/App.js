
import HomePage from './pages/homepages/homePage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInPage from './pages/sign-in/sign-in.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';

import React from 'react';

class App extends React.Component {
/* ya no lo necesito ya que redux hara el control
  constructor(){
    super();
    this.state ={
      currentUser: null
    }
  }
 */
  unsubscribeFromAuth = null;

  componentDidMount(){
  const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user });      
      //console.log(user);

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot =>{
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })          
          console.log(this.state);
        });  
                
 
      }else{
        setCurrentUser(userAuth);        
      }

    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <HomePage /> */}
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps =createStructuredSelector ({
  currentUser: selectCurrentUser
})


const mapDispachToProps = dispacht => ({
  setCurrentUser: user => dispacht(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispachToProps)(App);
