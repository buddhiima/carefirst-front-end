import React, { useState, useEffect } from 'react'
import api from '../../api/axiosConfig'
import NavbarStaff from './NavbarStaff';
import Footer from '../Footer'
import DataTable from 'react-data-table-component'
import { Crossy } from 'react-bootstrap-icons';

const Products = () => {

    const [products, setProducts] = useState();
    const [product, setProduct] = useState();
    const [records, setRecords] = useState();
    const [filterRecords, setFilterRecords] = useState();

    const column = [
        {name: "Product ID", selector: row => row.id},
        {name:"Name", selector: row => row.name, sortable: true},
        {name:"Description", selector: row => row.description},
        {name:"Price", selector: row => row.price, sortable: true},
        {name:"Prescription Drug", selector: row => row.prescription_drug.toString(), sortable: true}
    ]

    useEffect(() => {
        document.title = 'Dashboard'
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
                <div className="container">
                    <div className="row">
                        <h2 className='display-4' style={{paddingTop:"2rem"}}>Products</h2>
                    </div>
                    <div className="row">
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
                    </div>
                </div>

                <div className="row">
                    <Footer/>
                </div>
                
            </body>
        </>
    )
}

export default Products