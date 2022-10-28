import React from 'react'
import Alert from 'react-bootstrap/Alert'

const AlertMessega = ({info}) => {
  return info === null ? null : (<Alert variant={info.type}>{info.message}</Alert>)
}

export default AlertMessega