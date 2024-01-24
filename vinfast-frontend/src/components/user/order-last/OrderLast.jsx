import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import cookies from 'react-cookies'
import { selectUser } from '../../../redux/user/userSlice';
import { customerCar } from '../../../redux/customer/customerSlice';
import GroupInput from '../group-input/GroupInput'
import DepostConfirm from '../depost-confirm/DepostConfirm'
import './order-last.scss'

const OrderLast = (props) => {

    const colorCar = props.colorCar
    const image_car = props.image_car
    const price = props.price
    const money_deposit = props.money_deposit
    const nameCar = props.nameCar
    const user = useSelector(selectUser);

    const [isDisabled, setIsDisabled] = useState(true)
    const [nameText, setNameText] = useState(user ? user.name : '')
    const [phone, setPhone] = useState('')
    const [cccd, setCccd] = useState('')
    const [email, setEmail] = useState(user ? user.email : '')
    const [province, setProvince] = useState('')
    const [show, setShow] = useState(false);

    const [isCheckName, setIsCheckName] = useState(true)
    const [isCheckPhone, setIsCheckPhone] = useState(true)
    const [isCheckCccd, setIsCheckCccd] = useState(true)
    const [isCheckMail, setIsCheckMail] = useState(true)
    const [test, setTest] = useState(false)

    const handleChangeName = (e) => {
        setNameText(e.target.value);
    }

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleChangeCccd = (e) => {
        setCccd(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangeProvince = (e) => {
        setProvince(e.target.value);
    }

    const handleNone = (e) => {
        setShow(!show)
    }

    const payments = [
        {
            label: 'Ngân hàng',
            value: 'Ngân hàng Thương mại cổ phần Kỹ Thương Việt Nam (Techcombank)',
        },
        {
            label: 'Số tài khoản',
            value: '19035192838125',
        },
        {
            label: 'Tên tài khoản',
            value: 'CÔNG TY TNHH KINH DOANH THƯƠNG MẠI VÀ DỊCH VỤ VINFAST',
        },
        {
            label: 'Nội dung',
            value: '- CMT nop coc xe LUX SA2.0 ',
        },
    ]
    
    const [checkRadio, setCheckRadio] = useState(1)
    const [checkCheckBox, setCheckCheckBox] = useState([])
    const handleCheckBox = (id) => {
        setCheckCheckBox(prev => {
            const isCheckBox = checkCheckBox.includes(id)
            if(isCheckBox) {
                setIsDisabled(true)
                return checkCheckBox.filter(item => item !== id)
            } else {
                if (checkCheckBox.length === 2) {
                    setIsDisabled(false)
                }
                return [...prev, id]
            }
        })
    }

    const selectFile = useRef()
    const [stateFile, setStateFile] = useState([]);
    const onChangeImage = (e) => {
        setStateFile([]);
        if(e.target.files) {
          const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
          setStateFile((prevImages) => prevImages.concat(filesArray))
          Array.from(e.target.files).map((file) => URL.revokeObjectURL(file))
        }
      }
    
      const renderPhotos = (source) => {
        return source.map((photo, index) => {
          return <img key={index} src={photo} alt="" style={{width: "40%", height: "40%"}} />
        })
      }
      const dispatch = useDispatch();
      
      const today = new Date();
      const order_id = today.getFullYear() + '' + today.getMonth() + 1 + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
      let payment = null

    if (checkRadio === 2 ) {
        payment = 'Thanh toán qua chuyển khoản ngân hàng'
    } else {
        payment = 'Thanh toán qua thẻ ATM nội địa/Internet Banking'
        
    }
    
    const customer = {
        order_id: order_id,
        nameText: nameText,
        phone: phone,
        cccd: cccd,
        email: email,
        province: province,
        nameCar: nameCar,
        price: price,
        colorCar: colorCar,
        image_car: image_car,
        money_deposit: money_deposit,
        payment: payment,
        note: payment,
    }

    const check = () => {
        setIsCheckName(nameText !== '')
        setIsCheckCccd(cccd.length === 12)
        setIsCheckPhone(phone.length === 10)
        
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setIsCheckMail(regex.test(email));

        setTest(isCheckName && isCheckCccd && isCheckMail && isCheckPhone)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        
        dispatch(customerCar(customer))
        cookies.save("customer", customer)

        if(checkRadio === 2) {
            if(selectFile.current.files.length === 0) {
                alert("Vui lòng chọn ảnh biên lai")
                setShow(false)
            }else {
                try {
                    setShow(true)
                } catch (error) {
                    console.log(error)
                }
            }
        } else if(checkRadio === 1) {
            setShow(true)
        } else {
            setShow(false)
        }
    }
    return (
        <>
            <div className="order__last">
                <div className="vf__form">
                    <form action="" id=''>
                        <div className="row group-customer">
                            <div className="l-12 m-12 c-12 group__title">Thông tin khách hàng</div>
                            <div className="l-12 m-12 c-12">
                                <div className="row">
                                    <div className="l-6 m-6 c-12 group group__personal">
                                        <GroupInput checkInput={isCheckName} message={isCheckName ? null : 'Vui lòng nhập họ và tên'} value={user ? user.name : nameText} disabled={user ? true : false} handleChange={user ? null : handleChangeName} label="Họ tên cá nhân"/>
                                    </div>
                                    <div className="l-6 m-6 c-12 group group__personal">
                                        <GroupInput checkInput={isCheckCccd} message={isCheckCccd ? null : 'Vui lòng nhập số thẻ / hộ chiếu nhận dạng.'} handleChange={handleChangeCccd} label="CMND/CCCD"/>
                                    </div>
                                </div>
                            </div>
                            <div className="l-12 m-12 c-12">
                                <div className="row">
                                    <div className="l-6 m-6 c-12 group group__personal">
                                        <GroupInput checkInput={isCheckPhone} message={isCheckPhone ? null : 'Vui lòng kiểm tra lại, số điện thoại của quý khách chưa đúng.'} handleChange={handleChangePhone} label="Số điện thoại"/>
                                    </div>
                                    <div className="l-6 m-6 c-12 group group__personal">
                                        <GroupInput checkInput={isCheckMail} message={isCheckMail ? null : 'Vui lòng nhập email hợp lệ.'} value={user ? user.email : email} handleChange={handleChangeEmail} label="Email"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row group-showroom">
                            <div className="l-12 m-12 c-12 group__title">Lựa chọn showroom mua xe</div>
                            <div className="l-12 m-12 c-12">
                                <div className="row">
                                    <div className="l-6 m-6 c-12 group group__showroom">
                                    <GroupInput checkInput={isCheckName} handleChange={handleChangeProvince} label="Tỉnh thành"/>
                                    </div>
                                    <div className="l-6 m-6 c-12 group group__showroom">
                                        <div className="group__input">
                                            <label> 
                                                Showroom /Đại lý 
                                                <span>*</span>
                                            </label>
                                            <span className="select__container">
                                                <span className="select__selection__rendered">
                                                    <input className='select__search__field' placeholder='Lựa chọn Showroom' type="text" />
                                                    <span className="select__selection__arrow"></span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row checkbox checkbox__agree">
                            <div className="group__input">
                                <input onChange={() =>handleCheckBox(1)} type="checkbox" id="1"/>
                                <label htmlFor="1">Tôi cam kết các thông tin đã cung cấp tại đây hoàn toàn chính xác.</label>
                            </div>
                            <div className="group__input">
                                <input onChange={() =>handleCheckBox(2)} type="checkbox" id="2"/>
                                <label htmlFor="2">
                                    Tôi đã đọc, hiểu rõ và xác nhận đồng ý với toàn bộ nội dung
                                    <Link to="/"> Điều khoản </Link>                                    
                                    trong Thỏa Thuận Đặt Cọc trên cũng như Chính Sách Ưu Đãi áp dụng tại thời điểm đặt mua xe ô tô này trên VinFast Online.
                                </label>
                            </div>
                            <div className="group__input">
                                <input onChange={() =>handleCheckBox(3)} type="checkbox" id="3"/>
                                <label htmlFor="3">
                                    Tôi đồng ý với các
                                    <Link to="/"> Điều kiện & Điều khoản </Link>
                                    của VinFast Online.
                                </label>
                            </div>
                        </div>
                        <div className="radio">
                            <p>Hình thức thanh toán</p>
                            <div className="group__input">
                                <input checked={checkRadio === 1 ? true : false} onChange={() => setCheckRadio(1)} type="radio" id="radio2" name="payment" value="radio2"/>
                                <label htmlFor='radio2'>Thanh toán qua thẻ ATM nội địa/Internet Banking</label>
                            </div>
                            <div className="group__input">
                                <input onChange={() => setCheckRadio(2)} type="radio" id="radio1" name="payment" value="radio1"/>
                                <label htmlFor='radio1'>Thanh toán qua chuyển khoản ngân hàng</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={checkRadio === 2 ? 'vf__payments active' : 'vf__payments'}>
                    <div className="vf__payments__title value">Thông tin chuyển khoản đặt cọc</div>
                    {
                        payments.map((item, index) => (
                            <div className="info__depost" key={index}>
                                <div className="label">{item.label}</div>
                                <div className="value">{item.value}</div>
                            </div>
                        ))
                    }
                    <p className='value'>Sau khi chuyển khoản, quý khách làm theo các bước dưới đây</p>
                    <p className='value'>Tải lên ủy nhiệm chi/biên lai chuyển tiền</p>
                    <div className="upload__file">
                        <input type="file" ref={selectFile} onChange={onChangeImage}  className="form-control" multiple required />
                        <div className="result">{renderPhotos(stateFile)}</div>
                    </div>
                    <div className="suppost">
                        Trong trường hợp Quý khách cần hỗ trợ khác, vui lòng liên hệ ngay với chúng tôi.
                        <br />
                        Hotline: <span>1900 23 23 89</span>
                    </div>
                </div>
                <div className="btn">
                    <button onClick={test && isCheckName && isCheckCccd && isCheckMail && isCheckPhone ? onSubmit : check} disabled={isDisabled}>Đặt cọc</button>
                </div>
            </div>
            <DepostConfirm customer={customer} file={selectFile.current ? selectFile.current.files[0] : null} checkRadio={checkRadio} show={show} handleNone={handleNone}/>
        </>
    )
}

export default OrderLast
