import React from 'react'

import { Link } from 'react-router-dom';

import './president1.scss'

const President1 = props => {

    const product = props.product;
    return (
        <section id="president-01">
            <div className="president__wrap">
                <img src={product.image1} alt="" />
                <div className="president__wrap__info">
                    <div className="container">
                        <div className="row">
                            <div className="l-12 m-12 c-12">
                                <div className="president__wrap__info--group">
                                    <div className="parameter">
                                        <span>Động cơ BMW</span>
                                        {product.dongcoBMW}
                                    </div>
                                    <div className="parameter">
                                        <span>Hộp số tự động</span>
                                        {product.hopSo}
                                    </div>
                                    <div className="parameter">
                                        <span>Cảm giác lái</span>
                                        {product.camGiacLai}
                                    </div>
                                </div>
                            </div>
                                <div className="l-2 m-12 c-12 group__button">
                                    <Link to="/vinfast-cars-deposit">Mua ngay</Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default President1
