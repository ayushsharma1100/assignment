import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show position-absolute`} style={{width:"100%", height:"50px"}} role="alert">
            {props.alert.message}
        </div>
    )
}
