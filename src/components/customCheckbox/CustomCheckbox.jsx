import React from 'react'
import {Link} from 'react-router-dom'
import './CustomCheckbox.scss'

function Checkbox({checked, title, subLeft, subRight, action, actionLink, green}) {
  return (
    <div id='custom-checkbox'>
      <div className="checkbox">
        {checked && <div className="checkbox__inner" />}
      </div>

      <div className="wrapper">
        <div className="checkbox-details">
          <p> {title} </p>
          <p className='sub-details'><span> {subLeft} </span> <span> {subRight} </span></p>
        </div>

        <div className="checkbox-action">
          <Link to={actionLink || '#'} className={green ? 'green' : ''}> {action} </Link>
        </div>
      </div>
    </div>
  )
}

export default Checkbox
