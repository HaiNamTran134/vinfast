import React from 'react'

const CheckBox = props => {
    return (
        <div className="form-group">
            <input type={props.type} name={props.name} id={props.id} />
            <span className="checkmark-box"></span>
            <label htmlFor='note' className="save__pass">Ghi nhớ tài khoản</label>
        </div>
    )
}

export default CheckBox
