import React from 'react'
import ProtoTypes from 'prop-types'

// import { useDispatch } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react';

import President1 from '../president-01/President1'
import President2 from '../president-02/President2'
import President3 from '../president-03/President3'
import President4 from '../president-04/President4'
import President5 from '../president-05/President5'
import President6 from '../president-06/President6'

import './product-view.scss';
import { TabTitle } from '../../../assets/setTitle';


const ProductView = props => {

    // const dispatch = useDispatch()

    let product = props.product
    let president2 = props.president2
    switch (product ? product.slug : null) {
        case 'lux-sa':
            TabTitle("VinFast LUX SA2.0  - Bảng giá mới nhất, thông số, chương trình ưu đãi ,...")
            break;
        case 'lux-a':
            TabTitle("VinFast LUX A2.0  - Bảng giá mới nhất, thông số, chương trình ưu đãi ,...")
            break;
        case 'fadil':
            TabTitle("VinFast Fadil  - Bảng giá mới nhất, thông số, chương trình ưu đãi ,...")
            break;
        case 'president':
            TabTitle("VinFast President SUV V8 - Thông số, Bảng giá mới nhất")
            break;
        case 'vfe-34':
            TabTitle("VinFast VF-e34  - Bảng giá mới nhất, thông số, chương trình ưu đãi ,...")
            break;
        default:
            TabTitle("Trang chủ")
            break;
    }

    return (
        <div id="product">
            {/* <div className="product__title">{product ? product.title : ''}</div> */}
            <Swiper>
                <SwiperSlide>
                    {
                        product ? <President1 product={product} /> : ''
                    }
                </SwiperSlide>
                <SwiperSlide>
                    {
                        product ? <President2 president2={president2} product={product} /> : ''
                    }
                </SwiperSlide>
                <SwiperSlide>
                    {
                        product ? <President3 product={product} /> : ''
                    }
                </SwiperSlide>
                <SwiperSlide>
                    {
                        product ? <President4 product={product} /> : ''
                    }
                </SwiperSlide>
                <SwiperSlide>
                    {
                        product ? <President5 product={product} /> : ''
                    }
                </SwiperSlide>
                <SwiperSlide>
                    {
                        product ? <President6 product={product} /> : ''
                    }
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

ProductView.ProtoTypes = {
    product: ProtoTypes.object
}

export default ProductView