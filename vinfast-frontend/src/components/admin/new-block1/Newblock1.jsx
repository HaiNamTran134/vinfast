import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import productApi from '../../../api/admin/productApi'
const NewProduct = () => {

    const selectFile = useRef()
    const navigate = useNavigate();
 
    const [idProduct, setIdProduct] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const createBanner = async (e) => {
        e.preventDefault();

        if(selectFile.current.files.length === 0) {
            alert("Vui lòng chọn ảnh biên lai")
        }else {
            try {
                const formData = new FormData()
                formData.append("id", idProduct)
                formData.append("title", title)
                formData.append("description", description) 
                formData.append("image", selectFile.current.files[0]) 
                try {
                    const res = await productApi.createBlock1(formData)
                    alert("Thêm thành công")
                    navigate(`/admin/homeblock1`)
                    console.log(res)
                } catch(err) {
                    alert(err)
                    console.log(err)
                }
            } catch (error) {
                console.log(error)
            }
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
                    <button onClick={() => navigate('/admin/homeblock1')}>Cancel</button>
                    <button onClick={createBanner}>Create</button>
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
                                    <label className='label' htmlFor="id">Id block</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={title } onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder=" " />
                                    <label className='label' htmlFor="title">Title</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={description } onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" placeholder=" " />
                                    <label className='label' htmlFor="description">Description</label>
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
