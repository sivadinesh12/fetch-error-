import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo-img"
      />
      <div className="navigation">
        <Link to="/">
          <p className="nav-text">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="nav-text">Jobs</p>
        </Link>
      </div>
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
