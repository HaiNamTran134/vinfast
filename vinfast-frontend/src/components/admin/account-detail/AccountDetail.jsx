import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import accountApi from '../../../api/account'

import './account-detail.scss'
const AccountDetail = () => {

    const { id } = useParams();

    const [accountData, setAccountData] = useState("")
    useEffect(() => {
        const getAccountApi = async () => {
            try {
                const res = await accountApi.getOne(id)
                setAccountData(res.data)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        getAccountApi()

    }, [id])

    console.log(accountData)
    return (
        <div className='public__detail'>
            <div className="new__public--top">
                <h2 className="page-header">
                    Account Detail
                </h2>
            </div>
            <div className="form__create">
                <form className="formCreate" action="">
                    {
                        accountData ? <AccountInfo account={accountData} /> : null
                    }
                </form>
            </div>
        </div>
    )
}

export default AccountDetail

const AccountInfo = ({ account }) => {
    console.log(account)
    const navigate = useNavigate();

    const selectFile = useRef()
    // const [account.id, setaccount.id] = useState(account.id)
    const [name, setName] = useState(account.name)
    const [email, setEmail] = useState(account.email)
    const [password, setPassword] = useState(account.password)
    const [role, setRole] = useState(account.role)
    const updateAccount = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("id", account.id)
        formData.append("avatar", selectFile.current.files[0] || account.image)
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("role", role)

        const updateAccountApi = async () => {
            try {
                const res = await accountApi.updateByAdmin(formData)
                alert("Cập nhật thành công")
                navigate(`/admin/accounts`)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        updateAccountApi()
    }

    const DeleteAccount = async (e) => {
        e.preventDefault();
        try {
            const res = await accountApi.deleteByAdmin(account.id)
            alert("Xóa thành công")
            navigate(`/admin/accounts`)
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
    console.log(account)

    return (
        <>
            <div className='btn'>
                <button onClick={updateAccount}>update</button>
                <button onClick={DeleteAccount}>Delete</button>
            </div>
            <div className='row form__account__detail'>
                <div className="l-4 form__account__detail__left">
                    <div className="form-group">
                        <input type="file" ref={selectFile} onChange={onChangeImage} className="form-control" multiple required />
                        {stateFile === undefined ? <img src={account.avatar} alt="" width="350px" height="250px" /> : <div className="result">{renderPhotos(stateFile)}</div>}
                    </div>
                </div>
                <div className="l-8 form__account__detail__right">
                    <div className="row">
                        <div className="l-6">
                            <div className="form-group">
                                <input disabled value={account.id} type="text" name="id" id="id" placeholder=" " />
                                <label className='label' htmlFor="id">Id Account</label>
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
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder=" " />
                                <label className='label' htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" id="password" placeholder=" " />
                                <label className='label' htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={role} onChange={(e) => setRole(e.target.value)} type="text" name="role" id="role" placeholder=" " />
                                <label className='label' htmlFor="role">Role</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
