import logo from './logo.svg';
import './App.css';
//import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar.component"
import SongList from "./components/song-list.component";
import CreateSong from "./components/create-song.component";
import CreateUser from "./components/create-user.component";



function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={SongList} />
      <Route path="/create" component={CreateSong} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
