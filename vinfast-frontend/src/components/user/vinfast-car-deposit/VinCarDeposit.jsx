import React, { useState, useEffect } from 'react'
import ProtoTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ThreeSixty from 'react-360-view'
import OrderLast from '../order-last/OrderLast'
import productDepositApi from '../../../api/depost/depositApi'

import './vin-car-deposit.scss'

const VinCarDetail = () => {

    const carFisrt = [17, 0, 6, 12, 25]

    const [container, setContainer] = useState([])
    const [postData, setPostData] = useState([])
    const [allCar, setAllCar] = useState([])

    const name = ['president', 'lux-sa', 'lux-a', 'fadil', 'vfe-34'];
    const nameTitle = ['PRESIDENT', 'LUX SA2.0', 'LUX A2.0', 'FADIL', 'VF e34'];

    const [type, setType] = useState('lux-sa')

    useEffect(() => {
        const getCarContainer = async () => {
            try {
                const res = await productDepositApi.getAllCarContainer()
                setContainer(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getCarContainer()
    }, [])

    useEffect(() => {
        const getCarDeposit = async () => {
            try {
                const res = await productDepositApi.getOneCar(type)
                setPostData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getCarDeposit()
    }, [type])


    useEffect(() => {
        const getAllCarDeposit = async () => {
            try {
                const res2 = await productDepositApi.getAllCarDeposit()
                setAllCar(res2.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAllCarDeposit()
    }, [])

    const [active, setActive] = useState(1);
    const [active2, setActive2] = useState(carFisrt[1]);
    const [active3, setActive3] = useState(0);

    let car = []
    if (allCar) {
        car = allCar.filter((item, index) => {
            return item.name === nameTitle[active]
        })
    }

    const li = () => {
        return (
            <ul>
                <li className="active" data="Đỏ" style={{ backgroundColor: 'rgb(199, 0, 0)' }}>0</li>
                <li className="" data="Xanh" style={{ backgroundColor: 'rgb(18, 42, 65)' }}>1</li>
                <li className="" data="Xám" style={{ backgroundColor: 'rgb(95, 99, 99)' }}>2</li>
                <li className="" data="Bạc" style={{ backgroundColor: 'rgb(153, 153, 153)' }}>3</li>
                <li className="" data="Đen" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>4</li>
                <li className="" data="Trắng" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>5</li>
            </ul>
        )
    }
    // console.log(car[active3])
    // console.log(car[active])
    return (
        <>
            <div className="vin__car__deposit">
                <ul className="vin__car__deposit__container">
                    {
                        container ? container.map((item, index) => (
                            <li
                                onClick={
                                    () => (setActive3(0), setActive2(carFisrt[index]), setActive(index), setType(name[index]))
                                }
                                className={`${index === active ? 'active' : ''}`}
                                key={index}>
                                <img src={item.container} alt="" />
                                <img src={item.containerActive} className="active" alt="" />
                                <h2>{name[index]}</h2>
                            </li>
                        )) : null
                    }
                </ul>
                <div className="vin__car__deposit__detail row">
                    <div className="vin__car__deposit__detail--left l-6">
                        {/* <img src={background} alt="" /> */}
                        {
                            allCar ? allCar.map((item, index) => (
                                <div key={index} className={active2 === parseInt(item.id) ? `${item.color2} check` : `${item.color2}`}>
                                    <ThreeSixty
                                        amount={36}
                                        imagePath={`./images/${item.slug}`}
                                        fileName="{index}.png"
                                    />
                                </div>
                            )) : null
                        }
                        <div className="images-360">
                            <img src="http://localhost:3000/images/360/360-images.png" alt="" />
                        </div>
                    </div>
                    <div className="vin__car__deposit__detail--right l-6">
                        <div className="group__name__title">
                            <h3>{nameTitle[active]}</h3>
                            <div className="amount">
                                <span>Giá bán </span>
                                <span>{car[active3] ? car[active3].price : 'Liên Hệ'} vnđ</span>
                            </div>
                            <div className="amount">
                                <span>Số tiền đặt cọc</span>
                                <span>{postData[active] ? postData[active].deposits : '50.000.000'} vnđ</span>
                            </div>
                        </div>
                        <div className="group__name__color">
                            <p className="select__color">Lựa chọn màu ngoại thất</p>
                            <ul>
                                {
                                    car ? car.map((item, index) => (
                                        <li onClick={() => (setActive2(parseInt(item.id)), setActive3(index))} className={active2 === parseInt(item.id) ? 'active' : ''} key={index} data={item.color} style={{ backgroundColor: `${item.colorCode}` }}>{index}</li>
                                    )) : li
                                }
                            </ul>
                            {
                                car[active3] ? <div className='colorName'>{car[active3].color}</div> : null

                            }
                            <p className="select__color">Lựa chọn màu nội thất</p>
                            <ul>
                                <li className="active">
                                    <img src="http://localhost:3000/images/thumb-MD04-PO21.jpg" alt="" />
                                </li>
                            </ul>
                            <div className="colorName">Da tiêu chuẩn</div>
                        </div>
                        <div className="detail__policy">
                            <Link to="http://localhost:3000/images/Bang-gia_T12-02.jpg" target="_blank">
                                Chi tiết chính sách bán hàng
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <OrderLast image_car={name[active] && car[active3] ? `http://localhost:3000/images/${name[active]}/${car[active3].color2}/2.png` : null} price={postData[active] ? postData[active].price : null} money_deposit={postData[active] ? postData[active].deposits : null} nameCar={nameTitle[active] ? nameTitle[active] : null} colorCar={car[active3] ? car[active3].color : null} />
        </>
    )
}

VinCarDetail.propTypes = {
    vincardeposit: ProtoTypes.object
}

export default VinCarDetail
