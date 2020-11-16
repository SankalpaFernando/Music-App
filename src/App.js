import logo from './logo.svg';
import './App.css';
import {Switch,BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import Login from './routes/Login';
import Showcase from './routes/Showcase';
import {connect} from 'react-redux';

function App({login}) {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route  exact path="/">
              <h1>Index</h1>
          </Route>
          <Route path="/music">
              {login?<Showcase/>:<Redirect to="/login"/>}
          </Route>
          <Route path="/login">
              <Login/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps=state=>{
  return {login:state.login}
}
export default connect(mapStateToProps,null)(App);

