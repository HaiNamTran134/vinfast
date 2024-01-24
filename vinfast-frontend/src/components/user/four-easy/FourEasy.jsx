import React from 'react'

import './four-easy.scss'
const FourEasy = () => {

    const four_easy = ['http://localhost:3000/images/login-register.png', 'http://localhost:3000/images/order.png', 'http://localhost:3000/images/payment-method.png', 'http://localhost:3000/images/showroom.png'];
    const four_desc_top = ['Đăng nhập / đăng ký', 'Đặt mua', 'Chọn phương thức thanh toán', 'Đến Showroom kiểm tra']
    const four_desc_bottom = ['& Lựa chọn xe', '& Chọn Showroom nhận xe', '(COD, trả trước, trả góp 0%)', '& nhận xe']
    return (
        <div className='four__easy text-center'>
            <h1 className='title'>4 BƯỚC ĐƠN GIẢN MUA ONLINE</h1>
            <div className="container">
                <div className="row">
                    {
                        four_easy.map((item, index) => (
                            <div className="l-3">
                                <img src={item} alt="index" />
                                <div className="desc">
                                    <span>
                                        {four_desc_top[index]}
                                        <br />
                                        {four_desc_bottom[index]}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default FourEasy
