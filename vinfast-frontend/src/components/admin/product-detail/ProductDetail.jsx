import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import productApi from '../../../api/admin/productApi'

import './product-detail.scss'
const ProductDetail = () => {

    const { id } = useParams();

    const [productData, setProductData] = useState("")
    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await productApi.getOne(id)
                setProductData(res)
            } catch (err) {
                console.log(err)
            }
        }
        getProductApi()

    }, [id])
    return (
        <div className='public__detail'>
            <div className="new__public--top">
                <h2 className="page-header">
                    Product Detail
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

const ProductInfo = ({ product }) => {
    const navigate = useNavigate();

    const selectFile = useRef()
    const [idProduct, setIdProduct] = useState(product.id)
    const [name, setName] = useState(product.name)
    const [color, setColor] = useState(product.color)
    const [count, setCount] = useState(product.count)
    const [price, setPrice] = useState(product.price)
    const [deposits, setDeposits] = useState(product.deposits)

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("id", idProduct)
        formData.append("name", name)
        formData.append("color", color)
        formData.append("image", selectFile.current.files[0] || product.image)
        formData.append("count", count)
        formData.append("price", price)
        formData.append("deposits", deposits)


        const updateProductApi = async () => {
            try {
                const res = await productApi.update(formData)
                alert("Cập nhật thành công")
                navigate(`/admin/products`)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        updateProductApi()

    }
    console.log(product)

    const DeleteProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await productApi.delete(idProduct)
            alert("Xóa thành công")
            navigate(`/admin/products`)
            console.log(res)
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }

    const [stateFile, setStateFile] = useState();
    const onChangeImage = (e) => {
        setStateFile([]);
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setStateFile((prevImages) => prevImages.concat(filesArray))
            Array.from(e.target.files).map((file) => URL.revokeObjectURL(file))
        }
    }

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            return <img key={index} src={photo} alt="" width="350px" height="250px" />
        })
    }
    return (
        <>
            <div className='btn'>
                <button onClick={updateProduct}>update</button>
                <button onClick={DeleteProduct}>Delete</button>
            </div>
            <div className='row form__product__detail'>
                <div className="l-4 form__product__detail__left">
                    <div className="form-group">
                        <input type="file" ref={selectFile} onChange={onChangeImage} className="form-control" multiple required />
                        {stateFile === undefined ? <img src={product.image} alt="" width="350px" height="250px" /> : <div className="result">{renderPhotos(stateFile)}</div>}
                    </div>
                </div>
                <div className="l-8 form__product__detail__right">
                    <div className="row">
                        <div className="l-6">
                            <div className="form-group">
                                <input disabled value={idProduct} type="text" name="id" id="id" placeholder=" " />
                                <label className='label' htmlFor="id">Id product</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder=" " />
                                <label className='label' htmlFor="Name">Name</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={color} onChange={(e) => setColor(e.target.value)} type="text" name="color" id="color" placeholder=" " />
                                <label className='label' htmlFor="Color">Color</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={count} onChange={(e) => setCount(e.target.value)} type="text" name="count" id="count" placeholder=" " />
                                <label className='label' htmlFor="Count">Count</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" id="price" placeholder=" " />
                                <label className='label' htmlFor="id">Price</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={deposits} onChange={(e) => setDeposits(e.target.value)} type="text" name="deposit" id="deposit" placeholder=" " />
                                <label className='label' htmlFor="id">Deposit</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
