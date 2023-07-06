import React, { useState, useEffect } from 'react'
import api from '../../api/axiosConfig'
import NavbarStaff from './NavbarStaff';
import Footer from '../Footer'
import DataTable from 'react-data-table-component'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AddProductModal from './AddProductModal';


const Products = () => {

    const [products, setProducts] = useState();
    const [records, setRecords] = useState();
    const [filterRecords, setFilterRecords] = useState();
    const[openAddProductsModal, setOpenAddProductsModal] = useState(false);

    const column = [
        {name:"", selector: row => <img style={{ width: 60, height: 60 }} src={row.imageURL} alt="img"></img> },
        {name:"Product ID", selector: row => row.id},
        {name:"Name", selector: row => row.name, sortable: true},
        {name:"Description", selector: row => row.description},
        {name:"Price", selector: row => row.price, sortable: true},
        {name:"Prescription Drug", selector: row => row.prescription_drug.toString(), sortable: true},
        
    ]

    useEffect(() => {
        document.title = 'Products'
        getProducts();
    }, [])


    const getProducts = async() => {
        try {
            const response = await api.get("/api/product")
            console.log(response.data)
            setProducts(response.data)
            setRecords(response.data)
            setFilterRecords(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    const handleFilter = (event) => {
        const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setRecords(newData)
    }

    return (
        <>
            <header className="App-header">
                <NavbarStaff/>
            </header>

            <body>
                <Container>
                    <Row style={{marginTop:"2rem"}}>
                        <Col>
                            <p className="display-4" style={{fontSize:"3rem", marginLeft:"1rem"}}>PRODUCTS</p>
                        </Col>
                        <Col>
                            <Button variant="success" style={{marginLeft:"19.5rem", marginTop:"1.5rem"}} onClick={()=>{setOpenAddProductsModal(true)}}>+ New</Button>
                        </Col>
                        {openAddProductsModal && <AddProductModal setOpenAddProductsModal={setOpenAddProductsModal}/>}
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <div style={{padding:"10px 10%", backgroundColor:"white"}}>
                            <div style={{display:"flex", justifyContent:"right"}}>
                                <input type="text" placeholder='Search' onChange={handleFilter} style={{padding:"6px 10px"}}/>
                            </div>
                        </div>
                        <DataTable
                        columns={column}
                        data = {records}
                        pagination
                        selectableRows
                        ></DataTable>
                    </Row>
                </Container>

                <Row>
                    <Footer/>
                </Row>
            </body>
        </>
    )
}

export default Products