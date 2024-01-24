import React, {useState, useEffect} from 'react'
import ProtoTypes from 'prop-types'
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import block2Api from '../../../api/home/block2Api'
import 'swiper/swiper-bundle.css'

import './block2.scss';

const Block2 = props => {
    const [block2Data, setBlock2Data] = useState([])
    useEffect(() => {
        const getBlock2 = async () => {
            try {
                const res = await block2Api.getAll()
                setBlock2Data(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getBlock2()
    }, [])

    return (
        <>
            <div className='block2'>
                <div className="block2__title">
                    <h2>Hành trình chinh phục thế giới</h2>
                </div>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    autoplay={{delay: 5000}}
                >
                    {
                        block2Data ? block2Data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Block2Item item={item} />
                            </SwiperSlide>
                        )) : null
                    }
                </Swiper>
            </div>
            <div className="block3__title">Xe ô tô</div>
        </>
    )
}

Block2.prototype = {
    data: ProtoTypes.array.isRequired
}

const Block2Item = props => (
    <div className="block2__item">
        <div className="block2__item__quote">{props.item.quote}</div>
        <div className="block2__item__author">{props.item.author}</div>
    </div>
)

export default Block2
