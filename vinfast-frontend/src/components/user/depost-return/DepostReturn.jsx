import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import './depost-return.scss'
import customerApi from '../../../api/depost/customerApi'
import { selectCustomer } from '../../../redux/customer/customerSlice'
const DepostReturn = () => {
    const customer = useSelector(selectCustomer);
    const [searchParams, setSearchParams] = useSearchParams();
    const calcUrl = () => {
        return window.location.href.split('?').filter((u, index) => index !== 0).join()
    }
    useEffect(() => {

        if (customer.payment === 'Thanh toán qua thẻ ATM nội địa/Internet Banking' && searchParams.get("vnp_ResponseCode") == "00") {
            const formData = new FormData()
            formData.append("name", customer.nameText)
            formData.append("name_car", customer.nameCar)
            formData.append("color_car", customer.colorCar)
            formData.append("phone", customer.phone)
            formData.append("cccd", customer.cccd)
            formData.append("email", customer.email)
            formData.append("province", customer.province)
            formData.append("image_car", customer.image_car)
            formData.append("money_deposit", customer.money_deposit)
            formData.append("price", customer.price)
            formData.append("published_at", customer.published_at)
            formData.append("order_id", customer.order_id)
            formData.append("order_desc", customer.payment)
            formData.append("status", "pending")
            customerApi.createVNPay(formData).then(res => console.log(res))
            customerApi.returnVNPay(calcUrl()).then(res => console.log(res))
        }
    }, [customer.cccd, customer.colorCar, customer.email, customer.nameCar, customer.nameText, customer.order_id, customer.payment, customer.phone, customer.province, customer.published_at, customer.image_car, customer.money, customer.money_deposit, customer.price])
    return searchParams.get("vnp_ResponseCode") == "00" ? <div className="depost__cars">
        <div className="container">
            <div className='depost__success row'>
                <div className="depost__success__left l-6">
                    <div className="img">
                        <img src="http://localhost:3000/images/thanks-page.png" alt="thank-page" />
                    </div>
                </div>
                <div className="depost__success__right l-6">
                    <h2>Đặt hàng thành công</h2>
                    <p>
                        Kính gửi Quý khách
                        <strong> {customer.nameText}</strong>
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                        Cảm ơn Quý khách đã đặt mua xe VinFast tại Vinfastauto.com.
                        <br />
                        Chúng tôi xin thông báo tình trạng đơn hàng của Quý khách:
                    </p>
                    <p>
                        <strong>Đơn hàng: </strong>
                        <strong>VinFast {customer.nameCar}</strong>
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                        <strong>Trạng thái đơn hàng: </strong>
                        <span style={{ color: '#2c72c6', fontWeight: '600' }}>Đang xử lý</span>
                    </p>
                    <p>
                        <strong>Phiên bản: </strong>
                        <span>Tiêu Chuẩn</span>
                    </p>
                    <p>
                        <strong>Số tiền đặt cọc: </strong>
                        <span>{customer.money} đồng</span>
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                        <strong>Phương thức thanh toán: </strong>
                        <span>{customer.payment}</span>
                    </p>
                    <p style={{ marginBottom: '15px' }}>Chúng tôi sẽ cập nhật tình trạng đơn hàng của Quý khách trong thời gian sớm nhất.</p>
                    <p style={{ marginBottom: '40px' }}>Trân trọng!</p>
                    <div className="group__button">
                        <Link to="/">Trở về trang chủ</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
        : <div className="depost__cars">
            <div className="container">
                <div className='depost__success row'>
                    <div className="depost__success__left l-6">
                        <div className="img">
                            <img src="http://localhost:3000/images/thanks-page.png" alt="thank-page" />
                        </div>
                    </div>
                    <div className="depost__success__right l-6">
                        <h2>Đặt hàng thất bại</h2>
                        <p>
                            Kính gửi Quý khách
                            <strong> {customer.nameText}</strong>
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            Quý khách đặt mua xe VinFast tại Vinfastauto.com chưa thành công!
                            <br />
                            Chúng tôi xin thông báo tình trạng đơn hàng của Quý khách:
                        </p>
                        <p>
                            <strong>Đơn hàng: </strong>
                            <strong>VinFast {customer.nameCar}</strong>
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>Trạng thái đơn hàng: </strong>
                            <span style={{ color: '#2c72c6', fontWeight: '600' }}>Chưa thánh toán thành công</span>
                        </p>
                        <p>
                            <strong>Phiên bản: </strong>
                            <span>Tiêu Chuẩn</span>
                        </p>
                        <p>
                            <strong>Số tiền đặt cọc: </strong>
                            <span>{customer.money} đồng</span>
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>Phương thức thanh toán: </strong>
                            <span>{customer.payment}</span>
                        </p>
                        <p style={{ marginBottom: '15px' }}>Xin quý khách liên hệ với chúng tôi nếu xảy ra bất kỳ sự cố nào.</p>
                        <p style={{ marginBottom: '40px' }}>Trân trọng!</p>
                        <div className="group__button">
                            <Link to="/">Trở về trang chủ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default DepostReturn
