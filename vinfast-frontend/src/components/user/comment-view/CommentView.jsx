import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Pusher from 'pusher-js';
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/user/userSlice';
import postApi from '../../../api/postApi';
import acccountApi from '../../../api/account.js';
import './comment-view.scss'

const CommentView = (props) => {

  const user = useSelector(selectUser)
  const [accounts, setAccounts] = useState([]);
  const [backendComments, setBackendComments] = useState([]);
  const [numberComment, setNumberComment] = useState(0)

  const [text, setText] = useState('');
  const location = useLocation()
  const getCommentsApi = async () => {
    try {
      const res = await postApi.getAllComments(props.post_id)
      setBackendComments(res.data)
      setNumberComment(res.data.length)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {

    getCommentsApi()
  }, [props.post_id]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await acccountApi.getAll()
        setAccounts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllUser()
  }, []);

  useEffect(() => {

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('c9858b741ded216e8ece', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');

    var commentsList = document.querySelector('.comments__container')
    var commentsContainerDetail = `<div style="margin-right: 1rem; margin-top: 3px" className="comments__avatar">
                                      <img style="max-width: 4rem; border-radius: 50%" src={item.avatar} alt="" />
                                    </div>
                                    <div style="padding: 1.3rem; background: #ccc; border-radius: 2rem" className="comments__container__content">
                                      <h5 style="font-size: 1.3rem; margin-bottom: 1rem; font-weight: 700" className="comments__arthor">{item.name}</h5>
                                      <div style="font-size: 1.3rem;" className="comments__text">{item.content}</div>
                                    </div>`
    channel.bind('create-comment', function (data) {
      getCommentsApi()
      if (data != null) {
        if (accounts.length !== 0) {
          const user = accounts.filter(item => item.id === data.user_id)
          if (user[0]) {
            var newCommentHtml = commentsContainerDetail.replace('{item.avatar}', user[0].avatar)
            newCommentHtml = newCommentHtml.replace('{item.name}', user[0].name)
            newCommentHtml = newCommentHtml.replace('{item.content}', data.content)
            newCommentHtml = newCommentHtml.replace('{item.created_at}', data.published_at)

            var newCommentNode = document.createElement('div');
            newCommentNode.classList.add('comments__container__detail');
            newCommentNode.innerHTML = newCommentHtml;
            commentsList.appendChild(newCommentNode);
          }
        }
      }
    })
    var test = document.querySelectorAll('.comments__container__detail')
    console.log(test.length)
  }, [accounts]);
  const currentDate = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
  const formData = new FormData()
  formData.append("content", text)
  formData.append("user_id", user.id)
  formData.append("post_id", location.pathname.slice(6, 8))
  formData.append("published_at", formattedDate.replaceAll(",", ""))

  const handleCreateComment = async (e) => {
    console.log(e.key)
    if (text !== '') {
      if (e.key === 'Enter') {
        try {
          await postApi.createComment(formData)
          getCommentsApi()
          setText('')
        } catch (err) {
          console.log(err)
        }
      }
    }
  };
  return (
    <>
      <div className="count">
        {numberComment}
        <p>bình luận</p>
      </div>
      <div className='comment__form'>
        <img src={user.avatar} alt="" />
        <input
          className={text !== '' ? "comment__form__text active" : "comment__form__text"}
          onChange={(e) => setText(e.target.value)}
          placeholder='Viết bình luận của bạn...'

          onKeyPress={handleCreateComment}
          value={text}
        />
        <div className="comment__form__action">
          <button className="cancel">Hủy</button>
          <button className={text !== '' ? 'send-up active' : 'send-up'}>Bình luận</button>
        </div>
      </div>
      <div className="comments__container">
        {
          backendComments ? backendComments.map((item, index) => (
            <div className="comments__container__detail" key={index}>
              <div className="comments__avatar">
                <img src={item.avatar} alt="" />
              </div>
              <div className="comments__container__content">
                <h5 className="comments__arthor">{item.name}</h5>
                <div className="comments__text">{item.content}</div>
                <p className='comments__created'>
                  <span>{item.created_at}</span>
                </p>
              </div>
            </div>

          )) : null
        }
      </div>
    </>
  )
}

export default CommentView
