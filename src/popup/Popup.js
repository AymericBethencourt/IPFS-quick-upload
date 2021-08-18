import { create } from 'ipfs-http-client';
import React, { useState } from 'react';

import './Popup.css';

const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

const Popup = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [url, setUrl] = useState(undefined);

  async function handleUpload(file) {
    console.log(file);

    try {
      setIsUploading(true);
      setIsUploaded(false);

      // Upload to IPFS
      const uploadedImage = await client.add(file);

      setUrl(`${uploadedImage.path}`);

      setIsUploading(false);
      setIsUploaded(true);
    } catch (error) {
      alert.error(error.message);
      console.error(error);
      setIsUploading(false);
      setIsUploaded(false);
    }
  }

  return (
    <div className='popup'>
      <h1>IPFS Quick Upload</h1>

      <div class="cube">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className='uploader'>
        <label htmlFor="uploader">
          <div className={`upload-button${isUploading ? ' is-uploading' : ''}${isUploaded ? ' is-uploaded' : ''}`} type="button" >
            <span>
              <svg>
                <use xlinkHref="/img/sprites.svg#ipfs" />
              </svg>
              <svg>
                <use xlinkHref="/img/sprites.svg#loader" />
              </svg>
              <svg>
                <use xlinkHref="/img/sprites.svg#check" />
              </svg>
            </span>

            <ul>
              <li>Upload file to IPFS</li>
              <li>Uploading to IPFS...</li>
              <li>Upload complete</li>
            </ul>
          </div>
        </label>
        <input
          id='uploader'
          type='file'
          accept='*'
          onChange={(e) => {
            e.target &&
              e.target.files &&
              e.target.files[0] &&
              handleUpload(e.target.files[0]);
          }}
        />
      </div>

      <div className={`results${isUploaded ? ' results-uploaded' : ''}`}>
        <div className="result">
          <div className="result-label">IPFS URL:</div>
          <input
            type='text'
            value={`ipfs://${url}`}
          />
          <div className="result-copy" onClick={() => navigator.clipboard.writeText(`ipfs://${url}`)}>
            <svg>
              <use xlinkHref="/img/sprites.svg#copy" />
            </svg>
          </div>
        </div>

        <div className="result">
          <div className="result-label">HTTP URL:</div>
          <input
            type='text'
            value={`https://ipfs.infura.io/ipfs/${url}`}
          />
          <div className="result-copy" onClick={() => navigator.clipboard.writeText(`https://ipfs.infura.io/ipfs/${url}`)}>
            <svg>
              <use xlinkHref="/img/sprites.svg#copy" />
            </svg>
          </div>
        </div>

        <div className="spacer" />
      </div>
    </div>
  );
};

export default Popup;
