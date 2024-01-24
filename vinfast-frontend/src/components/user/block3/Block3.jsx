import React, {useState, useEffect} from 'react'
import ProtoTypes from 'prop-types'
import { Link } from 'react-router-dom';

import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import block3Api from '../../../api/home/block3Api'

import 'swiper/swiper-bundle.css'

import './block3.scss'

const Block3 = () => {

    const [block3Data, setBlock3Data] = useState([])

    useEffect(() => {
        const getBlock3 = async () => {
            try {
                const res = await block3Api.getAll()
                setBlock3Data(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getBlock3()  
    }, [])

    return (
        <div className="block3">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0}
                    pagination={{ clickable: true }}
                    slidesPerView={4}
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
                        block3Data ? block3Data.map((item, index) => (
                            <SwiperSlide  key={index}>
                                <Link to={`/catalog/${item.slug}`}>
                                    <Block3Item item={item} />
                                </Link>
                            </SwiperSlide>
                        )) : null
                    }
            </Swiper>
        </div>
    )
}

Block3.prototype = {
    data: ProtoTypes.array.isRequired
}

const Block3Item = props => (
    <div className="info">
        <div className="info__body">
            <div className="info__body--dongxe">{props.item.dongxe}</div>
            <div className="info__body--slogan">{props.item.slogan}</div>
            <div className="info__body--name">{props.item.name}</div>
        </div>
        <img className="swiper-lazy swiper-lazy-loaded" src="http://localhost:3000/images/vinfast-data-01/bg-title-car.png" alt="" />
        <div className="info__body">
            <div className="info__body--body">
                <div className="info__body--desc">{props.item.description1}</div>
                <div className="info__body--desc">{props.item.description2}</div>
                <div className="info__body--desc">{props.item.description3}</div>
                <div className="info__body--desc">{props.item.description4}</div>
            </div>
        </div>
        <div className="img">
            <div className="img__lienket">
                Chi tiết
                <img className="swiper-lazy swiper-lazy-loaded" src="http://localhost:3000/images/vinfast/logo_gray.svg" alt="" />
            </div>
            <img src={props.item.image} alt="" />
        </div>
    </div>
)

export default Block3
