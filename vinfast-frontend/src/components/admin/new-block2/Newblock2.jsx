import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import productApi from '../../../api/admin/productApi'
const NewProduct = () => {

    const navigate = useNavigate();

    const [idProduct, setIdProduct] = useState('')
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const createProduct = async (e) => {
        e.preventDefault();

        const params = {
            id: idProduct,
            quote: quote,
            author: author,
        }
        try {
            const res = await productApi.createBlock2(params) 
            alert("Thêm thành công")
            navigate(`/admin/homeblock2`)
            console.log(res)
        } catch(err) {
            alert(err)
            console.log(err)
        }
    }

    return (
        <div className='new__product'>
            <div className="new__product--top">
                <h2 className="page-header">
                    Create block
                </h2>
                <div className='btn'>
                    <button onClick={() => navigate('/admin/homeblock2')}>Cancel</button>
                    <button onClick={createProduct}>Create</button>
                </div>
            </div>
            <div className="form__create">
                <form className="formCreate" action="">
                    <div className="row">
                        <div className="l-6"> 
                            <div className="form-group">
                                <input onChange={(e) => setIdProduct(e.target.value)} type="text" name="id" id="id" placeholder=' ' />
                                <label className='label' htmlFor="title">Title</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input onChange={(e) => setQuote(e.target.value)} type="text" name="quote" id="quote" placeholder=" " />
                                <label className='label' htmlFor="quote">Quote</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input onChange={(e) => setAuthor(e.target.value)} type="text" name="author" id="author" placeholder=" " />
                                <label className='label' htmlFor="author">Author</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewProduct
