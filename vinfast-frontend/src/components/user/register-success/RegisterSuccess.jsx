import React, {useState} from 'react'

import './register-success.scss'

const RegisterSuccess = () => {
    const [showForm, setShowForm] = useState(true)
    return (
        <div className={showForm ? "showForm" : ""}  id="register__success">
            <div className="logo "></div>
            <div onClick={() => setShowForm(false)} className="close__form">
                <img src="http://localhost:3000/images/vinfast-data-01/close_yctv.svg" alt="close_yctv" />
            </div>
            <div className="desc-1 text-center">
                Kiểm tra email
                <br/>    
                để kích hoạt tài khoản
            </div>
            <div className="desc-2">
                VinFast đã gửi cho Quý khách email kích hoạt tài khoản.
                <br />
                Quý khách vui lòng kiểm tra email và thực hiện theo hướng dẫn.
            </div>
            <div className="hotline text-center">Hotline 1900 23 23 89</div>
        </div>
    )
}

export default RegisterSuccess
