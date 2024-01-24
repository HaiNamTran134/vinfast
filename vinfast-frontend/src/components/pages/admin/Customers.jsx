import React, {useState, useEffect} from 'react'
// import Pusher from 'pusher-js'
import ExportReactCSV from '../../admin/ExportReactCSV'
import Table from '../../admin/table/Table'
import customerApi from '../../../api/depost/customerApi'
import '../../admin/customer-detail/customer-detail.scss'

const customerTableHead = [
    'order id',
    'name car',
    'color car',
    'money deposit',
    'price',
    'name',
    'phone',
    'Căn cước',
    'email',
    'province',
    'note',
    'Image',
    'create at',
    'status'
]

const Customers = () => {

    const [active, setActive] = useState(false)
    const [id, setId] = useState(134)
    const [customerData, setCustomerData] = useState([])
    const [customerOneData, setCustomerOneData] = useState([])

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index} onClick={(e) => (setActive(true), setId(item.id))}>
            <td>{item.order_id}</td>
            <td>{item.name_car}</td>
            <td>{item.color_car}</td>
            <td>{item.money_deposit}</td>
            <td>{item.price ? new Intl.NumberFormat('en').format(item.price) + 'đ' : 0}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.cccd}</td>
            <td>{item.email}</td>
            <td>{item.province}</td>
            <td>{item.note}</td>
            <td>
                <img src={item.file} alt="" />
            </td>
            <td>{item.published_at}</td>
            <td>
                {
                    item.status === "pending" ? <span className="badge badge-warning">{item.status}</span> : null
                }
                {
                    item.status === "accept" ? <span className="badge badge-success">{item.status}</span> : null
                }
                {
                    item.status === "reject" ? <span className="badge badge-danger">{item.status}</span> : null
                }
            </td>
        </tr>
    )

    const [reRender, setReRender] = useState(false)
    const [clickRender, setClickRender] = useState(false)
    const handleSubmitAccept = async (e) => {
        e.preventDefault();

        const formData = {
            id : id,
            status: "accept"
        }
        const updateCustomer = async () => {
            try {
                const res = await customerApi.update(formData)
                alert("Cập nhật thành công")
                setClickRender(true)
                setReRender(false)
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        updateCustomer()
        setActive(false)
    }

    const handleSubmitReject = async (e) => {
        e.preventDefault();

        const formData = {
            id : id,
            status: "reject"
        }
        const updateCustomer = async () => {
            try {
                const res = await customerApi.update(formData)
                alert("Cập nhật thành công")
                setClickRender(true)
                setReRender(false)
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        updateCustomer()
        setActive(false)
    }

    const CustomerDetail = () => {
        const detail = [
            {
                header: 'Order id',
                body: customerOneData.order_id
            },
            {
                header: 'Name car',
                body: customerOneData.name_car
            },
            {
                header: 'Color car',
                body: customerOneData.color_car
            },
            {
                header: 'Money deposit',
                body: customerOneData.money_deposit
            },
            {
                header: 'Price',
                body: customerOneData.price
            },
            {
                header: 'Name',
                body: customerOneData.name
            },
            {
                header: 'Phone',
                body: customerOneData.phone
            },
            {
                header: 'Căn cước',
                body: customerOneData.cccd
            },
            {
                header: 'Email',
                body: customerOneData.email
            },
            {
                header: 'Province',
                body: customerOneData.province
            },
            {
                header: 'Note',
                body: customerOneData.note
            },
            {
                header: 'Create at',
                body: customerOneData.published_at
            },
        ]
        return <div className='customer__detail'>
            <div className="customer__detail__header">
                <h1>Review detail</h1>
                <div className="close" onClick={(e) => setActive(false)}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </div>
            </div>
            <div className="customer__detail__content">
                <div className="row">
                    {
                        detail.map((item, index) => (
                            <div className="l-6" key={index}>
                                <div className="wrapper">
                                    <div className='head'>{item.header}</div>
                                    <div className="body">{item.body}</div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="l-12">
                        <div className="wrapper">
                            <div className='head'>Image</div>
                            <div className="body">
                                <img src={customerOneData.file} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="customer__detail__footer">
                {
                    customerOneData.status === "pending" ? <div className="l-12 customer__detail__status">
                        <button onClick={handleSubmitAccept} className="button">
                            <span>
                                <svg className="MuiSvgIcon-root MuiSvgIcon-colorPrimary" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{paddingRight: '0.5em', color: 'green'}}>
                                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>
                                </svg>
                                Accept
                            </span>
                        </button>
                        <button onClick={handleSubmitReject} className="button">
                            <span>
                                <svg className="MuiSvgIcon-root MuiSvgIcon-colorPrimary" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{paddingRight: '0.5em', color: 'red'}}>
                                    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>
                                </svg>
                                Reject
                            </span>
                        </button>
                    </div> : null
                }
            </div>
        </div>;
    };
    
    useEffect(() => {
        const getCustomerApi = async () => {
            try {
                const res = await customerApi.getAll()
                setCustomerData(res.data)
                setReRender(true)
                setClickRender(false)
            } catch(err) {
                console.log(err)
            }
        }
        getCustomerApi()
    }, [clickRender])

    useEffect(() => {
        const getOneCustomerApi = async () => {
            try {
                const res = await customerApi.getOne(id)
                setCustomerOneData(res.data)
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        getOneCustomerApi() 
    }, [id, clickRender])
    console.log(customerOneData)
    return (
        <>
            <h2 className="page-header page-header--product">
                <p>Customers</p>
                <span className='page-header--export productAddButton'>
                    <ExportReactCSV csvData={customerData} fileName="Customers" />
                </span>
            </h2>
            <div className="page-body">
                <div className="row">
                    <div className="l-12">
                        <div className="card">
                            <div className="card__body">
                                {
                                    reRender && <Table 
                                                    limit='10'
                                                    headData={customerTableHead}
                                                    renderHead={(item, index) => renderHead(item, index)}
                                                    bodyData={customerData}
                                                    renderBody={(item, index) => renderBody(item, index)}
                                                />
                                }
                            </div>
                        </div>
                    </div>
                </div>
               {active ? <CustomerDetail /> : null}
            </div>
        </>
    )
}

export default Customers
