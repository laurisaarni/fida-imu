import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label } from 'reactstrap'

class Checkbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isChecked: props.isChecked,
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this)
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, label } = this.props

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    }))

    handleCheckboxChange(label)
  }

  render() {
    const { label, isSimple } = this.props
    const { isChecked } = this.state

    if (isSimple) {
      return (
        <Input
          className="form-check-input-list"
          type="checkbox"
          defaultChecked={isChecked}
          id={`checkbox_${label}`}
          name={`checkbox_${label}`}
          value={label}
          onChange={this.toggleCheckboxChange}
        />
      )
    }
    return (
      <FormGroup check inline className="checkbox" key={Math.random() * 10000}>
        <Input
          className="form-check-input"
          type="checkbox"
          defaultChecked={isChecked}
          id={`checkbox_${label}`}
          name={`checkbox_${label}`}
          value={label}
          onChange={this.toggleCheckboxChange}
        />
        <Label check className="form-check-label" htmlFor={`checkbox_${label}`}>
          {label}
        </Label>
      </FormGroup>
    )
  }
}

Checkbox.defaultProps = {
  isSimple: false,
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isSimple: PropTypes.bool,
  handleCheckboxChange: PropTypes.func.isRequired,
}

export default Checkbox
