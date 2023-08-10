import React from 'react'
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";

function ViewProductModal({setOpenViewProductModal, product}) {
  
  return (
    <div className="modalBackground">
      <div className="modalContainerProduct">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenViewProductModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <center><p className="display-4" style={{fontSize:"1.5rem", fontWeight:"400"}}>{product.name}</p></center>
          <hr/>
        </div>

        <div className="body">
         <center>
            <Row>
              <img src={product.imageURL} style={{width:"200px", height:"200px", margin:"auto"}}></img>
            </Row>
            <Row>
              <p style={{marginTop:"2rem", marginBottom:"2rem"}}>{product.description}</p>
            </Row>
            <Row>
              {product.prescription_drug.toString() == "true" ?
                <p style={{color:"#000000", backgroundColor:"#FFB031", width:"25rem", margin:"auto", marginBottom:"1rem", padding:"0.3rem"}}>Prescription is needed when placing order</p>
                :
                <p style={{color:"#000000", backgroundColor:"#FFB031", width:"10rem", margin:"auto", marginBottom:"1rem", padding:"0.3rem", visibility:"hidden"}}>Prescription needed</p>}
            </Row>
            <Row>
              <h5 style={{backgroundColor:"green", color:"#FFFFFF", padding:"0.6rem", width:"10rem", margin:"auto", borderRadius:"5rem", marginTop:"1rem"}}>Rs. {product.price}</h5>
            </Row>
         </center>
        </div>

        <div className="footer">
        </div>
      </div>
    </div>
  )
}

export default ViewProductModal