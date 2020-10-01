import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// <Route exact path="/dashboard" component={Dashboard}/>
// destructuring the actual *Component* inside *component* prop
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  //  there's no {} in arrow function, there's no need for return keyword
  /*
    const PrivateRoute = ({}) => { return(<Route/>) }
    const PrivateRoute = ({}) => (<Route/>)
  */
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
