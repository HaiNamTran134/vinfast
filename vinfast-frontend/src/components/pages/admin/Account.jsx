import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from '../../admin/table/Table'
import accountApi from '../../../api/account'

const loginTableHead = [
    '',
    'avatar',
    'name',
    'email',
    'password',
    'role',
    'action',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index}</td>
        <td>
            <img src={item.avatar} alt="" />
        </td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>{item.role}</td>
        <td>
            <Link to={`/admin/accounts/${item.id}`}>
                <i className="fas fa-external-link"></i>
                <span className="action">Detail</span>
            </Link>
        </td>
    </tr>
)

const Products = () => {

    const [accountData, setAccountData] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
        const getAccountApi = async () => {
            try {
                const res = await accountApi.getAll()
                setAccountData(res.data)
                setRender(true)
            } catch(err) {
                console.log(err)
            }
        }
        getAccountApi()
    }, [])
    return (
        <>
            <h2 className="page-header page-header--product">
                <p>Account list</p>
                <Link to="/admin/accounts/new_account">
                    <button className="productAddButton">Create</button>
                </Link>
            </h2>
            <div className="row">
                <div className="l-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                render && <Table 
                                            limit='10'
                                            headData={loginTableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={accountData}
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
