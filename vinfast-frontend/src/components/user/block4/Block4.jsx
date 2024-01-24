import React, {useState, useEffect} from 'react'
import ProtoTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import block4Api from '../../../api/home/block4Api';

import 'swiper/swiper-bundle.css'
import './block4.scss'

const Block4 = () => {

    const [block4Data, setBlock4Data] = useState([])

    useEffect(() => {
        const getBlock4 = async () => {
            try {
                const res = await block4Api.getAll()
                setBlock4Data(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getBlock4() 
    }, [])

    return (
        <div className="block4">
            <div className="block4__title">Xe máy điện</div>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    autoplay={{delay: 5000}}
                    breakpoints={{
                        "360": {
                            "slidesPerView": 1,
                          },
                        "576": {
                          "slidesPerView": 1,
                        },
                        "768": {
                          "slidesPerView": 2,
                        },
                        "992": {
                          "slidesPerView": 3,
                        },
                        "1200": {
                            "slidesPerView": 4,
                          }
                    }}
                >
                    {
                        block4Data ? block4Data.map((item, index) => (
                            <SwiperSlide  key={index}>
                                <Link to="/">
                                    <Block4Item item={item} />
                                </Link>
                            </SwiperSlide>
                        )) : null
                    }
                </Swiper>
        </div>
    )
}

Block4.prototype = {
    data: ProtoTypes.array.isRequired
}

const Block4Item = props => (
    <div className="info">
        <div className="img">
            <img src={props.item.image} alt="" />
            <div className="name">{props.item.name}</div>
        </div>
        <div className="info__body">
            <div className="info__body--slogan">{props.item.slogan}</div>
            <div className="info__body--descs">
                <div className="info__body--desc">{props.item.description1}</div>
                <div className="info__body--desc">{props.item.description2}</div>
                <div className="info__body--desc">{props.item.description3}</div>
                <div className="info__body--desc">{props.item.description4}</div>
            </div>
        </div>
    </div>
)

export default Block4
