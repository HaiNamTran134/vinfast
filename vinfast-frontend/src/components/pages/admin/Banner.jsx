import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from '../../admin/table/Table'

import productApi from '../../../api/admin/productApi'

const productTableHead = [
    '',
    'placement',
    'banner',
    'action',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.placement}</td>
        <td style={{width: '12%'}}>
            <img src={item.banner} alt="" />
        </td>
        <td>
            <Link to={`/admin/homeslide/${item.id}`}>
                <i className="fas fa-external-link"></i>
                <span className="action">Detail</span>
            </Link>
        </td>
    </tr>
)

const Products = () => {

    const [productsData, setProductsData] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await productApi.getAllBanner()
                setProductsData(res.data)
                setRender(true)
            } catch(err) {
                console.log(err)
            }
        }
        getProductApi()
    }, [])
    return (
        <>
            <h2 className="page-header page-header--product">
                <p>Banner list</p>
                <Link to="/admin/homeslide/new-slide">
                    <button className="productAddButton">Create</button>
                </Link>
            </h2>
            <div className="row">
                <div className="l-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                render && <Table 
                                            limit='3'
                                            headData={productTableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={productsData}
                                            renderBody={(item, index) => renderBody(item, index)}
                                        />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
