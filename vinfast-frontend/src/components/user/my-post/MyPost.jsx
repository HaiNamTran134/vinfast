import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../../../redux/user/userSlice';
import postApi from '../../../api/postApi'
import Pagination from '../pagination/Pagination';
import { TabTitle } from '../../../assets/setTitle'
import './my-post.scss'

const MyPost = () => {

    TabTitle("Bài viết của tôi tại VinFast")
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([])
    const [show, setShow] = useState(false)
    const [active, setActive] = useState(0)
    const [reRender, setReRender] = useState(true)
    const [render, setRender] = useState(false)

    const renderBody = (item, index) => (
        <div className='l-6 post' key={index}>
            <div className="post__test">
                <div className="post__image">
                    <img className="img" src={item.picture} alt="" />
                </div>
                <div className="post__footer">
                    <div className='post__footer__name'>
                        <p className="post__name">
                            Ngày đăng 
                            <span className="post__published">{item.published_at}</span>
                        </p>
                        <div>
                            <div onClick={(e) => (setShow(!show) , setActive(index))} className="dots">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-h" className="svg-inline--fa fa-ellipsis-h fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                                </svg>
                                {
                                    show ? <ul className= { index === active ? 'active' : ''}>
                                                <li>
                                                    <Link to={`/post/${item.id}/edit`}>Chỉnh sửa</Link>
                                                </li>
                                                <li>
                                                    <p onClick={(e) =>handleDelete(e, item.id)}>Xóa</p>
                                                </li>
                                            </ul> : null
                                }
                            </div>
                            
                        </div>
                    </div>
                    <Link to={`/blog/${item.id}`}>
                        <h5 className="post__title">{item.title}</h5>
                    </Link>
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        setReRender(true)
        const getAllPost = async () => {
            try {
                const res = await postApi.getAllByUser(user.id)
                setPosts(res.data)
                setRender(true)
            } catch(err) {
                console.log(err)
            }
        }
        getAllPost()            
    }, [user.id, reRender])

    useEffect(() => {
        window.addEventListener('load', (e) => {
            setShow(false)
        })
        return () => {
            
        }
    })

    const handleDelete = async (e, id) => {
        e.preventDefault();

        try {
            const res = await postApi.delete(id)
            alert("Xóa thành công")
            setReRender(false)
            console.log(res)
        } catch(err) {
            alert(err)
            console.log(err)
        }
    }
    
    console.log(posts)
    return (
        <div className='l-9 my__post'>
            <div className="container">
                <div className="my__post__heading">
                    <h1>Bài viết của tôi</h1>
                </div>
                {
                    render && <Pagination 
                        limit='2'
                        bodyData={posts}
                        renderBody={(item, index) => renderBody(item, index)}
                    />
                }
                {/* <div className="row">
                    {
                        posts ? posts.map((item, index) => (
                            <div className='l-6 post' key={index}>
                                <div className="post__test">
                                    <div className="post__image">
                                        <img className="img" src={item.picture} alt="" />
                                    </div>
                                    <div className="post__footer">
                                        <div className='post__footer__name'>
                                            <p className="post__name">
                                                Ngày đăng 
                                                <span className="post__published">{item.published_at}</span>
                                            </p>
                                            <div>
                                                <div onClick={(e) => (setShow(!show) , setActive(index))} className="dots">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-h" className="svg-inline--fa fa-ellipsis-h fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                                                    </svg>
                                                    {
                                                        show ? <ul className= { index === active ? 'active' : ''}>
                                                                    <li>
                                                                        <Link to={`/post/${item.id}/edit`}>Chỉnh sửa</Link>
                                                                    </li>
                                                                    <li>
                                                                        <p onClick={(e) =>handleDelete(e, item.id)}>Xóa</p>
                                                                    </li>
                                                                </ul> : null
                                                    }
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <Link to={`/blog/${item.id}`}>
                                            <h5 className="post__title">{item.title}</h5>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )) : null
                    }
                </div> */}
            </div>
        </div>
  );
};

export default MyPost;
