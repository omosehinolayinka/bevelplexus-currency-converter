import React, { useContext } from "react";

import { Tooltip } from "antd";

import UserContext from "../../context/user/userContext";

function VerificationBox() {
  const userContext = useContext(UserContext);

  const {
    isEmailVerified,
    isIdentityVerified,
    isPhoneNumberVerified,
    isSchoolEnrollmentVerified,
    identityDocumentUrl,
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

  return (
    <div className='box-container'>
      <div className='shadow-box shadow-box-highlight'>
        <div className='box-heading'>
          <h3>
            LEVEL{" "}
            {isEmailVerified &&
            isPhoneNumberVerified &&
            isIdentityVerified &&
            identityDocumentUrl
              ? "2"
              : userContext.state.user.userType === "Student" &&
                isEmailVerified &&
                isPhoneNumberVerified &&
                isIdentityVerified &&
                identityDocumentUrl &&
                isSchoolEnrollmentVerified
              ? "2"
              : "1"}
          </h3>
          <Tooltip placement='bottomRight' title={text}>
            <img src='/assets/svg/info.svg' alt='icon' />
          </Tooltip>
        </div>

        <div className='subtitle'>
          <p>$1000 Dollar Limit</p>
        </div>

        <div className='wrap'>
          <p>
            Email Verification{" "}
            {isEmailVerified ? (
              <img src='/assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p>
          <p>
            Phone Verification
            {isPhoneNumberVerified ? (
              <img src='/assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p>
          {userContext.state.user.userType !== "Regular" && (
            <p className='fade-text'>
              School information
              {isSchoolEnrollmentVerified ? (
                <img src='/assets/svg/green-check-alt.svg' alt='' />
              ) : (
                <span className='material-icons'>close</span>
              )}
            </p>
          )}
          <p>
            ID Verification
            {isIdentityVerified ? (
              <img src='/assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p>

          <p>
            Identity Document
            {identityDocumentUrl ? (
              <img src='/assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerificationBox;
