import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import productApi from '../../../api/admin/productApi'
const NewProduct = () => {

    const selectFile = useRef()
    const navigate = useNavigate();

    const [idProduct, setIdProduct] = useState('')
    const [placement, setPlacement] = useState('')
    const createBanner = async (e) => {
        e.preventDefault();

        if(selectFile.current.files.length === 0) {
            alert("Vui lòng chọn ảnh biên lai")
        }else {
            try {
                const formData = new FormData()
                formData.append("id", idProduct)
                formData.append("placement", placement)
                formData.append("banner", selectFile.current.files[0]) 
                try {
                    const res = await productApi.createBanner(formData)
                    alert("Thêm thành công")
                    navigate(`/admin/homeslide`)
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
                    <button onClick={() => navigate('/admin/homeslide')}>Cancel</button>
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
                                    <label className='label' htmlFor="id">Id</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={placement } onChange={(e) => setPlacement(e.target.value)} type="text" name="placement" id="placement" placeholder=" " />
                                    <label className='label' htmlFor="placement">Placement</label>
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
