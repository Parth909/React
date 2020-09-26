import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
  // This state is component level state
  // useState to manage the state of the form
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const {email, password} = formData;

  // e.target.name = "email" || "password" || "password2"
  // & can't use *e.target.name* directly thf used *[e.target.name]*
  const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  }

  // Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/dashboard"></Redirect>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i>Login</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            value={email}
            onChange={e => onChange(e)} 
            required 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)} 
            required 
            minLength="6"
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  // will give the state of the redux-store
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login)
// this line will connect react-component to redux-store
// & will inject the *login* as prop in the component