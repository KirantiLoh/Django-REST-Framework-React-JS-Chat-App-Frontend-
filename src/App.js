import './App.css';
import Header from './component/Header';
import RegisterPage from "./pages/RegisterPage"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from "./component/PrivateRoute"
import { Navigate } from 'react-router';
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
          <Route element={<PrivateRoute><HomePage/></PrivateRoute> } path='/' />
          <Route element={<LoginPage/>} path='/login' />
          <Route element={<RegisterPage/>} path='/register' />
          <Route element={<SettingsPage/>} path='/settings' />
          <Route element={<Navigate to='/'/>} path=':str' />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
