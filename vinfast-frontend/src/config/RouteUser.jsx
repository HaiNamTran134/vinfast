import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from '../components/user/header/Header';
import Footer from '../components/user/footer/Footer';
import Home from '../components/pages/user/Home';
import Car from '../components/pages/user/Car';
import Bike from '../components/pages/user/Bike';
import Service from '../components/pages/user/Service';
import Blog from '../components/pages/user/Blog';
import Login from '../components/login/Login';
import Signin from '../components/signin/Signin';
import Product from '../components/pages/user/Product';
import DepostReturn from '../components/user/depost-return/DepostReturn';
import NewPost from '../components/user/new-post/NewPost';
import MyPost from '../components/user/my-post/MyPost';
import BlogDetail from '../components/user/blog-detail/BlogDetail';
import PostEdit from '../components/user/post-edit/PostEdit';
import MyAccount from '../components/user/my-account/MyAccount';
import SidebarUser from '../components/user/sidebar-user/SidebarUser';
import TransactionHistory from '../components/user/transaction-history/TransactionHistory';
import { useLocation } from 'react-router-dom';
import NotFound from '../components/user/not-found/NotFound'
import OrderDetail from '../components/user/order-detail/OrderDetail';
const RouteUser = () => {
    const location = useLocation();
    return (
        <>
            <Header />
            {
                location.pathname.slice(0, 9) === '/settings' ?
                    <div className='account__page'>
                        <div className="container">
                            <div className="row">
                                <SidebarUser />
                                <Routes>
                                    <Route path='/settings/thong-tin-ca-nhan' element={< MyAccount />} />
                                    <Route path='/settings/lich-su-giao-dich' element={<TransactionHistory />} />
                                    <Route path='/settings/gio-hang' element={< TransactionHistory />} />
                                    <Route path='/settings/me/my-post' element={<MyPost />} />
                                    <Route path='/settings/don-hang/chi-tiet/orderID=:id' element={<OrderDetail />} />
                                </Routes>
                            </div>
                        </div>
                    </div> : <Routes>
                        <Route path='/vinfast-cars-deposit' element={<Car />} />
                        <Route path='/vinfast-bike' element={<Bike />} />
                        <Route path='/uu-dai' element={<Service />} />
                        <Route path='dich-vu' element={<Service />} />
                        <Route path='/blog' element={<Blog />} />
                        <Route path='/new-post' element={<NewPost />} />
                        <Route path='/login' element={< Login />} />
                        <Route path='/signin' element={< Signin />} />
                        <Route path='/dat-coc' element={<DepostReturn />} />
                        <Route path='/blog/:id' element={<BlogDetail />} />
                        <Route path='/post/:id/edit' element={<PostEdit />} />
                        <Route path='/catalog/:slug' element={<Product />} />
                        <Route path='/' element={<Home />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
            }

            <Footer />
        </>
    )
}

export default RouteUser
