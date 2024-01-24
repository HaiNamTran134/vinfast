import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import productApi from '../../../api/admin/productApi'

import './block1-detail.scss'
const ProductDetail = () => {

    const { id } = useParams();

    const [productData, setProductData] = useState("")
    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await productApi.getOneBlock1(id)
                setProductData(res)
            } catch(err) {
                console.log(err)
            }
        }
        getProductApi()
                
    }, [id])
    return (
        <div className='public__detail'>
            <div className="new__public--top">
                <h2 className="page-header">
                    Block1 Detail
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

    const selectFile = useRef()
    const [idProduct, setIdProduct] = useState(product.id)
    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)

    console.log(title)
    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("id", idProduct)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("image", selectFile.current.files[0] || product.image) 

        const updateProductApi = async () => {
            try {
                const res = await productApi.updateBlock1(formData)
                alert("Cập nhật thành công")
                navigate(`/admin/homeblock1`)
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
            const res = await productApi.deleteBlock1(idProduct)
            alert("Xóa thành công")
            navigate(`/admin/homeblock1`)
            console.log(res)
        } catch(err) {
            alert(err)
            console.log(err)
        }
    }

    const [stateFile, setStateFile] = useState();
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
          return <img key={index} src={photo} alt="" width="350px" height="250px" />
        })
      }
      console.log(stateFile)
    return (
        <>
            <div className='btn'>
                <button onClick={updateProduct}>update</button>
                <button onClick={DeleteProduct}>Delete</button>
            </div>
            <div className='row form__product__detail'>
                <div className="l-4 form__product__detail__left">
                    <div className="form-group">
                        <input type="file" ref={selectFile} onChange={onChangeImage}  className="form-control" multiple required />
                        {stateFile === undefined ? <img src={product.image} alt="" width="350px" height="250px"/> : <div className="result">{renderPhotos(stateFile)}</div>}
                    </div>
                </div>

                <div className="l-8 form__product__detail__right">
                    <div className="row">
                        <div className="l-6">
                            <div className="form-group">
                                <input disabled value={idProduct } type="text" name="id" id="id" placeholder=" " />
                                <label className='label' htmlFor="id">Id</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={title } onChange={(e) => setTitle(e.target.value)} type="text" name="Title" id="Title" placeholder=" " />
                                <label className='label' htmlFor="Title">Title</label>
                            </div>
                        </div> 
                        <div className="l-6">
                            <div className="form-group">
                                <input value={description } onChange={(e) => setDescription(e.target.value)} type="text" name="Description" id="Description" placeholder=" " />
                                <label className='label' htmlFor="Description">Description</label>
                            </div>
                        </div>          

                    </div>
                </div>

            </div>
        </>
    )
}
