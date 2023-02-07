import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Feed from './Components/Feed';
import {AuthProvider} from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/signup' element={<Signup/>} ></Route>

          <Route path='/profile/:id' element={<PrivateRoute />}>
            <Route path='/profile/:id' element={<Profile />} />
          </Route>
          
          <Route path='/' element={<PrivateRoute/>}> 
              <Route path='/' element={<Feed/>} />
          </Route>
          {/* <PrivateRoute path="/" element={<Feed/>} /> */}
        </Routes>
      </AuthProvider>
      </Router>
   
  );
}

export default App;
