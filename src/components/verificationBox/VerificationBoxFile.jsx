import React, { useState, useContext } from "react";

import { Tooltip } from "antd";

import UserContext from "../../context/user/userContext";

function VerificationBoxFile({ reset, setReset }) {
  const [file, setFile] = useState("choose");

  const userContext = useContext(UserContext);

  const {
    isEmailVerified,
    isIdentityVerified,
    isPhoneNumberVerified,
    isSchoolEnrollmentVerified,
    isUtilityBillVerified,
  } = userContext.state.user.userVerification;

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

  const handleFileUpload = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    setFile("uploading");
    setReset(false);

    if (
      userContext.state.userType === "Student" &&
      isIdentityVerified &&
      isUtilityBillVerified
    ) {
      validity.valid && userContext.verifyEnrollment(file, setFile)
    } else if (isIdentityVerified) {
      validity.valid && userContext.verifyUtility(file, setFile)
    } else {
      validity.valid && userContext.verifyIdentity(file, setFile);
    }
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
          {isEmailVerified && isPhoneNumberVerified && !isIdentityVerified ? (
            <p>
              Upload a photo of a valid ID, to complete Level 1 verification
              before upgrading to level 2
            </p>
          ) : isIdentityVerified && !isUtilityBillVerified ? (
            <p>
              To upgrade to this level, upload a photo of your utility bill
              Below{" "}
            </p>
          ) : userContext.state.user.userType === "Student" &&
            !isSchoolEnrollmentVerified ? (
            <p>
              To upgrade to this level, upload your school enrollment Document
              Below
            </p>
          ) : (
            <p>Please complete level one verification first </p>
          )}
        </div>
      </div>

      {(isEmailVerified && isPhoneNumberVerified && !isIdentityVerified) ||
      (isEmailVerified && isPhoneNumberVerified && !isUtilityBillVerified) ||
      (isEmailVerified && isPhoneNumberVerified && !isSchoolEnrollmentVerified) ? (
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
      ) : (
        ""
      )}
    </div>
  );
}

export default VerificationBoxFile;
