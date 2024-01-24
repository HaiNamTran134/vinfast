import React, { useState, useRef } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/userSlice';
import postApi from '../../../api/postApi';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './new-post.scss'
const NewPost = () => {

  let navigate = useNavigate();
  const user = useSelector(selectUser)

  const [userInfo, setuserInfo] = useState({
    title: '',
  });
  const selectFile = useRef()
  const [stateFile, setStateFile] = useState([]);

  const [response, setResponse] = useState("")
  const [isError, setError] = useState(null);
  const uploader = async (e) => {
    e.preventDefault();
    if (selectFile.current.files.length === 0) {
      setResponse("please choose an image");
    } else {
      if (userInfo.description.value.length < 50) {
        setError('Required, Add description Minimum length 50 characters');
      } else {
        const formData = new FormData()
        formData.append("picture", selectFile.current.files[0])
        formData.append("title", userInfo.title)
        formData.append("content", userInfo.description.value)
        formData.append("user_id", user.id)
        formData.append("username", user.name)
        const currentDate = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
        formData.append("published_at", formattedDate.replaceAll(",", ""))
        try {
          const res = await postApi.create(formData)
          alert("Tạo bài viết thành công")
          navigate(`/blog`)
          // console.log(res)
        } catch (err) {
          alert(err)
          console.log(err)
        }
      }
    }
  }

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }
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
      return <img key={index} src={photo} alt="" style={{ width: "40%", height: "40%" }} />
    })
  }

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  }
  return (
    <>
      <div className="new__post">
        <div className="container">
          <div className="row">
            <form className="update__forms">
              <h3 className="myaccount-content"> Tạo bài viết  </h3>
              <div className="row">
                <div className="form-group l-12">
                  <label className="font-weight-bold"> Tiêu đề <span className="required"> * </span> </label>
                  <input type="text" name="title" value={userInfo.title} onChange={onChangeValue} className="form-control" placeholder="Title" required />
                </div>
                <div className="form-group l-12">
                  <label className="font-weight-bold"> Hình ảnh <span className="required"> * </span> </label>
                  <input type="file" ref={selectFile} onChange={onChangeImage} className="form-control" multiple required />
                  <p>{response}</p>
                  <div className="result">{renderPhotos(stateFile)}</div>
                </div>
                <div className="form-group l-12 editor">
                  <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
                  <Editor
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <textarea style={{ display: 'none' }} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent()))} />
                </div>
                {isError !== null && <div className="errors"> {isError} </div>}
                <div className="form-group l-12 text-right">
                  <button onClick={uploader} className="btn btn__theme"> Submit  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPost
