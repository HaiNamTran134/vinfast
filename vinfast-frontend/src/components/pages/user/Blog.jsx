import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import postApi from '../../../api/postApi'
import { TabTitle } from '../../../assets/setTitle'
import '../../user/blog-view/blog-view.scss'
import Pagination from '../../user/pagination/Pagination'

const renderBody = (item, index) => (
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
)

const Blog = () => {
    TabTitle("Blog - xe VinFast")
    const [posts, setPosts] = useState([])

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [render, setRender] = useState(false)

    useEffect(() => {

        const getAllPost = async () => {
            try {
                const res = await postApi.getAll()
                setPosts(res.data)
                setFilteredResults(res.data)
                setRender(true)
            } catch(err) {
                console.log(err)
            }
        }
        getAllPost()    
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = posts.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
            console.log(filteredData)
        }
        else{
            setFilteredResults(posts)
        }
    }

    return (
        <div className="blog">
            <div className="container">
                <div className="blog__header">
                    <div className="row">
                        <div className="l-6 m-6 c-12">
                            <ul>
                                <li className='active'>Tất cả</li>
                                <li>Xe máy điện</li>
                                <li>Ô tô VinFast</li>
                            </ul>
                        </div>
                        <div className="l-6 m-6 c-12 blog__header__right">
                            <input type="text" onChange={(e) => searchItems(e.target.value)} placeholder="Nhập từ khóa tìm kiếm" />
                            <input type="submit" value="Tìm kiếm" />
                        </div>
                    </div>
                </div>
                <div className="blog__content">
                    {
                        render && <Pagination 
                            limit='9'
                            bodyData={filteredResults}
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Blog
