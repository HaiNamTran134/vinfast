import React, {useState, useEffect} from 'react'
import SwiperCore, {Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 

import vinSlideApi from '../../../api/home/vinSlideApi';

import './vin-slide.scss';

const VinSlide = () => {

    const [bannerData, setBannerData] = useState([])
    useEffect(() => {
        const getVinSlideApi = async () => {
            try {
                const res = await vinSlideApi.getAll()
                setBannerData(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getVinSlideApi()            
    }, [])

    SwiperCore.use([Autoplay]);

    return (
        <div className="vinfast-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {
                   bannerData ? bannerData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="vinfast-slide__item">
                                <img src={item.banner} alt="" width="100%"/>
                            </div>
                        </SwiperSlide>
                    )) : null
                }
            </Swiper>
            <div className="sr-mb">
                <div className="slide__content">
                    <div className="slide__title">
                        <h2>
                            Cùng bạn
                            <br />
                            bứt phá mọi giới hạn
                        </h2>
                    </div>
                    <div className="slide__des">
                        <p>Vượt tầm nhìn toàn cầu, VinFast sáng tạo không ngừng nghỉ 
                            để mang lại những sản phẩm đẳng cấp, trải nghiệm thông 
                            minh và giá trị vượt trội cho khách hàng.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VinSlide
