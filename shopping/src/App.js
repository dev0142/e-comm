import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Router>
      
        <Switch>
          <Route path="/admin">admin panel</Route>
          <Route path="/" component={Home}></Route>
        </Switch>      
    </Router>
    </>
  );
}

export default App;
