import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectUser } from '../../../redux/user/userSlice';
import customerApi from '../../../api/depost/customerApi';
import { TabTitle } from '../../../assets/setTitle'

import './transaction-history.scss'
const TransactionHistory = () => {

    TabTitle("Giỏ hàng của tôi VinFast Online")

    const user = useSelector(selectUser);
    
    const [customerData, setCustomerData] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const [render, setRender] = useState(false)
    console.log(currentId)
    useEffect(() => {
      const getCustomerByEmail = async () => {
        try {
            const res = await customerApi.getByEmail(user.email)
            setCustomerData(res.data)
            setRender(false)
        } catch(err) {
            console.log(err)
        }
      }
      getCustomerByEmail()
    }, [user.email,currentId, render])
    
    const handleSubmitReject = async (id) => {
      const formData = {
          id : id,
          status: "reject"
      }
      const updateCustomer = async () => {
          try {
              const res = await customerApi.update(formData)
              alert("Hủy đơn hàng thành công")
              setRender(true)
              console.log(res)
          } catch(err) {
              console.log(err)
          }
      }
      updateCustomer()
  }

    return <div className='l-9 m-9 c-12 my__account'>
      <div className='my__account__info'>
        <h1>Lịch sử giao dịch</h1>
      </div>
      <div className="my__account__body">
        <div className="container">
            <div className="row">
              {
                customerData ? customerData.map((item, index) => (
                  <div className="product__detail l-12 m-12 c-12" key={index}>
                    <div className="row">
                      <div className="l-2">{item.published_at}</div>
                      <div className="name-img l-4">
                        <div className='img'>
                          <img src={item.image_car} alt="" />
                        </div>
                        <div className="name">
                          <div className="name__title">Xe ô tô</div>
                          {item.name_car}
                        </div>
                      </div>
                      <div className="l-4">
                        {
                          item.status === 'pending' ? <>
                                                      <div className='product__status'>Chờ hoàn tất thủ tục đặt cọc</div>
                                                      <div className='button'>
                                                        <button onClick={() => (handleSubmitReject(item.id), setCurrentId(item.id))}>Hủy đơn hàng</button>
                                                      </div>
                                                    </> : null
                        }
                        {
                          item.status === 'reject' ? <div className='product__status'>Đã hủy</div> : null
                        }
                        {
                          item.status === 'accept' ? <div className='product__status'>Đặt hàng thành công</div> : null
                        }
                      </div>
                      <div className="detail l-2">
                        <Link to={`/settings/don-hang/chi-tiet/orderID=${item.order_id}`}>Chi tiết</Link>
                      </div>
                    </div>
                  </div>
                )) : null
              }
          </div>
        </div>
      </div>
  </div>;
};

export default TransactionHistory;
