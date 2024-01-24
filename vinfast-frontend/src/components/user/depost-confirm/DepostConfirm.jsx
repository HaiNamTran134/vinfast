import React from 'react'
import { useNavigate } from 'react-router-dom'
import customerApi from '../../../api/depost/customerApi'
import './depost-confirm.scss'

const DepostConfirm = (props) => {

    const navigate = useNavigate();

    const customer = props.customer;
    console.log(customer)
    const createCustomer = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("order_id", customer.order_id)
        formData.append("name_car", customer.nameCar)
        formData.append("color_car", customer.colorCar)
        formData.append("name", customer.nameText)
        formData.append("phone", customer.phone)
        formData.append("cccd", customer.cccd)
        formData.append("email", customer.email)
        formData.append("province", customer.province)
        formData.append("image_car", customer.image_car)
        formData.append("money_deposit", customer.money_deposit)
        formData.append("price", customer.price)
        formData.append("note", customer.note)
        formData.append("order_id", customer.order_id)
        formData.append("order_desc", customer.payment)
        formData.append("status", "pending")
        // formData.append("redirect", true)
        if (customer.payment === 'Thanh toán qua thẻ ATM nội địa/Internet Banking') {
            formData.append("amount", "50000000")
            formData.append("language", "vn")

            try {
                const resVNPay = await customerApi.postVNPay(formData)
                // console.log(resVNPay)
                window.location.href = resVNPay.data
            } catch (err) {
                console.log(err)
            }
        } else if (customer.payment === 'Thanh toán qua chuyển khoản ngân hàng') {
            formData.append("file", props.file)
            try {
                await customerApi.create(formData)
                navigate('/dat-coc')
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            <div className={props.show ? 'modal deposit__confirm show' : 'modal deposit__confirm'}>
                <div className="modal__content">
                    <div className="modal__content__header">
                        <h5 className='title'>Thông tin đặt hàng</h5>
                        <p>Quý khách vui lòng kiểm tra lại thông tin trước khi thực hiện thanh toán.</p>
                    </div>
                    <div className="modal__content__body">
                        <form className='deposit__confirm' id="create_form" method="post">
                            <div className="row group__info">
                                <h5 className="l-12">THÔNG TIN SẢN PHẨM</h5>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Mẫu xe</label>
                                        <div className="l-7">{customer.nameCar}</div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Phiên bản</label>
                                        <div className="l-7">
                                            <label htmlFor="" className="l-7">TIÊU CHUẨN</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Màu ngoại thất</label>
                                        <div className="l-7">{customer.colorCar}</div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Màu nội thất</label>
                                        <div className="l-7">
                                            <label htmlFor="" className="l-7">Da Tiêu Chuẩn</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row group__info">
                                <h5 className="l-12">THÔNG TIN CÁ NHÂN</h5>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Họ tên</label>
                                        <div className="l-7">
                                            <label htmlFor="" className="l-7">{customer.nameText}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">CMND/CCCD</label>
                                        <div className="l-7">
                                            <label htmlFor="" className="l-7">{customer.cccd}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Số điện thoại</label>
                                        <div className="l-7">
                                            <label htmlFor="" className="l-7">{customer.phone}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Email</label>
                                        <div className="l-7">
                                            <label htmlFor="" className="l-7">{customer.email}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Tỉnh thành</label>
                                        <div className="l-7">
                                            <label htmlFor="" className="l-7">{customer.province}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row group__info">
                                <h5 className="l-12">THÔNG TIN THANH TOÁN</h5>
                                <div className="l-6" style={{ display: 'none' }}>
                                    <div className="row group__item">
                                        <label htmlFor="order_id" className="l-5">Mã hóa đơn</label>
                                        <input className="form-control" id="order_id" name="order_id" type="text" value={new Date()} />
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Hình thức</label>
                                        <div className='l-7' name="order_desc">
                                            <label>{customer.payment}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="row group__item">
                                        <label htmlFor="" className="l-5">Số tiền đặt cọc</label>
                                        <div className='l-7' name="amount">{customer.money_deposit}</div>
                                    </div>
                                </div>
                                <div className="l-6" style={{ display: 'none' }}>
                                    <div className="row group__item">
                                        <label htmlFor="language" className="l-5">Số tiền đặt cọc</label>
                                        <select name="language" id="language" className="form-control">
                                            <option value="vn">Tiếng Việt</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal__content__footer">
                        <button onClick={props.handleNone} className="btn">Thay đổi thông tin</button>
                        <button onClick={createCustomer} className="btn">Thanh toán</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DepostConfirm
