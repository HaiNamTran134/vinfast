import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import accountApi from '../../../api/account'
import './new-account.scss'
const NewAccount = () => {

    const selectFile = useRef()
    const navigate = useNavigate();

    const [idProduct, setIdProduct] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const createProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("id", idProduct)
        formData.append("name", name)
        formData.append("avatar", selectFile.current.files[0])
        formData.append("email", email)
        formData.append("password", password)
        formData.append("role", role)
        try {
            const res = await accountApi.createByAdmin(formData)
            alert("Thêm thành công")
            navigate(`/admin/accounts`)
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
                <form className="formCreate" role="">
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
                                    <label className='label' htmlFor="id">Id Account</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={name } onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder=" " />
                                    <label className='label' htmlFor="id">Name</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={email } onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder=" " />
                                    <label className='label' htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={password } onChange={(e) => setPassword(e.target.value)} type="text" name="password" id="password" placeholder=" " />
                                    <label className='label' htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="l-6">
                                <div className="form-group">
                                    <input value={role } onChange={(e) => setRole(e.target.value)} type="text" name="role" id="role" placeholder=" " />
                                    <label className='label' htmlFor="role">Role</label>
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

export default NewAccount
