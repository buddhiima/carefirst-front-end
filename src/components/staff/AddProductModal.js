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
        price: "",
        imageURL: "",
        isDeleted: false
    });

    function handleFormChange (e) {
        const {value, type, checked, id} = e.target
        
        const newProduct = {...product}

        if(type === "checkbox") {
            newProduct[e.target.id] = e.target.checked
        }
        else {
            newProduct[e.target.id] = e.target.value
        }

        setProduct(newProduct)
        console.log('newProduct ', newProduct)
    }

    function validateSubmit(product) {
        var errors = []

        if(!product.name) {
            errors.push("Product name is empty!")
        }
        if(!product.description) {
            errors.push("Product description is empty!")
        }
        if(!product.price) {
            errors.push("Product price is empty!")
        }
        if(!product.imageURL) {
            errors.push("Product image URL is empty!")
        }

        return errors
    }

    function createProduct(e) {
        if(e && e.preventDefault) {
            e.preventDefault()
        }

        var validations = validateSubmit(product)

        if(validations.length == 0) {
            var formData = new FormData();
            formData.append("name", product.name)
            formData.append("description", product.description)
            formData.append("prescription_drug", product.prescription_drug)
            formData.append("price", product.price)
            formData.append("imageURL", product.imageURL)
            formData.append("isDeleted", product.isDeleted)

            api({
                method: "post",
                url: "/api/product",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                if(response.status == 201) {
                    setOpenAddProductsModal(false);
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('Could not add product!')
            });
        }
        else {
            var error_msgs = ""
            validations.forEach(error => {
                error_msgs = error_msgs + error + "\n"
            })
            alert(error_msgs)
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
                        <Form.Control type="text" placeholder="" id="name" value={product.name} onChange={(e)=>handleFormChange(e)}/>
                    </Col>
                </Row>
                <Row style={{marginBottom:"1rem"}}>
                    <Col>
                        <Form.Label>Description</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control as="textarea" rows={3} id="description" value={product.description} onChange={(e)=>handleFormChange(e)}/>
                    </Col>
                </Row>
                <Row style={{marginBottom:"1rem"}}>
                    <Col>
                        <Form.Label>Prescription Drug</Form.Label>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" id="prescription_drug" checked={product.prescription_drug} onChange={(e)=>handleFormChange(e)}/>
                    </Col>
                </Row>
                <Row style={{marginBottom:"1rem"}}>
                    <Col>
                        <Form.Label>Unit Price</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="number" placeholder="" id="price" value={product.price} onChange={(e)=>handleFormChange(e)}/>
                    </Col>
                </Row>
                <Row style={{marginBottom:"1rem", marginTop:"1rem"}}>
                    <Col>
                        <Form.Label>Image URL</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control as="textarea" rows={2} id="imageURL" value={product.imageURL} onChange={(e)=>handleFormChange(e)}/>
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