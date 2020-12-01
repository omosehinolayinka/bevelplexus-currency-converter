import React, { useState } from "react";

function Pagination( { context } ) {
  const [current, setCurrent] = useState(1);


  console.log(Math.ceil((context.state.total)/5));

  const styledPagination = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "3rem 0",
    width: "100%",
  };

  const styledInner = {
    width: "fit-content",
    background: "#fff",
    padding: "5px",
    display: "flex",
  };

  const styledBtn = {
    all: "unset",
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#333333",
    margin: "0 7px",
  };

  const styledBtnActive = {
    ...styledBtn,
    background: "#015EFF",
    color: "#fff",
    borderRadius: "5px",
  };

  return (
    <div id='pagination' style={styledPagination}>
      <div style={styledInner}>
        <button style={styledBtn}>
          <span className='material-icons'>chevron_left</span>
        </button>
        <button
          style={current === 1 ? styledBtnActive : styledBtn}
          onClick={() => setCurrent(1)}
        >
          1
        </button>
        <button
          style={current === 2 ? styledBtnActive : styledBtn}
          onClick={() => setCurrent(2)}
        >
          2
        </button>
        <button
          style={current === 3 ? styledBtnActive : styledBtn}
          onClick={() => setCurrent(3)}
        >
          3
        </button>

        <button style={styledBtn}>
          <span className='material-icons'>chevron_right</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
