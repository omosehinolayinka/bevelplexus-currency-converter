import React, { useState } from "react";

import { Tooltip } from "antd";

function VerificationBoxFile( { reset, setReset } ) {
  const [file, setFile] = useState("choose");

  const tooltipStyle = {
    display: "flex",
    alignItems: "flex-start",
  };

  const text = (
    <div style={tooltipStyle}>
      <img
        src='/assets/svg/info-alt.svg'
        alt='icon'
        style={{ margin: "5px 12px 0 0" }}
      />
      <p style={{ marginBottom: "0", fontSize: "13px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est
        ligula, accumsan nec fermentum nec, vulputate et tellus. In non tellus
        et erat dapibus aliquet.
      </p>
    </div>
  );

  const handleFileUpload = () => {
    setFile("uploading");
    setReset(false)

    setTimeout(() => {
      setFile("completed");
    }, 3500);
  };

  return (
    <div className='box-container'>
      <div className='shadow-box'>
        <div className='box-heading'>
          <h3>LEVEL 2</h3>
          <Tooltip placement='bottomRight' title={text}>
            <img src='/assets/svg/info.svg' alt='icon' />
          </Tooltip>
        </div>

        <div className='subtitle'>
          <p>$2000 Dollar Limit</p>
        </div>

        <div className='wrap'>
          <p>To upgrade to this level, upload your XXXX Document Below </p>
        </div>
      </div>
      <label>
        <input
          type='file'
          name='file'
          id='choose-file'
          onChange={handleFileUpload}
        />
        {reset === true ? (
          <div className='shadow-box button'>Choose File</div>
        ) : file === "uploading" ? (
          <div className='shadow-box button'>
            <span className='progress'></span> <span>Uploading File</span>
          </div>
        ) : file === "completed" ? (
          <div className='shadow-box button green'>
            File uploaded <span className='material-icons'>done</span>
          </div>
        ) : (
          ""
        )}
      </label>
    </div>
  );
}

export default VerificationBoxFile;
