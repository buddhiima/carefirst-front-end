import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react'
import api from '../../api/axiosConfig'

function AddProductModal({setOpenAddProductsModal, createProduct}) {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        prescription_drug: false,
        price: ""
    });

    function handle (e) {
        const newProduct = {...product}
        newProduct[e.target.id] = e.target.value
        setProduct(newProduct)
        console.log('newProduct ', newProduct)
    }

    function createProduct(e) {
        if(e && e.preventDefault) {
            e.preventDefault()
        }

        try {
            const response = api.post("/api/product", {
            name: product.name,
            description: product.description,
            prescription_drug: product.prescription_drug,
            price: product.price
        })
        setOpenAddProductsModal(false);
        }
        catch(err) {
            console.log(err)
        }
    }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenAddProductsModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <p className="display-4" style={{fontSize:"1.5rem"}}>ADD A NEW PRODUCT</p>
          <hr/>
        </div>

        <div className="body">
            <Form>
                <Row style={{marginBottom:"1rem", marginTop:"1rem"}}>
                    <Col>
                        <Form.Label>Product Name</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="" id="name" onChange={(e)=>handle(e)} value={product.name}/>
                    </Col>
                </Row>
                <Row style={{marginBottom:"1rem"}}>
                    <Col>
                        <Form.Label>Description</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control as="textarea" rows={3} id="description" onChange={(e)=>handle(e)} value={product.description}/>
                    </Col>
                </Row>
                <Row style={{marginBottom:"1rem"}}>
                    <Col>
                        <Form.Label>Prescription Drug</Form.Label>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" id="prescription_drug" checked={product.prescription_drug} onChange={(e)=>handle(e)} value={product.prescription_drug}/>
                    </Col>
                </Row>
                <Row style={{marginBottom:"1rem"}}>
                    <Col>
                        <Form.Label>Unit Price</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="number" placeholder="" id="price" onChange={(e)=>handle(e)} value={product.price}/>
                    </Col>
                </Row>
            </Form>
        </div>

        <div className="footer">
          <Button variant="success" style={{marginRight:"2rem"}} onClick={(e)=>{createProduct()}}>Save</Button>
          <Button variant="danger" onClick={()=>{setOpenAddProductsModal(false)}}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal