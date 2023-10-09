import React from 'react'
import icon from '../assets/delete.svg'

const NoteItem = (props) => {
  return (
    <>
      <div style={{ paddingTop: '10px' }} className="">
        {/* <div className="card container  text-bg-primary mb-3" style={{ maxWidth: '500px' }}>
          <div style={{ alignItems: "center", justifyContent: 'flex-end' }} className="holder container d-flex">
            <div className="card-header">6 October, 2023<span style={{marginLeft: '25px'}} className="icons">
              <span><img style={{filter: "invert(100%)"}} src={icon} alt="" width="20px" /></span>
            </span> </div>

          </div>

          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
          </div>
        </div> */}

        <div class="card text-bg-primary mb-3" style={{margin: '0px auto',maxWidth: '500px'}}>
          <div class="card-header">{props.date}</div>
          <div class="card-body">
            <h5 class="card-title">{props.title}</h5>
            <p class="card-text">{props.desc}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoteItem
