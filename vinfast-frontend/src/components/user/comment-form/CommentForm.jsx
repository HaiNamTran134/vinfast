import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { selectUser } from '../../../redux/user/userSlice';
import postApi from '../../../api/postApi';
import './comment-form.scss'
const CommentForm = () => {
  const user = useSelector(selectUser);
  const [text, setText] = useState('');
  const location = useLocation()

  const createComment = async (e) => {
    // e.preventDefault();
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    const formData = {
      content: text,
      user_id: user.id,
      post_id: location.pathname.slice(6, 8),
      published_at: formattedDate.formattedDate.replaceAll(",", "")
    }

    if (e.key === 'Enter') {
      try {
        await postApi.createComment(formData)
        alert("Viết bình luận thành công")
        setText('null')
      } catch (err) {
        console.log(err)
      }
    }
  };

  return <div className='comment__form'>
    <img src={user.avatar} alt="" />
    <input
      className={text !== '' ? "comment__form__text active" : "comment__form__text"}
      onChange={(e) => setText(e.target.value)}
      placeholder='Viết bình luận của bạn...'
      onKeyPress={createComment}
    />
    <div className="comment__form__action">
      <button className="cancel">Hủy</button>
      <button onClick={createComment} className={text !== '' ? 'send-up active' : 'send-up'}>Bình luận</button>
    </div>
  </div>;
};

export default CommentForm;
