import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Slideshow from './components/Slideshow';

function App() {
  return (
    <>
    <Router>
      <Slideshow />
        <Switch>
          <Route exact path="/login">hi i am login page</Route>
          <Route path="/admin">admin panel</Route>
          <Route path="/">hi i am home page</Route>
        </Switch>      
    </Router>
    </>
  );
}

export default App;
