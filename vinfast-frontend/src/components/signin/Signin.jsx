import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import accountApi from '../../api/account';

import './signin.scss';

const Signin = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState([])

    useEffect(() => {
        const getAccountApi = async () => {
            try {
                const res = await accountApi.getAll()
                setAccountData(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getAccountApi()
    }, [])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowPassConfirm, setIsShowPassConfirm] = useState(false)
    const [checkMail, setCheckMail] = useState(true)
    const [checkPass, setCheckPass] = useState(true)
    const [checkPassConfirm, setCheckPassConfirm] = useState(false)
    const [checkUpperCase, setCheckUpperCase] = useState(false)
    const [checkLowerCase, setCheckLowerCase] = useState(false)
    const [checkLengthCase, setCheckLengthCase] = useState(false)
    const [checkNumberCase, setCheckNumberCase] = useState(false)

    const [checkIsMail, setCheckIsMail] = useState(true)

    // On change text
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const arrayName = name.split(" ");
    const first_name = arrayName[0].slice(0, 1).toUpperCase()
    const last_name = arrayName[arrayName.length - 1].slice(0, 1).toUpperCase()

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePass = (e) => {
        setCheckUpperCase(/[A-Z]/.test(e.target.value))
        setCheckLowerCase(/[a-z]/.test(e.target.value))
        setCheckLengthCase(e.target.value.length >= 8)
        setCheckNumberCase(/\d/.test(e.target.value))
        setPass(e.target.value);

    }

    const onChangePassConfirm = (e) => {
        setPassConfirm(e.target.value);
    }

    const handleShowPass = () => {
        setIsShowPass(!isShowPass)
    }

    // Validation

    const emailValidation = () => {
        
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setCheckMail(regex.test(email));
    }

    const passwordValidation = () => {
        setCheckPassConfirm(pass === passConfirm);
    }

    const handleShowPassConfirm = () => {
        setIsShowPassConfirm(!isShowPassConfirm)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        emailValidation();
        passwordValidation();

        const check = checkUpperCase && checkLowerCase && checkLengthCase && checkNumberCase;
        setCheckPass(check)

        const found = accountData.find(item => item.email === email);
        setCheckIsMail(found === undefined)
        
        console.log(checkMail)
        console.log(checkPass)
        console.log(checkPassConfirm)
        console.log(checkIsMail)
        console.log(checkMail && checkPass && checkPassConfirm && checkIsMail)
        if (checkMail && checkPass && checkPassConfirm && checkIsMail) {
            // Khai báo các biến canvas
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
    
            // Lấy x, y căn giữa canvas
            var x = canvas.width / 2;
            var y = canvas.height / 2;
    
            // Phủ màu cho canvas
            context.rect(0, 0, 40, 40);
            context.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
            context.fill();
    
            // Viết tắt họ và tên lên canvas
            context.font = "15px Arial";
            context.textAlign = "center";
            context.fillStyle = "white";
            context.fillText(first_name + last_name, x, y + 5);
    
            const dataAvt = canvas.toDataURL(); // Lấy dữ liệu canvas
            
            const formData = new FormData()
            formData.append("dataAvt", dataAvt)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", pass)
            formData.append("role", "user")
            try {
                await accountApi.create(formData)
                alert("Đăng ký tài khoản thành công")
                navigate("/login")
            } catch(err) {
                console.log(err)
            }
        }
    }
    return (
        <form action method="POST" className="form" id="form-2">
            <div className="sign__in">
                <p className="sign__in--title">Đăng ký tài khoản</p>
                <div className="form-group">
                    <input onChange={onChangeName} type="text" name="name" id="name" placeholder="Họ và tên" />
                    <div className="form-message"></div>
                </div>
                <canvas style={{display: 'none'}} id="canvas" width="40" height="40"></canvas>
                <div className="form-group">
                    <input className={checkMail ? (checkIsMail ? '' : "check") : 'check'} onChange={onChangeEmail} type="text" name="email" id="email" placeholder="Email" />
                    <div className="form-message">{checkMail ? '' : "Sai định dạng email."}</div>
                    <div className="form-message">{checkIsMail ? '' : "Địa chỉ email đã tồn tại"}</div>
                </div>
                <div className="form-group">
                    <div className="password">
                        <input className={checkPass ? "" : "check"} onChange={onChangePass} type={isShowPass ? 'text': 'password'} name="password" id="passwword" placeholder="Mật khẩu" />
                        <div onChange={onChangePass} onClick={handleShowPass} className="password__show">
                            <i className={isShowPass ? "icon__hide" : "icon__show"}></i>
                        </div>
                    </div>
                    <div className="form-message">{checkPass ? "" : "Mật khẩu phải đúng định dạng."}</div>
                </div>
                <div className="form-group">
                    <div className="password">
                        <input className={checkPassConfirm ? "" : "check"} onChange={onChangePassConfirm} type={isShowPassConfirm ? 'text': 'password'} name="password" id="passwword1" placeholder="Nhập lại mật khẩu mới" />
                        <div onClick={handleShowPassConfirm} className="password__show">
                            <i className={isShowPassConfirm ? "icon__hide" : "icon__show"}></i>
                        </div>
                    </div>
                    <div className="form-message">{checkPassConfirm === true ? "" : "Mật khẩu không trùng khớp."}</div>
                </div>
            </div>
            <div className="password-require">
                <p className="desc">Mật khẩu bạn phải có:</p>
                <ul className="below-desc">
                    <li className={checkLengthCase ? 'checkCase' : ''} id="character">
                        <span>Ít nhất 8 ký tự</span>
                    </li>
                    <li className={checkUpperCase ? 'checkCase' : ''} id="uppercase">
                        <span>Chữ cái viết hoa (A-Z)</span>
                    </li>
                    <li className={checkLowerCase ? 'checkCase' : ''} id="lowercase">
                        <span>Chữ cái viết thường (a-z)</span>
                    </li>
                    <li className={checkNumberCase ? 'checkCase' : ''} id="number">
                        <span>Ít nhất 1 số</span>
                    </li>
                </ul>
            </div>
            <div className="policy">
                Bằng việc bấm nút Đăng ký bên dưới, tôi xác nhận đã đọc, hiểu và đồng ý với các <Link to="/">Điều kiện và Điều khoản</Link> của VinFast.
            </div>
            <div className="submit">
                <button onClick={onSubmit} disabled={email !== '' && pass !== '' && name !== '' && passConfirm !== '' ? false : true}>Đăng ký</button>
            </div>
            <p className="no__account">Đã có tài khoản?</p>
            <div className="btn__sign__up">
                <Link to="/login">Đăng nhập</Link>
            </div>
        </form>
    )
}

export default Signin
