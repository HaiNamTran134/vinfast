import React from 'react'

import { Link } from 'react-router-dom';

import './president5.scss'

const President5 = props => {

    const product = props.product;
    
    const spanTopLeft = ['Dài x Rộng x Cao', 'Chiều dài cơ sở', 'Khoảng sáng gầm', 'Dung tích nhiên liệu', 'Mức tiêu thụ nhiên liệu'];
    const spanBottomLeft = [product.daiRongCao, product.chieuDai , product.khoangSang, product.dungTich, product.mucTieuThu];
    
    const spanTopRight = ['Động cơ', 'Công suất tối đa', 'Mô men xoắn cực đại', 'Hộp số', 'Dẫn động']
    const spanBottomRight = [product.dongcoBMW, product.congSuat, product.moMen, product.hopSo, product.danDong]
    
    return (
        <section id="president-05">
            <div className="president__wrap">
                <div className="president__wrap__left">  
                    <div className="container">
                        <div className="row">
                            <div className="l-12">
                                <div className="group__title">
                                    <h3>Vinfast lux SA2.0</h3>
                                    <h2>Thông số xe</h2>
                                </div>
                                <ul className="selectCarVersion">
                                    <li>Tiêu chuẩn</li>
                                    <li>Nâng cao</li>
                                    <li>Cao cấp</li>
                                </ul>
                            </div>
                            <div className="l-12">
                                <div className="row">
                                    <div className="l-7">
                                        <ul className="list__parameters">
                                            {
                                                spanBottomLeft.map((item, index) => (
                                                    <li key={index}>
                                                        <span className="top">{spanTopLeft[index]}</span>
                                                        <span className="bottom">{item}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="l-5">
                                        <ul className="list__parameters">
                                            {
                                                spanBottomRight.map((item, index) => (
                                                    <li key={index}>
                                                        <span className="top">{spanTopRight[index]}</span>
                                                        <span className="bottom">{item}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="president__wrap__right">
                    <img src={product.image5} alt="" />
                    <div className="group__button">
                        <Link to="/vinfast-cars-deposit">Mua ngay</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default President5
