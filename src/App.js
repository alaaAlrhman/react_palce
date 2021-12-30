import React ,{useState ,useCallback ,useContext}from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { authCotext } from './shared/context/auth-context';
import UpdatePlace from './places/pages/UpdatePalce';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
const App = () => {
  const [isLoggedIn , setIsLoggedIn] =useState(false);
  const login =useCallback(()=>{
    setIsLoggedIn(true)
  },[]);
  const logout =useCallback(()=>{

  setIsLoggedIn(false)

  },[]
  )
 let routes ;
 if(!isLoggedIn){
   routes=(
    <Switch>
    <Route path="/" exact>
       <Users />
     </Route>
     <Route path="/:userId/places" exact>
       <UserPlaces />
     </Route>
     <Route path="/Auth">
              <Auth/>
          </Route>
          <Redirect to="/Auth" />

</Switch>
   );
   
 }else{
   routes=(
    <Switch>
            <Route path="/" exact>
       <Users />
     </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/place/:placeId">
              <UpdatePlace/>
          </Route>
          <Redirect to="/" />

    </Switch>
   )
 }
  return (
    <authCotext.Provider
    value={{isLoggedIn ,isLoggedIn ,login:login ,logout:logout}}>
    <Router>
      <MainNavigation />
      <main>
   
     {routes}
      </main>
    </Router>
    </authCotext.Provider>
  );
};

export default App;
