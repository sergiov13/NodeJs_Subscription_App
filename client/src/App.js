import './App.css';
import Navbar from './components/navbar';
import SubscriptionCreate from './components/subscriptionCreate';
import SubscriptionEditDel from './components/subscriptionEditDel';
import SubscriptionList from './components/subscriptionList';
import Home from './components/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


//tsting github api with somesimple change 
function App() {
  return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/create' exact component={SubscriptionCreate}/>
          <Route path='/list' exact component={SubscriptionList}/>
          <Route path='/edit/:id' exact component={SubscriptionEditDel}/>
        </Switch>
      </Router>
  );
}

export default App;
