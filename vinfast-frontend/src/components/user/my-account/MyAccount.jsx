import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import cookies from 'react-cookies'
import { useSelector } from 'react-redux';
import {login, selectUser } from '../../../redux/user/userSlice';
import accountApi from '../../../api/account';
import { TabTitle } from '../../../assets/setTitle'
import './my-account.scss'
const MyAccount = () => {

  TabTitle("Tài khoản của tôi | VinFast Online")

  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(123);
  console.log(userData)
  useEffect(() => {
    const getAccount = async () => {
      try {
          const res = await accountApi.getOne(user.id)
          console.log(user.id)
          setUserData(res.data)
      } catch(err) {
          console.log(err)
      }
  }
  getAccount()
  }, [user.id])
  console.log(userData)

  const my_account = [
    {
      card : 'Họ và tên',
      value: user.name,
    },
    {
      card : 'Email',
      value: user.email,
    },
    {
      card : 'Số điện thoại',
      value: user.phone,
    },
  ]

  const [showForm, setShowForm] = useState(false)
  const [showFormInfo, setShowFormInfo] = useState(false)

  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState('')

  const [passCurrent, setPassCurrent] = useState('')
  const [pass, setPass] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const [isShowPassCurrent, setIsShowPassCurrent] = useState(false)
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowPassConfirm, setIsShowPassConfirm] = useState(false)
  const [checkPassCurrent, setCheckPassCurrent] = useState(true)
  const [checkPass, setCheckPass] = useState(true)
  const [checkPassConfirm, setCheckPassConfirm] = useState(true)
  const [checkUpperCase, setCheckUpperCase] = useState(false)
  const [checkLowerCase, setCheckLowerCase] = useState(false)
  const [checkLengthCase, setCheckLengthCase] = useState(false)
  const [checkNumberCase, setCheckNumberCase] = useState(false)
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

  const handleShowPassCurrent = () => {
    setIsShowPassCurrent(!isShowPassCurrent)
}

  const passwordValidation = () => {
    if (pass === passConfirm) {
        setCheckPassConfirm(true);
    } else {
        // make API call
        setCheckPassConfirm(false);
    }
  }

const handleShowPassConfirm = () => {
  setIsShowPassConfirm(!isShowPassConfirm)
}

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    const formData = {
      id : userData.id,
      name: name,
      phone: phone,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar,
    }

        const updateProductApi = async () => {
            try {
                const res = await accountApi.update(formData)
                alert('Cập nhật thông tin thành công')
                setShowFormInfo(false)
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        updateProductApi()
        dispatch(login(formData))
        cookies.save("user", formData)
  }

  const handleUpdatePass = async (e) => {
    e.preventDefault();
    passwordValidation();

    const check = checkUpperCase && checkLowerCase && checkLengthCase && checkNumberCase;
    setCheckPass(check)

    if (passCurrent === userData.password) {
      const formData = {
        id : userData.id,
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        password: passConfirm,
        avatar: userData.avatar,
      }
  
      const updateProductApi = async () => {
          try {
              const res = await accountApi.update(formData)
              alert('Cập nhật mật khẩu thành công')
              setShowForm(false)
              console.log(res)
          } catch(err) {
              console.log(err)
          }
      }
      updateProductApi()
      dispatch(login(formData))
      cookies.save("user", formData)
    } else {
      setCheckPass(false)
    }
  }
  console.log(passConfirm)
  return <div className='l-9 m-9 c-12 my__account'>
      <div className='my__account__info'>
        <h1>Thông tin cá nhân</h1>
        <div className="my__account__info--edit">
          <button onClick={() => setShowFormInfo(true)} className='btn-edit'>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1111 8.77778L11.1111 7.77778C11.3333 7.55555 11.6667 7.66667 11.6667 8V12.1111C11.6667 12.7778 11.1111 13.3333 10.4444 13.3333H1.22222C0.555556 13.3333 0 12.7778 0 12.1111V2.88889C0 2.22222 0.555556 1.66667 1.22222 1.66667H8.66667C9 1.66667 9.11111 2 8.88889 2.22222L7.88889 3.22222C7.77778 3.33333 7.77778 3.33333 7.66667 3.33333H1.66667V11.6667H10V9C10 8.88889 10 8.88889 10.1111 8.77778ZM12.7778 4.55556C12.8889 4.66667 12.8889 4.77778 12.7778 4.88889L7.11111 10.5556L4.77778 10.7778C4.44444 10.8889 4.11111 10.5556 4.22222 10.2222L4.44444 7.88889L10.1111 2.22222C10.2222 2.11111 10.3333 2.11111 10.4444 2.22222L12.7778 4.55556ZM14.6667 3L13.7778 3.88889C13.6667 4 13.5556 4 13.4444 3.88889L11.1111 1.55556C11 1.44444 11 1.33333 11.1111 1.22222L12 0.333333C12.4444 -0.111111 13 -0.111111 13.4444 0.333333L14.6667 1.55556C15.1111 2 15.1111 2.55556 14.6667 3Z" fill="black"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="my__account__body">
        <div className="container">
          <div className="personal">
            {
              my_account && my_account.map((item, index) => (
                <div className="row" key={index}>
                  <div className="l-4 m-4 c-4">{item.card}</div>
                  <div className="l-8 m-8 c-8">{item.value}</div>
                </div>
              ))
            }
          </div>
          <div className="password">
            <div className="row">
              <div className="l-4 m-4 c-4">Mật khẩu</div>
              <div className="l-8 m-8 c-8">
                <div onClick={() => setShowForm(true)} className='btn-edit'>Đổi mật khẩu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForm ? <div className="my__account__form">
        <div className="showForm"  id="register__success">
          <div className="logo ">
            <img src="http://localhost:3000/images/logo-header.svg" alt="close_yctv" />
          </div>
          <div onClick={() => setShowForm(false)} className="close__form">
            <img src="http://localhost:3000/images/vinfast-data-01/close_yctv.svg" alt="close_yctv" />
          </div>
          <form action className='form'>
            <p className="title">Đổi mật khẩu</p>
            <div className="form-group">
                <div className="password">
                    <input className={checkPassCurrent ? "" : "check"} onChange={(e) => setPassCurrent(e.target.value)} type={isShowPassCurrent ? 'text': 'password'} name="password" id="passwword" placeholder="Mật khẩu hiện tại" />
                    <div onClick={handleShowPassCurrent} className="password__show">
                        <i className={isShowPassCurrent ? "icon__hide" : "icon__show"}></i>
                    </div>
                </div>
                <div className="form-message">{checkPass ? "" : "Mật khẩu không đúng. Vui lòng thử lại."}</div>
            </div>
            <div className="form-group">
                <div className="password">
                    <input className={checkPass ? "" : "check"} onChange={onChangePass} type={isShowPass ? 'text': 'password'} name="password" id="passwword" placeholder="Mật khẩu mới" />
                    <div onClick={handleShowPass} className="password__show">
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
                <div className="form-message">{checkPassConfirm ? "" : "Mật khẩu không trùng khớp."}</div>
            </div>
            <div className="submit">
                <button onClick={handleUpdatePass}> Xác nhận</button>
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
          </form>
        </div>
      </div> : null}
      {showFormInfo ? <div className="my__account__form">
        <form action className="showFormInfo form" >
          <div className="content">
            <div className="title">Cập nhật thông tin cá nhân</div>
            <div className=" form-group row">
              <label className='l-4' htmlFor="name">Họ và tên</label>
              <div className="l-8">
                <input type="text" onChange={(e) => setName(e.target.value)} id='name' value={name || user.name} />
              </div>
            </div>
            <div className="form-group row">
              <label  className='l-4' htmlFor="phone">Số điện thoại</label>
              <div className="l-8">
                <input type="text" onChange={(e) => setPhone(e.target.value)} id='phone' value={phone || user.phone} />
              </div>
            </div>
            <div className="form-group row">
              <label  className='l-4' htmlFor="email">Email</label>
              <div className="l-8">
                <input type="text" id='email' value={user.email} disabled />
              </div>
            </div>
            <div className="form-group row">
              <div className="l-4">
                <button onClick={() => setShowFormInfo(false)} className='btn'>Trở về</button>
              </div>
              <div className="l-8">
                <button onClick={handleUpdateInfo} className='btn'>Cập nhật thông tin</button>
              </div>
            </div>
          </div>
        </form>
      </div> : null }
  </div>;
};

export default MyAccount;
