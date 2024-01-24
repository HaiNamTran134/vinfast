import React from 'react';
import {useSelector} from 'react-redux'
import { Route, Routes, useNavigate} from 'react-router-dom';
import { selectUser } from '../redux/user/userSlice';
import Sidebar from '../components/admin/sidebar/Sidebar';
import TopNav from '../components/admin/topNav/TopNav';
import Customers from '../components/pages/admin/Customers';
import Dashboard from '../components/pages/admin/Dashboard';
import Account from '../components/pages/admin/Account';
import Products from '../components/pages/admin/Products';
import NewProduct from '../components/admin/new-product/NewProduct';
import NewAccount from '../components/admin/new-account/NewAccount';
import ProductDetail from '../components/admin/product-detail/ProductDetail';
import AccountDetail from '../components/admin/account-detail/AccountDetail';

import Banner from '../components/pages/admin/Banner';
import Newslide from '../components/admin/new-slide/Newslide';
import SlideDetail from '../components/admin/slide-detail/SlideDetail';  

import Block1 from '../components/pages/admin/Block1';
import Newblock1 from '../components/admin/new-block1/Newblock1';
import Block1Detail from '../components/admin/block1-detail/Block1Detail';

import Block2 from '../components/pages/admin/Block2';
import Newblock2 from '../components/admin/new-block2/Newblock2';
import Block2Detail from '../components/admin/block2-detail/Block2Detail';

import Block3 from '../components/pages/admin/Block3';
import Newblock3 from '../components/admin/new-block3/Newblock3';
import Block3Detail from '../components/admin/block3-detail/Block3Detail';

import Block4 from '../components/pages/admin/Block4';
import Newblock4 from '../components/admin/new-block4/Newblock4';
import Block4Detail from '../components/admin/block4-detail/Block4Detail';

import NotFound from '../components/user/not-found/NotFound';

const RouteAdmin = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    return (
        <>
            {
                user === undefined ? navigate('/login') : null
            }
            <div className='layout'>
                <Sidebar />
                <div className="layout__content">
                    <TopNav />
                    <div className="layout__content-main">
                        {
                            user && user.role === 'sell' ?
                                <Routes>
                                    <Route exact path='/customers' element={<Customers />} />
                                    
                                    <Route exact path='/homeslide' element={<Banner />} />
                                    <Route exact path='/homeslide/new-slide' element={<Newslide />} />
                                    <Route exact path='/homeslide/:id' element={<SlideDetail />} /> 

                                    <Route exact path='/homeblock1' element={<Block1 />} />
                                    <Route exact path='/homeblock1/new-block1' element={<Newblock1 />} />
                                    <Route exact path='/homeblock1/:id' element={<Block1Detail />} />

                                    <Route exact path='/homeblock2' element={<Block2 />} />
                                    <Route exact path='/homeblock2/new-block2' element={<Newblock2 />} />
                                    <Route exact path='/homeblock2/:id' element={<Block2Detail />} />

                                    <Route exact path='/homeblock3' element={<Block3 />} /> 
                                    <Route exact path='/homeblock3/new-block3' element={<Newblock3 />} />
                                    <Route exact path='/homeblock3/:id' element={<Block3Detail />} />

                                    <Route exact path='/homeblock4' element={<Block4 />} />
                                    <Route exact path='/homeblock4/new-block4' element={<Newblock4 />} />
                                    <Route exact path='/homeblock4/:id' element={<Block4Detail />} />

                                    <Route exact path='/' element={<Dashboard />} />
                                    <Route path='*' element={<NotFound />} />
                                </Routes> : null
                        }
                        {
                            user && user.role === 'admin' ?
                                <Routes>
                                    <Route exact path='/accounts' element={<Account />} />
                                    <Route exact path='/customers' element={<Customers />} />
                                    <Route exact path='/products' element={<Products />} />
                                    <Route exact path='/products/:id' element={<ProductDetail />} />
                                    <Route exact path='/accounts/:id' element={<AccountDetail />} />
                                    <Route exact path='/products/new_product' element={<NewProduct />} />
                                    <Route exact path='/accounts/new_account' element={<NewAccount />} />
                                    
                                    <Route exact path='/homeslide' element={<Banner />} />
                                    <Route exact path='/homeslide/new-slide' element={<Newslide />} />
                                    <Route exact path='/homeslide/:id' element={<SlideDetail />} /> 

                                    <Route exact path='/homeblock1' element={<Block1 />} />
                                    <Route exact path='/homeblock1/new-block1' element={<Newblock1 />} />
                                    <Route exact path='/homeblock1/:id' element={<Block1Detail />} />

                                    <Route exact path='/homeblock2' element={<Block2 />} />
                                    <Route exact path='/homeblock2/new-block2' element={<Newblock2 />} />
                                    <Route exact path='/homeblock2/:id' element={<Block2Detail />} />

                                    <Route exact path='/homeblock3' element={<Block3 />} /> 
                                    <Route exact path='/homeblock3/new-block3' element={<Newblock3 />} />
                                    <Route exact path='/homeblock3/:id' element={<Block3Detail />} />

                                    <Route exact path='/homeblock4' element={<Block4 />} />
                                    <Route exact path='/homeblock4/new-block4' element={<Newblock4 />} />
                                    <Route exact path='/homeblock4/:id' element={<Block4Detail />} />

                                    <Route exact path='/' element={<Dashboard />} />
                                    <Route path='*' element={<NotFound />} />
                                </Routes> : null
                        }
                    </div>
                </div>  
            </div>
        </>
    )
}

export default RouteAdmin
