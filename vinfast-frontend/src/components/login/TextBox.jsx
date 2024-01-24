import React, {useState} from 'react'

const TextBox = props => {

    const ShowPass = () => {

        const [active, setActive] = useState('icon__show')
        return (
            <div className="password__show">
                <i onClick={(e) => setActive('icon__hide')} className={active}></i>
            </div>
        )
    }

    return (
        <div className="form-group">
            <input onChange={props.onChange} type={props.type} name={props.name} id={props.id || ''} placeholder={props.placeholder || ''} value={props.value} disabled={props.disabled} />
            {
               props.name === 'password' ? <ShowPass /> : ''
            }
            <span className="form-message"></span>
        </div>
    )
}

export default TextBox
