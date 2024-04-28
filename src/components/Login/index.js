import {Component} from 'react'
import {Cookies} from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userName: '', password: '', showErrMsg: false, errMsg: ''}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errMsg => {
    console.log(errMsg)
    this.setState({showErrMsg: true, errMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  renderUserNameInput = () => {
    const {userName} = this.state

    return (
      <>
        <label htmlFor="userNameInput" className="label-element">
          USERNAME
        </label>
        <input
          id="userNameInput"
          value={userName}
          className="input-element"
          placeholder="UserName"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="passwordInput" className="label-element">
          PASSWORD
        </label>
        <input
          id="passwordInput"
          value={password}
          className="input-element"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showErrMsg, errMsg} = this.state

    return (
      <div className="login-bg-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          {this.renderUserNameInput()}
          {this.renderPasswordInput()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrMsg && <p className="error-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
