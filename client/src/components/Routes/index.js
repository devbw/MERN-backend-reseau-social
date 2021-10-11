import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';

const index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profil" exact component={Profil}/>
          <Route path="/trending" exact component={Trending}/>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default index;