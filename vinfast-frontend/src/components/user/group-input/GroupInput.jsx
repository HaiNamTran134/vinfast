import React from 'react'

const GroupInput = props => {
    return (
        <div className="group__input">
            <label> 
                {props.label}
                <span>*</span>
            </label>
            <input style={props.checkInput ? null : { border: '1px solid #dc3545'}} value={props.value} onChange={props.handleChange} type="text"/>
            <div className="message">{props.message}</div>
        </div>
    )
}

export default GroupInput
