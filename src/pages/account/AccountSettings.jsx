import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AccountSettings.scss";
import Layout from "../../components/layout/Layout";

import { Tooltip } from "antd";

function AccountSettings({ showTips }) {
  const [email, setEmail] = useState("Jordywakman@gmail.com");
  const [phone, setPhone] = useState("+87 456 899 2345");
  const [tab, setTab] = useState("settings");
  const [disableMail, setDisableMail] = useState(true);
  const [disablePhone, setDisablePhone] = useState(true);
  const [file, setFile] = useState("choose");

  const tooltipStyle = {
    display: 'flex',
    alignItems: 'flex-start',
  };

  const text = (
    <div style={tooltipStyle}>
      <img src='/assets/svg/info-alt.svg' alt='icon' style={{margin: '5px 12px 0 0'}} />
      <p style={{marginBottom: '0', fontSize: '13px'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est
        ligula, accumsan nec fermentum nec, vulputate et tellus. In non tellus
        et erat dapibus aliquet.
      </p>
    </div>
  );

  const handleFileUpload = () => {
    setFile("uploading");

    setTimeout(() => {
      setFile("completed");
    }, 3500);
  };

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
            <div
              className={
                tab === "settings"
                  ? "shadow-box  menu-item shadow-box-highlight"
                  : "shadow-box  menu-item"
              }
              onClick={() => setTab("settings")}
            >
              <span className='icon'>
                <img src='/assets/svg/gear.svg' alt='settings' />
              </span>
              <p>Account Settings</p>
            </div>

            <div
              className={
                tab === "verification"
                  ? "shadow-box  menu-item shadow-box-highlight"
                  : "shadow-box  menu-item"
              }
              onClick={() => setTab("verification")}
            >
              <span className='icon'>
                <img src='/assets/svg/flag.svg' alt='settings' />
              </span>
              <p>Verification Levels</p>
            </div>

            <div
              className={
                tab === "password"
                  ? "shadow-box  menu-item shadow-box-highlight"
                  : "shadow-box  menu-item"
              }
              onClick={() => setTab("password")}
            >
              <span className='icon'>
                <img src='/assets/svg/key.svg' alt='settings' />
              </span>
              <p>Change Password</p>
            </div>
          </section>
          <section className='tab-container'>
            <div className='page-header'>
              <div className='content-title'>
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
                <input type='text' value='Jordyn' disabled />
              </div>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/user.svg' alt='settings' />
                </span>
                <input type='text' value='Workman' disabled />
              </div>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/mail.svg' alt='settings' />
                </span>
                <input
                  className={!disableMail ? "active" : ""}
                  type='text'
                  value={email}
                  disabled={disableMail}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className='input-ctrl'
                  onClick={() => setDisableMail(!disableMail)}
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
                  value={phone}
                  disabled={disablePhone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  className='input-ctrl'
                  onClick={() => setDisablePhone(!disablePhone)}
                >
                  {disablePhone ? "Change" : "Save"}
                </button>
              </div>
            </div>

            <div className='page-header'>
              <div className='content-title'>
                <h2>Verification Levels</h2>
                <span className='badge success'>50% VERIFIED</span>
              </div>
            </div>

            <div className='box-wrapper'>
              <div className='box-container'>
                <div className='shadow-box shadow-box-highlight'>
                  <div className='box-heading'>
                    <h3>LEVEL 1</h3>
                    <Tooltip placement='bottomRight' title={text}>
                      <img src='/assets/svg/info.svg' alt='icon' />
                    </Tooltip>
                  </div>

                  <div className='subtitle'>
                    <p>$1000 Dollar Limit</p>
                  </div>

                  <div className='wrap'>
                    <p>Personal info </p>
                    <p>Phone Verification</p>
                    <p className='fade-text'>School information</p>
                    <p>Verification</p>
                  </div>
                </div>
              </div>

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
                    <p>
                      To upgrade to this level, upload your XXXX Document Below{" "}
                    </p>
                  </div>
                </div>
                <label>
                  <input
                    type='file'
                    name='file'
                    id='choose-file'
                    onChange={handleFileUpload}
                  />
                  {file === "choose" ? (
                    <div className='shadow-box button'>Choose File</div>
                  ) : file === "uploading" ? (
                    <div className='shadow-box button'>
                      <span className='progress'></span>{" "}
                      <span>Uploading File</span>
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
            </div>

            <div className='page-header'>
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
                <input type='text' placeholder='New password' />
              </div>
              <div className='shadow-box input-item'>
                <span className='icon'>
                  <img src='/assets/svg/key.svg' alt='settings' />
                </span>
                <input type='text' placeholder='Confirm new password' />
              </div>
            </div>
          </section>
        </section>

        <div className='save-button-container'>
          <Link to='#'>
            <button className='right' onClick={() => setFile("choose")}>
              Save Changes
            </button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export default AccountSettings;
