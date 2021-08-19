import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  const [search, set_search] = useState('')
  return (
    <Router>
      <Header set_search={set_search} />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/createnote" component={CreateNote} />
        <Route
          path="/mynotes"
          component={({ history }) => (
            <MyNotes search={search} history={history} />
          )}
        />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
