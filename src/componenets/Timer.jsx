import React from 'react';

export default function Timer(props) {
  console.log(props.timeRemaining)
  return(
    <div>
      {props.timeRemaining}
    </div>
  )
}
