import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Fontawesome from 'react-fontawesome'

class Notifications extends Component {
  componentDidUpdate() {
    if (this.props.notification !== '') {
      this.props.cleanNotification()
    }
  }

  render() {
    const { notification } = this.props

    const view =
      notification !== '' ? (
        <React.Fragment>
          <div className="animated fadeIn text-muted">
            <span className="text-info">
              <Fontawesome name="info-circle" />
            </span>{' '}
            {notification}
          </div>
        </React.Fragment>
      ) : null

    return view
  }
}

Notifications.propTypes = {
  notification: PropTypes.string,
  cleanNotification: PropTypes.func,
}

const mapStateToProps = state => ({
  notification: state.notificationState.notification,
})

const mapDispatchToProps = dispatch => ({
  cleanNotification: () => {
    const clear = () => {
      dispatch({ type: 'CLEAN_NOTIFICATION' })
    }
    setTimeout(clear, 5000)
  },
})

export { Notifications }

const EnhachedNotification = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications)

export default EnhachedNotification
