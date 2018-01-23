import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Alert } from 'reactstrap'
import { auth } from '../../firebase'
import * as routes from '../../constants/routes'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'
import Card from '../Card'
import FormElement from '../FormElement'


const PasswordForgetPage = () => (
  <div>
    <PageTitle title="Password recovery" />
    <PageWrapper>
      <Card title="Have you forgot your password?">
        <p>
          No worries.
          Please fill in the form bellow to start recovering your email.
        </p>
        <PasswordForgetForm />
      </Card>
    </PageWrapper>
  </div>
)

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  error: null,
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { email, error } = this.state

    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit} >
        {error && <Alert color="danger">{error.message}</Alert>}
        <FormElement
          className="py-2"
          value={email}
          name="email"
          id="email"
          label="Email address"
          onChange={event =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
          type="text"
          placeholder=""
        />
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
      </form>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage

export { PasswordForgetForm, PasswordForgetLink }
