import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom';
import productDepositApi from '../../../api/depost/depositApi';
import './president2.scss'


const President2 = props => {

    const product = props.product;
    const president2 = props.president2;
    console.log(product)
    const [active, setActive] = useState(0);
    const [allCar, setAllCar] = useState([])
    useEffect(() => {
        const getAllCarDeposit = async () => {
            try {
                const res2 = await productDepositApi.getAllCarDeposit()
                setAllCar(res2.data)
            } catch(err) {
                console.log(err)
            }
        }
        getAllCarDeposit()
    }, [])
    
    let car = []
    if (allCar) {
        car = allCar.filter((item, index) => {
            return item.slug.split("/")[1] === product.slug
        })
    }
    
    const [background, setBackground] = useState(president2[0] ? president2[0].image : '')
    
    return (
        <section id="president-02">
            <div className="president__wrap">
                <div className="president__wrap__info">
                    <div className="container">
                        <div className="row">
                            <div className="l-12 m-12 c-12">
                                <div className="president__wrap__info--group">
                                    <div className="parameter">
                                        <span>Động cơ BMW</span>
                                        {product.dongcoBMW}
                                    </div>
                                    <div className="parameter">
                                        <span>Công suất</span>
                                        {product.congSuat}
                                    </div>
                                    <div className="parameter">
                                        <span>Hộp số tự động</span>
                                        {product.hopSo}
                                    </div>
                                </div>
                                <div className="img">
                                    <img src={background} alt="" />
                                </div>
                                <div className="president__wrap__info--color">
                                    <div className="label">Chọn màu xe</div>
                                    <ul>
                                        {
                                            car.map((item, index) => (
                                                <li onClick={() => (setBackground(item.image), setActive(index))} key={index} data={item.color} style={{backgroundColor: `${item.colorCode}`, color: `${item.colorCode}`}} className={`${index === active ? 'active' : ''}`}></li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="president__wrap__info--bottom">
                        <div className="container">
                            <div className="row">
                                <div className="l-5 c-12 m-5">
                                    <div className="group-title">
                                        <h3>Thiết kế ngoại thất</h3>
                                        <h2>
                                            {product.thietkeNgoaiThat}
                                            <br />
                                            {product.thietkeNgoaiThat2}
                                        </h2>
                                    </div>
                                </div>
                                <div className="l-7 c-12 m-7">
                                    <p>{product.thietkeNgoaiThat3}</p>
                                    <div className="group__button">
                                        <Link to="/vinfast-cars-deposit">Mua ngay</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>    
    )
}

export default President2
