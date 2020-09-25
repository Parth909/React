import React from 'react';
import PropTypes from 'prop-types';
// when interacting with redux to *call an action* / *get a state* connect is req
import {connect} from 'react-redux';
// offi-def:- CONNECTS THE REACT COMPONENT TO THE REDUX STORE

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert=>(
  <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    {alert.msg}
  </div>
))
Alert.propTypes = {
  // type is array & isRequired
  alerts: PropTypes.array.isRequired,
}

// Mappping the **state of alert reducer** to the **alerts prop**
const mapStateToProps = state => ({
  alerts: state.alert // now props contains the alert bcz of mapping
})

export default connect(mapStateToProps)(Alert);
