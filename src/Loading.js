import React from 'react'

function Loading(props) {
    if(props.isActive) {
        return <p>Loading...</p>
    } else {
        return <div></div>
    }
}

export default Loading