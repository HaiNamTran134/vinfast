import React from 'react'

import { Link } from 'react-router-dom';

import './president3.scss'

const President3 = props => {

    const product = props.product;
    return (
        <section id="president-03">
            <div className="president__wrap">
                <img src={product.image3} alt="" />
                <div className="president__wrap__info">
                    <div className="container">
                        <ul>
                            <li>
                                <span className="top">Vô lăng cảm xúc</span>
                            <span className="bottom">{product.voLangCamXuc}</span>
                            </li>
                            <li>
                                <span className="top">Đa tiện ích thông minh</span>
                            <span className="bottom">{product.daTienIch}</span>
                            </li>
                            <li>
                                <span className="top">Giải trí cao cấp</span>
                            <span className="bottom">{product.giaiTri}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="president__wrap__info--bottom">
                    <div className="container">
                        <div className="row">
                            <div className="l-5">
                                <div className="group-title">
                                    <h3>Thiết kế nội thất</h3>
                                    <h2>
                                        {product.thietKeNoiThat}
                                        <br />
                                        {product.thietKeNoiThat2}
                                    </h2>
                                </div>
                            </div>
                            <div className="l-7">
                                <p>{product.thietKeNoiThat3}</p>
                                <div className="group__button">
                                    <Link to="/vinfast-cars-deposit">Mua ngay</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default President3
