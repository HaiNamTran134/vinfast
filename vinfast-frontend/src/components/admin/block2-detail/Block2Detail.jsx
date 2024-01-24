import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import productApi from '../../../api/admin/productApi'

import './block2-detail.scss'
const ProductDetail = () => {

    const { id } = useParams();

    const [productData, setProductData] = useState("")
    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await productApi.getOneBlock2(id)
                setProductData(res)
            } catch(err) {
                console.log(err)
            }
        }
        getProductApi()
                
    }, [id])

    console.log(productData)
    return (
        <div className='product__detail'>
            <div className="new__product--top">
                <h2 className="page-header">
                    Block Detail
                </h2>
            </div>
            <div className="form__create">
                <form className="formCreate" action="">
                    {
                        productData ? <ProductInfo product={productData} /> : null
                    }
                </form>
            </div>
        </div>
    )
}

export default ProductDetail

const ProductInfo = ({product}) => {
    const navigate = useNavigate();

    const [idProduct, setIdProduct] = useState(product.id)
    const [quote, setQuote] = useState(product.quote)
    const [author, setAuthor] = useState(product.author)

    console.log(quote)
    const updateProduct = async (e) => {
        e.preventDefault();

        const params = { 
            id: idProduct,
            quote: quote,
            author: author,
        }
        const updateProductApi = async () => {
            try {
                const res = await productApi.updateBlock2(params)
                alert("Cập nhật thành công")
                navigate(`/admin/homeblock2`)
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        updateProductApi()
    }

    const DeleteProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await productApi.deleteBlock2(idProduct)
            alert("Xóa thành công")
            navigate(`/admin/homeblock2`)
            console.log(res)
        } catch(err) {
            alert(err)
            console.log(err)
        }
    }
    
    return (
        <>
            <div className="row">
                <div className="l-6">
                    <div className="form-group">
                        <input disabled value={idProduct } type="text" name="id" id="id" placeholder=" " />
                        <label className='label' htmlFor="id">id</label>
                    </div>
                </div>
                <div className="l-6">
                    <div className="form-group">
                        <input value={quote } onChange={(e) => setQuote(e.target.value)} type="text" name="Quote" id="Quote" placeholder=" " />
                        <label className='label' htmlFor="Quote">Quote</label>
                    </div>
                </div>
                <div className="l-6">
                    <div className="form-group">
                        <input value={author } onChange={(e) => setAuthor(e.target.value)} type="text" name="Author" id="Author" placeholder=" " />
                        <label className='label' htmlFor="Author">Author</label>
                    </div>
                </div>
            </div>
            <div className='btn'>
                <button onClick={updateProduct}>update</button>
                <button onClick={DeleteProduct}>Delete</button>
            </div>
        </>
    )
}
