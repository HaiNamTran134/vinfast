import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/userSlice';
import postApi from '../../../api/postApi';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './post-edit.scss'
const PostEdit = () => {

    let params = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        const getPostOne = async () => {
            try {
                const res = await postApi.getOne(params.id)
                console.log(params.id)
                setPost(res)
            } catch(err) {
                console.log(err)
            }
        }
        getPostOne()
    }, [params.id])
    console.log(post)
  let navigate = useNavigate();
  const user = useSelector(selectUser)
  
  const [userInfo, setUserInfo] = useState({
    title: '',
  });
  console.log(userInfo)
  const selectFile = useRef()
  const [stateFile, setStateFile] = useState();

  const uploader = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("id", params.id)
    formData.append("picture", selectFile.current.files[0] || post.picture)
    formData.append("title", userInfo.title)
    formData.append("content", userInfo.description.value)
    formData.append("user_id", user.id)
    formData.append("username", user.name)
    formData.append("published_at", new Date())
    try {
        const res = await postApi.update(formData)
        alert("Sửa bài viết thành công")
        navigate('/settings/me/my-post')
        console.log(res)
    } catch(err) {
        alert(err)
        console.log(err)
    }
  }

  const onChangeValue = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
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
      return <img key={index} src={photo} alt="" style={{width: "40%", height: "40%"}} />
    })
  }

  let editorState = EditorState.createEmpty(post.content);
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
                          <h3 className="myaccount-content"> Chỉnh sửa bài viết  </h3>
                          <div className="row">
                              <div className="form-group l-12">
                                <label className="font-weight-bold"> Tiêu đề <span className="required"> * </span> </label>
                                <input type="text" name="title" value={userInfo.title || post.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
                              </div>
                              <div className="form-group l-12">
                                <label className="font-weight-bold"> Hình ảnh <span className="required"> * </span> </label>
                                <input type="file" ref={selectFile} onChange={onChangeImage}  className="form-control" multiple required />
                                {stateFile === undefined ? <img src={post.picture} alt="" width="350px" height="250px"/> : <div className="result">{renderPhotos(stateFile)}</div>}
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
                                <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
                              </div>
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

export default PostEdit
