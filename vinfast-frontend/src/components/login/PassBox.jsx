import React, {useState} from 'react'

const PassBox = () => {
    
    const [active, setActive] = useState('icon__show')
    return (
        <div className="form-group">
            <div className="password">
                <input type="text" name="password" id="password" placeholder="Mật khẩu" />
            <div className="password__show">
                <i className="icon__show"></i>
            </div>
            </div>
            <span className="form-message"></span>
        </div>
        // <div className="password__show">
        //     <i onClick={(e) => setActive('icon__hide')} className={active}></i>
        // </div>
    )
}

export default PassBox
