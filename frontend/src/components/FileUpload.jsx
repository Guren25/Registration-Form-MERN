import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myFile', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { file } = res.data;

      setUploadedFile({ file });
      alert('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onChange} />
          <label>{filename}</label>
        </div>
        <input type="submit" value="Upload" />
      </form>
      {uploadedFile ? (
        <div>
          <h3>{uploadedFile.file}</h3>
          <img src={`/${uploadedFile.file}`} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
