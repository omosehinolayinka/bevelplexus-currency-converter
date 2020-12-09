import React, { useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./AccountSettings.scss";

import UserContext from "../../context/user/userContext";

import Layout from "../../components/layout/Layout";
import VerificationBox from "../../components/verificationBox/VerificationBox";
import VerificationBoxFile from "../../components/verificationBox/VerificationBoxFile";

import { Link } from "react-scroll";

const AccountSettings = ({ showTips }) => {
  const userContext = useContext(UserContext);
  const [tab, setTab] = useState("settings");
  const [disableMail, setDisableMail] = useState(true);
  const [disablePhone, setDisablePhone] = useState(true);
  const [reset, setReset] = useState(true);

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    userContext.getUser(setUser);

    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setLoading(true);
    setReset(true);

    if (
      password.newPassword === "" ||
      password.oldPassword === "" ||
      (password.newPassword.length < 8 && password.newPassword.length > 0)
    ) {

      setTimeout(() => {
        setLoading(false)
      }, 2000);
    } else {
      userContext.resetPassword(password, setLoading);
    }
  };

  const updateUser = () => {
    userContext.updateUser(user);
    userContext.getUser(setUser);
  };

  const handleMailSubmit = () => {
    if (disableMail === true) {
      setDisableMail(false);
    } else {
      updateUser();
      setDisableMail(true);
    }
  };

  const handlePhoneSubmit = () => {
    if (disablePhone === true) {
      setDisablePhone(false);
    } else {
      updateUser();
      setDisablePhone(true);
    }
  };

  const {
    isEmailVerified,
    isIdentityVerified,
    isPhoneNumberVerified,
    isSchoolEnrollmentVerified,
    identityDocumentUrl,
  } = userContext.state.user.userVerification;

  return (
    <div id='account'>
      <Layout currentMenu='account' showTips={showTips}>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Transactions</h4>
          </div>

          <div className='content-title'>
            <h2>My Account</h2>
          </div>
        </div>

        <section className='main-wrapper'>
          <section className='tab-menu-container'>
            <Link
              className={
                tab === "settings"
                  ? "shadow-box  menu-item shadow-box-highlight"
                  : "shadow-box  menu-item"
              }
              onClick={() => setTab("settings")}
              to='accountSettings'
              smooth={true}
              duration={400}
            >
              <span className='icon'>
                <img src='/assets/svg/gear.svg' alt='settings' />
              </span>
              <p>Account Settings</p>
            </Link>

            <Link
              className={
                tab === "verification"
                  ? "shadow-box  menu-item shadow-box-highlight"
                  : "shadow-box  menu-item"
              }
              onClick={() => setTab("verification")}
              to='verificationSettings'
              smooth={true}
              duration={600}
            >
              <span className='icon'>
                <img src='/assets/svg/flag.svg' alt='settings' />
              </span>
              <p>Verification Levels</p>
            </Link>

            <Link
              className={
                tab === "password"
                  ? "shadow-box  menu-item shadow-box-highlight"
                  : "shadow-box  menu-item"
              }
              onClick={() => setTab("password")}
              to='changePassword'
              smooth={true}
              duration={800}
            >
              <span className='icon'>
                <img src='/assets/svg/key.svg' alt='settings' />
              </span>
              <p>Change Password</p>
            </Link>
          </section>
          <section className='tab-container'>
            <div className='page-header'>
              <div id='accountSettings' className='content-title'>
                <h2>Account Settings</h2>
              </div>
              <div className='page-title'>
                <h4>PERSONAL INFORMATION</h4>
              </div>
            </div>

            <div className='form-container'>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/user.svg' alt='settings' />
                </span>
                <input type='text' value={user.firstName} disabled />
              </div>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/user.svg' alt='settings' />
                </span>
                <input type='text' value={user.lastName} disabled />
              </div>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/mail.svg' alt='settings' />
                </span>
                <input
                  className={!disableMail ? "active" : ""}
                  type='text'
                  name='email'
                  value={user.email}
                  disabled={disableMail}
                  onChange={(e) => handleChange(e)}
                />
                <button
                  className='input-ctrl'
                  onClick={() => handleMailSubmit()}
                >
                  {disableMail ? "Change" : "Save"}
                </button>
              </div>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/mail.svg' alt='settings' />
                </span>
                <input
                  className={!disablePhone ? "active" : ""}
                  type='text'
                  name='phoneNumber'
                  value={user.phoneNumber}
                  disabled={disablePhone}
                  onChange={(e) => handleChange(e)}
                />
                <button
                  className='input-ctrl'
                  onClick={() => handlePhoneSubmit()}
                >
                  {disablePhone ? "Change" : "Save"}
                </button>
              </div>
            </div>

            <div id='verificationSettings' className='page-header'>
              <div className='content-title'>
                <h2>Verification Levels</h2>
                <span className='badge success'>50% VERIFIED</span>
              </div>
            </div>

            <div className='box-wrapper'>
              <VerificationBox />
              {!isIdentityVerified ||
              !isEmailVerified ||
              !isPhoneNumberVerified ||
              !identityDocumentUrl ? (
                <VerificationBoxFile reset={reset} setReset={setReset} />
              ) : userContext.state.user.userType === "Student" &&
                !isSchoolEnrollmentVerified ? (
                <VerificationBoxFile reset={reset} setReset={setReset} />
              ) : (
                ""
              )}
            </div>

            <div id='changePassword' className='page-header'>
              <div className='content-title'>
                <h2>Change Password</h2>
              </div>
              <div className='page-title'>
                <h4>This will change your previous account password</h4>
              </div>
            </div>

            <div className='form-container'>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/key.svg' alt='settings' />
                </span>
                <input
                  type='password'
                  name='oldPassword'
                  placeholder='Old password'
                  value={password.oldPassword}
                  onChange={handlePassword}
                />
              </div>
              <div
                className={`shadow-box input-item ${
                  password.newPassword.length < 8 &&
                  password.newPassword.length > 0 &&
                  "incorrect"
                }`}
              >
                <span className='icon'>
                  <img src='/assets/svg/key.svg' alt='settings' />
                </span>
                <input
                  type='password'
                  name='newPassword'
                  placeholder='New password'
                  value={password.newPassword}
                  onChange={handlePassword}
                />
              </div>
            </div>
          </section>
        </section>

        <div className='save-button-container'>
          <Link to='#'>
            <button className='right' onClick={handleSave}>
              {loading ? (
                <img src='/assets/svg/spinner.svg' alt='spinner' />
              ) : (
                "Save Changes"
              )}
            </button>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default AccountSettings;
