import React, { useState } from 'react';
//import PropTypes from 'props-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText, file, setfile] = useState('');
  const [filename, setfilename] = useState('Choose File');
  const [uploadFile, setUploadedFile] = useState({});
  const onChange = (e) => {
    setfile(e.target.files[0]);
    setfilename(e.target.files[0].name);
  };
  return (
    <div className='container mt-4'>
      <h4 className='display-4 text-centre mb-4'>
        <i className='fas fa-upload'></i>
        Upload a Gesture
      </h4>

      <form
        class='form my-1'
        on
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, file });
          setText(' ');
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Write Gesture name'
            name='Name'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Write short Description of your Gesture'
            //value={Description}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            value={file}
            onChange={onChange}
          />
          <label className='custom-file-label' htmlfor='customFile'>
            {filename}
          </label>
        </div>

        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};
//PostForm.PropTypes = { addPost: PropTypes.func.isRequired };
export default connect(null, { addPost })(PostForm);
