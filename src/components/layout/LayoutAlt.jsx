import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Layout.scss";

import Sidebar from "./RightSidebar";
import Header from "./Header";
import Intro from "../../components/intro/Intro";

function Layout({ currentMenu, children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [rightSidebar, setRightSidebar] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [introPosition, setIntroPosition] = useState();
  const [showIntro, setShowIntro] = useState(false);

  const introRef = useRef(null);

  useEffect(() => {
    setIntroPosition(introRef.current.offsetTop);

    showIntro && window.addEventListener("resize", () => {
      setIntroPosition(introRef.current.offsetTop);
    });

    setTimeout(() => {
      setShowIntro(true);
    }, 1000);

    // eslint-disable-next-line
  }, []);

  return (
    <div id='layout' className='withRightSidebar'>
      <section
        className={
          showSidebar === true ? "sidebar-wrapper" : "sidebar-wrapper-closed"
        }
      >
        <aside
          id={animate ? "animate" : ""}
          className={showSidebar ? "sidebar-expanded" : ""}
        >
          <div className='logo-container'>
            <img src='/assets/svg/logo.svg' alt='' />
          </div>

          <nav>
            <ul>
              <li
                className={currentMenu === "dashboard" ? "active" : ""}
                ref={currentMenu === "dashboard" ? introRef : null}
              >
                <Link to='/'>
                  <img src='/assets/svg/home-icon.svg' alt='home' />
                  Dashboard
                </Link>
              </li>
              <li
                className={currentMenu === "payment" ? "active" : ""}
                ref={currentMenu === "payment" ? introRef : null}
              >
                <Link to='/payment/recipient'>
                  <img src='/assets/svg/wallet-icon.svg' alt='home' />
                  Make payment
                </Link>
              </li>
              <li
                className={currentMenu === "transaction" ? "active" : ""}
                ref={currentMenu === "transaction" ? introRef : null}
              >
                <Link to='/transactions'>
                  <img src='/assets/svg/hourglass-icon.svg' alt='home' />
                  Transaction history
                </Link>
              </li>
              <li
                className={currentMenu === "recipients" ? "active" : ""}
                ref={currentMenu === "recipients" ? introRef : null}
              >
                <Link to='/recipients'>
                  <img src='/assets/svg/contact-icon.svg' alt='home' />
                  Recipients
                </Link>
              </li>
              <li
                className={currentMenu === "account" ? "active" : ""}
                ref={currentMenu === "account" ? introRef : null}
              >
                <Link to='/account'>
                  <img src='/assets/svg/user-icon.svg' alt='home' />
                  My Account
                </Link>
              </li>
            </ul>
          </nav>

          <div className='bg-shape'>
            <img src='/assets/svg/sidebar-shape.svg' alt='bg-shape' />
          </div>
        </aside>

        <div
          className='close-section'
          onClick={() => setShowSidebar(false)}
        ></div>
      </section>

      <section className='main-content'>
        <Header
          withRightSidebar={true}
          collapseRightSidebar={setRightSidebar}
          rightSidebarStatus={rightSidebar}
          toggleSidebar={setShowSidebar}
          sidebarStatus={showSidebar}
          animateSidebar={setAnimate}
        />
        {children}

        {showIntro && (
          <Intro
            title={
              currentMenu === "dashboard"
                ? "Dashboard"
                : currentMenu === "payment"
                ? "Make Payment"
                : currentMenu === "transaction"
                ? "Transaction History"
                : currentMenu === "recipients"
                ? "recipients"
                : currentMenu === "account"
                ? "My Account"
                : ""
            }
            message={
              currentMenu === "dashboard"
                ? "This is Your Dashboard. It gives you a view of your most recent activities when you login"
                : currentMenu === "payment"
                ? "Easily make a transfer here by selecting a recipient and amount"
                : currentMenu === "transaction"
                ? "View your Transaction History here to see all your payment activities"
                : currentMenu === "recipients"
                ? "View and add information on your who you'll like to send money to"
                : currentMenu === "account"
                ? "You can easily manage your profile information and identification here"
                : ""
            }
            number={
              currentMenu === "dashboard"
                ? "1/5"
                : currentMenu === "payment"
                ? "2/5"
                : currentMenu === "transaction"
                ? "3/5"
                : currentMenu === "recipients"
                ? "4/5"
                : currentMenu === "account"
                ? "5/5"
                : ""
            }
            next={
              currentMenu === "dashboard"
                ? "/payment"
                : currentMenu === "payment"
                ? "/transactions"
                : currentMenu === "transaction"
                ? "recipients"
                : currentMenu === "recipients"
                ? "/account"
                : currentMenu === "account"
                ? "/"
                : ""
            }
            position={introPosition}
          />
        )}
      </section>

      <section>
        <Sidebar
          collapsed={rightSidebar}
          collapseRightSidebar={setRightSidebar}
        />
      </section>
    </div>
  );
}

export default Layout;
