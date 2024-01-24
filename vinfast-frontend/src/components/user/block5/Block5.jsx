import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import postApi from '../../../api/postApi'
import './block5.scss'

const Block5 = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => {

        const getTopPost = async () => {
            try {
                const res = await postApi.getTopPost()
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getTopPost()    
    }, [])
  return (
    <div className='block5'>
        <div className="container">
            <div className="block5__header">
                <h1>Blog</h1>
                <Link to='/blog'>
                    <span>Xem thêm</span>
                </Link>
            </div>
            <div className="row">
                {
                    posts ? posts.map((item, index) => (
                        <Link className='l-4 m-6 c-12 post' to={`/blog/${item.id}`} key={index}>
                            <div className='post__test'>
                                <div className="post__image">
                                    <img className="img" src={item.picture} alt="" />
                                </div>
                                <div className="post__footer">
                                    <p className="post__name">{item.username}</p>
                                    <h5 className="post__title">{item.title}</h5>
                                    <p className="post__published">{item.published_at}</p>
                                </div>
                            </div>
                        </Link>
                    )) : null
                }
            </div>
        </div>
    </div>
  )
}

export default Block5