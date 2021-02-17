import React, { useContext } from "react";

import { Tooltip } from "antd";

import UserContext from "../../context/user/userContext";

function VerificationBox() {

  const userContext = useContext(UserContext);

  const redirect = () => {
    window.location = `${process.env.REACT_APP_BASEURL}/complete-verification` || "https://app.bevelplexus.com/complete-verification";
  };

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
        src='./assets/svg/info-alt.svg'
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
            LEVEL
            {userContext.state.user.userType === "Regular" &&
            isEmailVerified &&
            isPhoneNumberVerified &&
            isIdentityVerified &&
            isUtilityBillVerified
              ? "2"
              : userContext.state.user.userType === "Student" &&
                isEmailVerified &&
                isPhoneNumberVerified &&
                isIdentityVerified &&
                isUtilityBillVerified &&
                isSchoolEnrollmentVerified
              ? "2"
              : "1"}
          </h3>
          <Tooltip placement='bottomRight' title={text}>
            <img src='./assets/svg/info.svg' alt='icon' />
          </Tooltip>
        </div>

        <div className='subtitle'>
          <p>
            {userContext.state.user.userType === "Regular" &&
            isEmailVerified &&
            isPhoneNumberVerified &&
            isIdentityVerified &&
            isUtilityBillVerified
              ? "$2000 Dollar Limit"
              : userContext.state.user.userType === "Student" &&
                isEmailVerified &&
                isPhoneNumberVerified &&
                isIdentityVerified &&
                isUtilityBillVerified &&
                isSchoolEnrollmentVerified
              ? "$2000 Dollar Limit"
              : "$1000 Dollar Limit"}
          </p>
        </div>

        <div className='wrap'>
          <p>
            Email Verification{" "}
            {isEmailVerified ? (
              <img src='./assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p>
          <p>
            Phone Verification
            {isPhoneNumberVerified ? (
              <img src='./assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p>
          {/* {userContext.state.user.userType !== "Regular" && (
            <p className='fade-text'>
              School information
              {isSchoolEnrollmentVerified ? (
                <img src='./assets/svg/green-check-alt.svg' alt='' />
              ) : (
                <span className='material-icons'>close</span>
              )}
            </p>
          )} */}
          <p>
            ID Verification
            {isIdentityVerified ? (
              <img src='./assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p>

          {/* <p>
            Utility bill verifiation
            {isUtilityBillVerified ? (
              <img src='./assets/svg/green-check-alt.svg' alt='' />
            ) : (
              <span className='material-icons'>close</span>
            )}
          </p> */}
        </div>
      </div>

      {(!isEmailVerified || !isPhoneNumberVerified || !isIdentityVerified) && (
        <label onClick={() => redirect()}>
          <div className='shadow-box button'>Complete Verification</div>
        </label>
      )}
    </div>
  );
}

export default VerificationBox;
