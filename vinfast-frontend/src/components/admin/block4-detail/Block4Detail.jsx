import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import productApi from '../../../api/admin/productApi'

import './block4-detail.scss' 
const ProductDetail = () => { 

    const { id } = useParams();

    const [productData, setProductData] = useState("")
    useEffect(() => { 
        const getProductApi = async () => {
            try {
                const res = await productApi.getOneBlock4(id) 
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

    const selectFile = useRef()
    const [idProduct, setIdProduct] = useState(product.id_xe)
    const [image, setImage] = useState(product.image)
    const [name, setName] = useState(product.name)
    const [slogan, setSlogan] = useState(product.slogan)
    const [description1, setDescription1] = useState(product.description1)
    const [description2, setDescription2] = useState(product.description2)
    const [description3, setDescription3] = useState(product.description3)
    const [description4, setDescription4] = useState(product.description4)

    console.log(image)
    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("id_xe", idProduct)
        formData.append("image", selectFile.current.files[0] || product.image) 
        formData.append("name", name)
        formData.append("slogan", slogan)
        formData.append("description1", description1)
        formData.append("description2", description2)
        formData.append("description3", description3)
        formData.append("description4", description4)
       

        const updateProductApi = async () => {
            try {
                const res = await productApi.updateBlock4(formData)
                alert("Cập nhật thành công")
                navigate(`/admin/homeblock4`)
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
            const res = await productApi.deleteBlock4(idProduct)
            alert("Xóa thành công")
            navigate(`/admin/homeblock4`)
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
                                <input disabled value={idProduct } type="text" name="Id" id="Id" placeholder=" " />
                                <label className='label' htmlFor="Id">Id</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={name } onChange={(e) => setName(e.target.value)} type="text" name="Name" id="Name" placeholder=" " />
                                <label className='label' htmlFor="Name">Name</label>
                            </div>
                        </div> 
                        <div className="l-6">
                            <div className="form-group">
                                <input value={slogan}  onChange={(e) => setSlogan(e.target.value)} type="text" name="Slogan" id="Slogan" placeholder=" " />
                                <label className='label' htmlFor="Slogan">Slogan</label>
                            </div>
                        </div> 
                        
                        <div className="l-6">
                            <div className="form-group">
                                <input value={description1 } onChange={(e) => setDescription1(e.target.value)} type="text" name="Description1" id="Description1" placeholder=" " />
                                <label className='label' htmlFor="Description1">Description1</label>
                            </div>
                        </div> 
                        <div className="l-6">
                            <div className="form-group">
                                <input value={description2 } onChange={(e) => setDescription2(e.target.value)} type="text" name="Description2" id="Description2" placeholder=" " />
                                <label className='label' htmlFor="Description2">Description2</label>
                            </div>
                        </div>     
                        <div className="l-6">
                            <div className="form-group">
                                <input value={description3 } onChange={(e) => setDescription3(e.target.value)} type="text" name="Description3" id="Description3" placeholder=" " />
                                <label className='label' htmlFor="Description3">Description3</label>
                            </div>
                        </div>     
                        <div className="l-6">
                            <div className="form-group">
                                <input value={description4 } onChange={(e) => setDescription4(e.target.value)} type="text" name="Description4" id="Description4" placeholder=" " />
                                <label className='label' htmlFor="Description4">Description4</label>
                            </div>
                        </div>              

                    </div>
                </div>

            </div>
        </>
    )
}
