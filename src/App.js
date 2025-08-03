import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Navbar';
import MoviesList from './Pages/MoviesList/MoviesList';
import MovieDetails from './Pages/MoviesList/MovieDetails';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import './App.css';
import Favorites from './Pages/Favorites';
function App() {
  return (
    <div className="dark-theme">
      <BrowserRouter> 
        <Navbar />
        <div className="main-content">
          <Switch> 
            <Route path="/" component={Home} exact/>
            <Route path="/movies" component={MoviesList} exact/>
            <Route path="/movie/:id" component={MovieDetails} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <Route path="/favorites" component={Favorites} exact/>
            <Route path="*" component={NotFound} exact/>
            
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;