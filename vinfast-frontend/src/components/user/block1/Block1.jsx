import React, {useState, useEffect} from 'react'
import ProtoTypes from 'prop-types'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import block1Api from '../../../api/home/block1Api'

import 'swiper/swiper-bundle.css'

import './block1.scss'

SwiperCore.use([Navigation, Pagination])

const Block1 = () => {

    const [block1Data, setBlock1Data] = useState([])
    useEffect(() => {
        
        const getBlock1 = async () => {
            try {
                const res = await block1Api.getAll()
                setBlock1Data(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getBlock1()
    }, [])

    return (
        <div className="block1">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                pagination={{ clickable: true }}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {
                    block1Data ? block1Data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Block1Item item={item} />
                        </SwiperSlide>
                    )) : null
                }
            </Swiper>
        </div>
    )
}

Block1.prototype = {
    data: ProtoTypes.array.isRequired
}

const Block1Item = props => (
    
    <div className="block1__item">
        <div className="block1__item__image">
            <img src={props.item.image} alt="" height="501px"/>
        </div>
        <div className="block1__item__info">
            <div className="block1__item__info--title">
                <span>{props.item.title}</span>
            </div>
            <div className="block1__item__info--description">
                <span>{props.item.description}</span>
            </div>
        </div>
    </div>
)

export default Block1
