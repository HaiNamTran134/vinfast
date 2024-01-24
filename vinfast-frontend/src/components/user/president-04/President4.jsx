import React, { useState, useEffect } from 'react'
import president4Api from '../../../api/president4Api'
import './president4.scss'

const President4 = props => {

    const product = props.product;
    
    
    const [president4, setPresident4] = useState([]);
    const [active, setActive] = useState(0);
    
    const [background, setBackground] = useState()
    useEffect(() => {
        const getPresident4 = async () => {
            try {
                const res = await president4Api.getAll()
                setPresident4(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getPresident4()  
    }, [])

    console.log(president4)
    console.log(background)
    return (
        <section id="president-04">
            <div className="president__wrap">
                <div className="row">
                    <div className="l-8">
                        {/* <div style={{backgroundImage: `url(${background})`}}></div> */}
                        <img src={background || "http://localhost:3000/images/lux-sa/4.1.jpg"} alt="" />
                    </div>
                    <div className="l-4">
                        <div className="container">
                            <div className="row">
                                <div className="l-12 m-12 c-12">
                                    <div className="group__title">
                                        <h3>ĐỘNG CƠ & CÔNG NGHỆ</h3>
                                        <h2>{product.dongCoCN}</h2>
                                        <p>{product.dongCoCN1}</p>
                                    </div>
                                </div>
                                <div className="l-12 m-12 c-12">
                                    <ul>
                                        {
                                            president4 ? president4.map((item, index) => (
                                                <li onClick={() => (setBackground(item.image), setActive(index))} key={index} className={`${index === active ? 'active' : ''}`}>{`${item.dongCo}`}</li>
                                            )) : null
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default President4
