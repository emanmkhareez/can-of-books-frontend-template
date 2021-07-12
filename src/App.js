import React from 'react';
import axios from 'axios';
import Header from './Header';
import BestBooks from'./BestBooks'
import LoginButton from'./components/LoginButton.js'
import IsLoadingAndError from './IsLoadingAndError';
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './components/Profile'
import Footer from './Footer';
import Login from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

//   constructor(props){
//     super(props)
//     this.state={
//       bookarray:[],
//       userEmail: ''
//     }
//   }
  
//   componentDidMount  = async()=>{

//     // const { user } = this.props.auth0;

//     // await this.setState({
//     //   userEmail: user.name
//     // })




//      let url=`http:${process.env.REACT_APP_PORT}/book?ownerName=emkhareez19@gmail.com`
//      let result = await axios.get(url)
//      await this.setState({
//       bookarray:result.data
     
//      })
//      console.log('eam')
// console.log(this.state.bookarray)

//   }  

  render() {
    const { user ,isAuthenticated} = this.props.auth0;
    console.log('app', this.props);
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {
                  isAuthenticated ?<BestBooks/>:<Login/>
                }

              </Route>
              
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route path="/profile">
                <Profile/>
              </Route>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
       
     
      </>
    );
  }
}

export default withAuth0(App);
