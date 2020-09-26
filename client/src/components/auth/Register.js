import React, { Fragment, useState } from 'react';
// Connect this component with the redux store
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import {register} from '../../actions/auth';
//When Action is dispatched , Action is dispatched to all the reducers but only some will act based on the action
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  // This state is component level state
  // useState to manage the state of the form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  // e.target.name = "email" || "password" || "password2"
  // & can't use *e.target.name* bcz objects property is accessed / changed using this sntx
  // {[property]: somevalue}
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 1000);
    } else {
      // console.log("Success");
      register({name, email, password})
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

/* See on google */
// THIS is for checking the types of the props
Register.propTypes = {
  // setAlert is func & it is required
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

// this is making the *Action Creators* available as a prop to us
export default connect(null,{ setAlert, register })(Register);

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

// As mapStateToProps is null this component is not subscribed to the redux store



// ------------- The ABOVE COMPONENT can also be written like this
// The ABOVE ONE IS EASIER (It is personal preference)
/*

import { bindActionCreators } from 'redux'

function mapDispatchToProps(dispatch) {
  return {
    setAlert: bindActionCreators(setAlert, dispatch),
    register: bindActionCreators(register, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Register);

*/