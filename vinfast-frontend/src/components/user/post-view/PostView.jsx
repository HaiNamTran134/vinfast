import React from 'react'
import {Link } from 'react-router-dom'

import './post-view.scss'

const PostView = props => {
    const post = props.post;

    return (
        <div className="container">
            <div className='row'>
                {
                    post ? post.map((item, index) => (
                        <Link className='l-4 post' to={`/blog/${item.id}`} key={index}>
                            <div className='test'>
                                <img className="post__image" src={item.image} alt="" />
                                <h5 className="post__title">{item.title}</h5>
                                <div className="post__excerpt">{item.excerpt}</div>
                            </div>
                        </Link>
                    )) : null
                }
            </div>
        </div>
    )
}

export default PostView
