import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Routes, Route } from 'react-router-dom';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer.tsx';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login.tsx';
import { initializeApp } from './redux/reducers/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { AppStateType } from "./redux/redux-store.ts";


const DialogsContainer = React.lazy(() => {
  return import('./components/Dialogs/DialogsContainer')
});

const ProfileContainer = React.lazy(() => {
  return import('./components/Profile/ProfileContainer')
});


const App = (props) => {

  React.useEffect(() => {

    props.initializeApp()

  }, [])

  return (
    <div className='app-wrapper'>
      <HeaderContainer/>
      <Navbar/>
      {
        !props.initialized ?
          <Preloader/> :
          <div className="app-wrapper-content">
            <React.Suspense fallback={ <Preloader/> }>
              <Routes>
                <Route path="/profile/" element={ <ProfileContainer store={ props.store }/> }>
                  <Route path=":userId?" element={ <ProfileContainer store={ props.store }/> }/>
                </Route>
                <Route path="/dialogs" element={
                  <DialogsContainer store={ props.store }/>
                }/>
                <Route path="/users" element={ <UsersContainer store={ props.store }/> }/>
                <Route path="/login" element={ <Login store={ props.store }/> }/>
                <Route path="/news" element={ <News/> }/>
                <Route path="/music" element={ <Music/> }/>
                <Route path="/settings" element={ <Settings/> }/>
              </Routes>
            </React.Suspense>
          </div>
      }
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  }
}

export default connect(mapStateToProps, {initializeApp})(App)
