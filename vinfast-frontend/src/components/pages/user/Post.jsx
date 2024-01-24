import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import PostView from '../../user/post-view/PostView'
import postApi from '../../../api/postApi'
const Post = () => {
    let params = useParams();
    console.log(params)
    
    const [posts, setPosts] = useState([])

    const getPostById = (id) => posts.find(e => e.id === id)
    const post = getPostById(params.id)
    console.log(posts)

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
        <div className='post'>
            <PostView post={post}/>
        </div>
    )
}

export default Post
