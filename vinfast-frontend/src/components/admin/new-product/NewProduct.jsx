import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import productApi from '../../../api/admin/productApi'
import './new-product.scss'
const NewProduct = () => {

    const selectFile = useRef()
    const navigate = useNavigate();

    const [idProduct, setIdProduct] = useState('')
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [count, setCount] = useState('')
    const [price, setPrice] = useState('')
    const [deposits, setDeposits] = useState('')
    const createProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("id", idProduct)
        formData.append("name", name)
        formData.append("color", color)
        formData.append("image", selectFile.current.files[0])
        formData.append("count", count)
        formData.append("price", price)
        formData.append("deposits", deposits)
        try {
            const res = await productApi.create(formData)
            alert("Thêm thành công")
            navigate(`/admin/products`)
            console.log(res)
        } catch(err) {
            alert(err)
            console.log(err)
        }
    }

    const [stateFile, setStateFile] = useState([]);
    const onChangeImage = (e) => {
        setStateFile([]);
        if(e.target.files) {
          const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
          setStateFile((prevImages) => prevImages.concat(filesArray))
          Array.from(e.target.files).map((file) => URL.revokeObjectURL(file))
        }
      }

      const renderPhotos = (source) => {
        return source.map((photo, index) => {
          return <img key={index} src={photo} alt="" />
        })
      }

    return (
        <div className='new__product'>
            <div className="new__product--top">
                <h2 className="page-header">
                    Create product
                </h2>
                <div className='btn'>
                    <button onClick={() => navigate('/admin/products')}>Cancel</button>
                    <button onClick={createProduct}>Create</button>
                </div>
            </div>
            <div className="form__create">
                <form className="formCreate" action="">
                    <div className='row form__create__product'>
                    <div className="l-4 form__create__product__left">
                        <div className="form-group">
                            <input type="file" ref={selectFile} onChange={onChangeImage}  className="form-control" multiple required />
                            <div className="result">{renderPhotos(stateFile)}</div>
                        </div>
                    </div>
                    <div className="l-8 form__create__product__right">
                        <div className="row">
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={idProduct } onChange={(e) => setIdProduct(e.target.value)} type="text" name="id" id="id" placeholder=" " />
                                    <label className='label' htmlFor="id">Id product</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={name } onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder=" " />
                                    <label className='label' htmlFor="Name">Name</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={color } onChange={(e) => setColor(e.target.value)} type="text" name="color" id="color" placeholder=" " />
                                    <label className='label' htmlFor="Color">Color</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={count } onChange={(e) => setCount(e.target.value)} type="text" name="count" id="count" placeholder=" " />
                                    <label className='label' htmlFor="Count">Count</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={price } onChange={(e) => setPrice(e.target.value)} type="text" name="price" id="price" placeholder=" " />
                                    <label className='label' htmlFor="id">Price</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={deposits } onChange={(e) => setDeposits(e.target.value)} type="text" name="deposit" id="deposit" placeholder=" " />
                                    <label className='label' htmlFor="id">Deposit</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default NewProduct
