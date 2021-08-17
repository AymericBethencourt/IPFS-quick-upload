import { create } from 'ipfs-http-client';
import React, { useState } from 'react';

import './Popup.css';

const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

const Popup = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState(undefined);

  async function handleUpload(file) {
    console.log(file);

    try {
      setIsUploading(true);

      // Upload to IPFS
      const uploadedImage = await client.add(file);

      setUrl(`https://ipfs.infura.io/ipfs/${uploadedImage.path}`);


      setIsUploading(false);
    } catch (error) {
      alert.error(error.message);
      console.error(error);
      setIsUploading(false);
    }
  }

  return (
    <div className='popup'>
      {url}
      {isUploading ? (
        <div>Uploading...</div>
      ) : (
        <input
          id='uploader'
          type='file'
          accept='image/*'
          onChange={(e) => {
            e.target &&
              e.target.files &&
              e.target.files[0] &&
              handleUpload(e.target.files[0]);
          }}
        />
      )}
    </div>
  );
};

export default Popup;
