import React, {useEffect, useState} from 'react';
import { Location, useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {selectUser } from '../../../redux/user/userSlice';
import customerApi from '../../../api/depost/customerApi';
import { TabTitle } from '../../../assets/setTitle'
import './order-detail.scss'
const OrderDetail = () => {
  TabTitle("Chi tiết đơn hàng | VinFast Online")

  const [customerData, setCustomerData] = useState([])

  const user = useSelector(selectUser);

  useEffect(() => {
    const getCustomerByEmail = async () => {
      try {
          const res = await customerApi.getByEmail(user.email)
          setCustomerData(res.data)
      } catch(err) {
          console.log(err)
      }
    }
    getCustomerByEmail()
  }, [user.email])

  const location = useLocation();
  const car = customerData.find(item => item.order_id === location.pathname.slice(36))

  return <div className='l-9 m-9 c-12 my__account'>
      { car ? <>
                <div className='my__account__info'>
                  <h1>Chi tiết đơn hàng </h1>
                  <span>{car.name_car}</span>
                </div>
                <div className="my__account__body">
                  <div className="container">
                    <div className="row">
                      <div className="l-6">
                        <div className="my__account__body__left">
                          <div className="note">
                            <p>Quý khách đã đặt mua thành công Xe này vào {car.published_at}.</p>
                            <p>Vui lòng đặt cọc <span>{car.money_deposit}</span> theo thông tin chuyển khoản và tải lên Ủy nhiệm chi tại đây hoặc tại Đơn hàng trong Tài Khoản Của Tôi để hoàn tất đơn hàng.</p>
                            <p>Nếu Vinfast Online không nhận được tiền cọc và Ủy nhiệm chi từ Quý khách, đơn hàng của Quý khách sẽ tự động bị hủy.</p>
                          </div>
                          <h2 className="title">Chi tiết đơn hàng</h2>
                          <div className="order__detail">
                            <table>
                              <tbody>
                                <tr>
                                  <th>
                                    <span>Mã đơn hàng</span>
                                  </th>
                                  <td>
                                    <span>{car.order_id}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Ngày đặt hàng</span>
                                  </th>
                                  <td>
                                    <span>{car.published_at}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Tình trạng thanh toán</span>
                                  </th>
                                  <td>
                                  {
                                      car.status === "pending" ? <span className="order order-warning">Chờ hoàn tất thủ tục đặt cọc</span> : null
                                  }
                                  {
                                      car.status === "accept" ? <span className="order order-success">Đặt hàng thành công</span> : null
                                  }
                                  {
                                      car.status === "reject" ? <span className="order order-danger">Đã hủy</span> : null
                                  }
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <h2 className="title">Thông tin bên mua</h2>
                          <div className="order__detail">
                            <table>
                              <tbody>
                                <tr>
                                  <th>
                                    <span>Ông / Bà</span>
                                  </th>
                                  <td>
                                    <span>Mr</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Họ và tên</span>
                                  </th>
                                  <td>
                                    <span>{car.name}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Căn cước công dân</span>
                                  </th>
                                  <td>
                                    <span>{car.cccd}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Quốc tịch</span>
                                  </th>
                                  <td>
                                    <span>Việt Nam</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Email</span>
                                  </th>
                                  <td>
                                    <span>{car.email}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Số điện thoại</span>
                                  </th>
                                  <td>
                                    <span>{car.phone}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <h2 className="title">Chi tiết thanh toán</h2>
                          <div className="order__detail">
                            <table>
                              <tbody>
                                <tr>
                                  <th>
                                    <span>Số tiền</span>
                                  </th>
                                  <td>
                                    <span>{car.money_deposit}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <span>Phương thức</span>
                                  </th>
                                  <td>
                                    <span>{car.note}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="l-6">
                        <div className="my__account__body__right">
                          <img src={car.image_car} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </> : null
      }
    </div>;
};

export default OrderDetail;
