import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import productApi from '../../../api/admin/productApi'
const NewProduct = () => {

    const selectFile = useRef()
    const navigate = useNavigate();
 
    const [id_xe, setId_xe] = useState('')
    const [name, setName] = useState('')
    const [slogan, setSlogan] = useState('')
    const [description1, setDescription1] = useState('')
    const [description2, setDescription2] = useState('')
    const [description3, setDescription3] = useState('')
    const [description4, setDescription4] = useState('')
    const createBanner = async (e) => {
        e.preventDefault();

        if(selectFile.current.files.length === 0) {
            alert("Vui lòng chọn ảnh biên lai")
        }else {
            try {
                const formData = new FormData()
                formData.append("id_xe", id_xe)
                formData.append("image", selectFile.current.files[0]) 
                formData.append("name", name)
                formData.append("slogan", slogan) 
                formData.append("description1", description1) 
                formData.append("description2", description2) 
                formData.append("description3", description3) 
                formData.append("description4", description4) 
                try {
                    const res = await productApi.createBlock4(formData)
                    alert("Thêm thành công")
                    navigate(`/admin/homeblock4`)
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
                    Create block
                </h2>
                <div className='btn'>
                    <button onClick={() => navigate('/admin/homeblock4')}>Cancel</button>
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
                                    <input value={id_xe} onChange={(e) => setId_xe(e.target.value)} type="text" name="id" id="id" placeholder=" " />
                                    <label className='label' htmlFor="id">Id block</label>
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
                                    <input value={slogan } onChange={(e) => setSlogan(e.target.value)} type="text" name="Slogan" id="Slogan" placeholder=" " />
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
                </form>
            </div>
        </div>
    )
}

export default NewProduct
