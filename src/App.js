import './App.css';
import HomePage from './pages/homepages/homePage.component';
import { Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInPage from './pages/sign-in/sign-in.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';

class App extends React.Component {

  constructor(){
    super();
    this.state ={
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user });      
      //console.log(user);

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot =>{
          this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
          }/* , () => {
            console.log(this.state);
          } */)
          console.log(this.state);
        });  
                

      }else{
        this.setState({currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
