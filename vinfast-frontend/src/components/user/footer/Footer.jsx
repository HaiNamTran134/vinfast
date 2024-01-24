import React from 'react'

import { Link } from 'react-router-dom'

import './footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <Link to="/" className="logo">
                        <img src="http://localhost:3000/images/vinfast-data-01/logo_1627445467.png" alt="" />
                    </Link>
                </div>
                <div className="footer__content__menus row">
                    <div className="footer__content__menu l-2 m-4 c-12">
                        <h3>Giới thiệu</h3>
                        <ul>
                            <li>Về VinFast</li>
                            <li>Về Vingroup</li>
                            <li>Về Investor</li>
                        </ul>
                    </div>
                    <div className="footer__content__menu l-2 m-4 c-12">
                        <h3>Xe ô tô</h3>
                        <ul>
                            <li>VF e34</li>
                            <li>President</li>
                            <li>LUX SA2.0</li>
                            <li>LUX A2.0</li>
                            <li>Fadil</li>
                        </ul>
                    </div>
                    <div className="footer__content__menu l-2 m-4 c-12">
                        <h3>Xe máy điện</h3>
                        <ul>
                            <li>Theon</li>
                            <li>Klara A2</li>
                            <li>Klara S</li>
                            <li>Feliz</li>
                            <li>Ludo</li>
                        </ul>
                    </div>
                    <div className="footer__content__menu l-2 m-4 c-12">
                        <h3>Tin tức nổi bật</h3>
                        <ul>
                            <li>Ưu đãi</li>
                            <li>Công ty</li>
                            <li>Cộng đồng</li>
                        </ul>
                    </div>
                    <div className="footer__content__menu l-2 m-4 c-12">
                        <h3>Hỗ trợ</h3>
                        <ul>
                            <li>Câu hỏi thường gặp</li>
                            <li>Hướng dẫn sử dụng</li>
                            <li>Hệ thống phân phối</li>
                            <li>Liên hệ</li>
                            <li>Đặt lịch bảo dưỡng</li>
                        </ul>
                    </div>
                    <div className="footer__content__menu l-2 m-4 c-12">
                        <h3>Pháp lý</h3>
                        <ul>
                            <li>Chính sách quyền riêng tư</li>
                            <li>Chính sách vận chuyển</li>
                            <li>Chính sách đổi trả</li>
                            <li>Miễn trừ trách nhiệm</li>
                            <li>Điều khoản ký kết thỏa thuận đặt cọc mua Ô tô VF</li>
                            <li>Điều kiện sử dụng cookies</li>
                        </ul>
                    </div>
                </div>
                <div className="footer__content__copyright">
                    <div className="footer__content__menus">
                        <h3>Hệ sinh thái</h3>
                        <ul>
                            <li>Vinhomes</li>
                            <li>Vinmec</li>
                            <li>Vsmart</li>
                            <li>Vinpearl</li>
                        </ul>
                    </div>
                    <div className="footer__content__copyright--right">
                        <img src="http://localhost:3000/images/vinfast-data-01/bocongthuong_otm.webp" alt="Bộ công thương" />
                    </div>
                </div>
                <div className="footer__content__bottom">
                    <div className="row">
                        <div className="l-6">
                            <div className="hotline">
                                <p className="title">Hotline & Customer Service</p>
                                <Link to="tel:1000 23 23 98">
                                    <i className='fas fa-phone-alt'></i>
                                    <div className="btn">
                                        1900 23 23 89
                                        <span>( 1000đ/phút )</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="social">
                                <span>Kết nối với VinFast</span>
                                <Link to="/" className="social__item">
                                    <i className="fab fa-facebook"></i>
                                </Link>
                                <Link to="/" className="social__item">
                                    <i className="fab fa-facebook"></i>
                                </Link>
                                <Link to="/" className="social__item">
                                    <i className="fab fa-youtube"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
