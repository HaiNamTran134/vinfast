import React from 'react'

import { Link } from 'react-router-dom';

import './president6.scss'

const President6 = props => {

    const product = props.product;
    return (
        <section id="president-06">
            <div className="president__wrap">
                <img src={product.image6} alt="" />
                <div className="president__wrap__info">
                    <div className="container">
                        <div className="row">
                            <div className="l-12">
                                <div className="name">{product.title}</div>
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

export default President6
