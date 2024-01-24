import React from 'react';
import { Link } from 'react-router-dom';

import './not-found.scss'
import { TabTitle } from '../../../assets/setTitle';
const NotFound = () => {

  TabTitle("Trang này không tồn tại")
//   if (document.title === "Trang này không tồn tại") {
//     document.body.classList.add("stop-scrolling")
//   } else {
//     document.body.classList.remove("stop-scrolling");
// }
  return <div className='container'>
    <div className="not__found">
      <div className="not__found__error"> </div>
      <h1 className='not__found__title'>Trang này không tồn tại</h1>
      <ul>
        <li>Hãy thử tải lại trang, sự cố này có thể chỉ là tạm thời.</li>
        <li>Nếu bạn nhập địa chỉ theo cách thủ công, hãy kiểm tra lại xem có chính xác không(?)</li>
      </ul>
      <p className='not__found__button'>
        <Link to='/'>Quay về trang chủ</Link>
      </p>
    </div>
  </div>;
};

export default NotFound;
