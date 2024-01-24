import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import postApi from '../../../api/depost/customerApi'

import './blog-view.scss'

const BlogView = () => {
    let params = useParams();
    console.log(params)
    
    const [posts, setPosts] = useState([])

    const getPostById = (id) => posts.find(e => e.id === id)
    const post = getPostById(params.id)
    console.log(post)

    useEffect(() => {
        const getAllPost = async () => {
            try {
                const res = await postApi.getAll()
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getAllPost()             
    }, [])

    return (
        <div>{post ? post.title : null}</div>
    )
}

export default BlogView
