import React from 'react'

function Alert(props) {
  return (
    <div>
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        {props.message}
      </div>
    </div>
  );
}

export default Alert