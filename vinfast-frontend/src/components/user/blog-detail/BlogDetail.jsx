import React, { useState, useEffect } from 'react'
import ProtoTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom'
import purify from "dompurify";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/userSlice';
import CommentView from '../comment-view/CommentView';
import postApi from '../../../api/postApi';
import { TabTitle } from '../../../assets/setTitle';
import './blog-detail.scss'
const BlogDetail = () => {
    let params = useParams();

    const [posts, setPosts] = useState([])
    const [post, setPost] = useState([])

    useEffect(() => {
        if (posts.length > 0) {
            const getPostById = (id) => posts.find(e => e.id == id)
            setPost(getPostById(params.id))
        }

    }, [posts]);
    useEffect(() => {
        const getAllPost = async () => {
            try {
                const res = await postApi.getAll()
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAllPost()
    }, [])

    return (
        <div className='blog__detail'>
            <div className="container">
                {
                    post ? <BlogView post={post} /> : ''
                }
            </div>
        </div>
    )
}

BlogDetail.prototype = {
    data: ProtoTypes.array.isRequired
}

const BlogView = props => {
    const post = props.post
    TabTitle(post.title)

    const [activeHeart, setActiveHeart] = useState(false)
    const [countHeart, setCountHeart] = useState(parseInt(post.views_heart))

    const [commentActive, setCommentActive] = useState(false)
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        const blogDiv = document.querySelector('.blog__detail__comment')
        const commnetDiv = document.querySelector('.comment')
        const commnetClose = document.querySelector('.comment__close')

        if (blogDiv && commnetDiv && commnetClose) {
            blogDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                setCommentActive(false)
            })
            commnetDiv.addEventListener('click', (e) => {
                e.stopPropagation();
            })
            commnetClose.addEventListener('click', (e) => {
                setCommentActive(false)
            })

            blogDiv.addEventListener('scroll', (e) => {
                window.scrollTo(0, 0);
            })
        }

        return (() => {
            if (blogDiv && commnetDiv && commnetClose) {
                blogDiv.removeEventListener('click', (e) => {
                    e.stopPropagation();
                    setCommentActive(false)
                })
                commnetDiv.removeEventListener('click', (e) => {
                    e.stopPropagation();
                })
                commnetClose.removeEventListener('click', (e) => {
                    setCommentActive(false)
                })

                blogDiv.removeEventListener('scroll', (e) => {
                    window.scrollTo(0, 0);
                })
            }
        })
    }, [commentActive])

    if (commentActive) {
        document.body.classList.add("stop-scrolling");
    } else {
        document.body.classList.remove("stop-scrolling");
    }

    const handleCommentActive = () => {
        if (user !== undefined || user != null) {
            setCommentActive(true)
        } else {
            alert("Vui lòng đăng nhập")
            navigate('/login')
        }
    }

    const BlockComment = () => {
        return (
            <div className={commentActive ? "blog__detail__comment active" : "blog__detail__comment"}>
                <div className='comment'>
                    <div className="comment__close" onClick={() => setCommentActive(false)}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                        </svg>
                    </div>
                    <div className="comment__content">
                        <div className="comment__view">
                            {
                                user === undefined || user === null ? null : <CommentView post_id={post.id} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="blog__detail">
            <div className="row">
                <div className="l-3">
                    <div className="blog__detail__left">
                        <h4 className="blog__detail__left__username username">{post.username}</h4>
                        <div className="blog__detail__left__reaction">
                            <div onClick={() => setActiveHeart(!activeHeart)} className="heart reaction">
                                {
                                    activeHeart ? <svg onClick={() => setCountHeart(countHeart - 1)} style={{ color: '#ed2b48' }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                                    </svg> :
                                        <svg onClick={() => setCountHeart(countHeart + 1)} aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                                        </svg>
                                }
                            </div>
                            <div className="comment__count reaction" onClick={handleCommentActive}>
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comment" className="svg-inline--fa fa-comment fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="l-8">
                    <h1 className='blog__detail__title'>{post.title}</h1>
                    <div className="blog__detail__header">
                        <div className="blog__detail__header--left">
                            <p className="username">{post.username}</p>
                            <p className="date">{post.published_at}</p>
                        </div>
                        <div className="blog__detail__header--right">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-h" className="svg-inline--fa fa-ellipsis-h fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="blog__detail__content" dangerouslySetInnerHTML={{ __html: purify.sanitize(post.content) }} />
                </div>
            </div>
            {commentActive ? <BlockComment /> : null}
        </div>
    )
}

export default BlogDetail
