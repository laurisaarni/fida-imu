import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { branch, renderComponent } from 'recompose'
import CenteredLoader from '../CenteredLoader'
import Header from '../Header'
import Footer from '../Footer'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import withAuthentication from '../Session/withAuthentication'
import * as routes from '../../constants/routes'

import './index.css'

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Footer />
    </div>
  </Router>
)

export default withAuthentication(branch(props => !props.ready, renderComponent(CenteredLoader))(App))
