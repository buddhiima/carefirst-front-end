import React, { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import NavbarStaff from "./NavbarStaff";
import Footer from "../Footer";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddProductModal from "./AddProductModal";

import { setDeleted } from "../../api/apiCalls";
import "../../product.css";
import { useRef } from "react";
import AddStockModal from "./AddStockModal";
const Products = () => {
  const [products, setProducts] = useState();
  const [records, setRecords] = useState();
  const [filterRecords, setFilterRecords] = useState();
  const [openAddProductsModal, setOpenAddProductsModal] = useState(false);
  const [openEditProductsModal, setOpenEditProductsModal] = useState(false);
  const [OpenStockModel, setOpenStockModel] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [updatedRow, setUpdatedRow] = useState(null); // Track the updated row
  const tableRef = useRef(null);

  const column = [
    { name: "", selector: (row) => <img src={row.imageURL} style={{ width: 60, height: 60 }} slt="img"/> },
    { name: "Product ID", selector: (row) => row.id },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Description", selector: (row) => row.description },
    {
      name: "Price",
      selector: (row) => parseFloat(row.price).toFixed(2),
      sortable: true,
    },
    {
      name: "Prescription Drug",
      selector: (row) => row.prescription_drug.toString(),
      sortable: true,
    },
    { name: "Discontinued", selector: (row) => row.isDeleted.toString(),
      sortable: true, 
    },
  ];

  useEffect(() => {
    document.title = "Products";
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get("/api/product");
      console.log(response.data);
      setProducts(response.data);
      setRecords(response.data);
      setFilterRecords(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFilter = (event) => {
    console.log("filterRecords", filterRecords, event.target.value);
    const newData = filterRecords.filter((row) => {
      console.log(row.id);
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };
  const productMarkAs = async (isDelete) => {
    //
    await setDeleted(
      selectedRows.map((e) => e.id),
      isDelete
    );
    getProducts();
    clearSelection();
  };

  const clearSelection = () => {
    window.location.reload();
  };

  const handleCreateProduct = (product) => {
    // Logic for creating the product
    console.log("created", product);
    getProducts();
  };

  const handleUpdateProduct = (product) => {
    // Logic for updating the product
    console.log("updated", product);
    getProducts();
    setUpdatedRow(product.id); // Set the updated row ID for highlighting

    // Remove the highlight after 1 second
    setTimeout(() => {
      setUpdatedRow(null);
    }, 1000);
  };

  return (
    <>
      <header className="App-header">
        <NavbarStaff />
      </header>

      <body>
        {openAddProductsModal && (
          <AddProductModal
            setOpenAddProductsModal={setOpenAddProductsModal}
            onCreateProduct={handleCreateProduct}
          />
        )}
        {openEditProductsModal && (
          <AddProductModal
            setOpenAddProductsModal={setOpenEditProductsModal}
            selectedProduct={selectedRows[0]}
            onUpdateProduct={handleUpdateProduct}
          />
        )}
        {OpenStockModel && (
          <AddStockModal
            setOpenStockModel={setOpenStockModel}
            selectedProduct={selectedRows[0]}
          />
        )}{" "}
        <Container className="product-main-section">
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <p
                className="display-4"
                style={{ fontSize: "3rem", marginLeft: "1rem" }}
              >
                PRODUCTS
              </p>
            </Col>
          </Row>
          <Col>
            <Row className="actionpane">
              <div style={{ width: "auto" }}>
                <Button
                  variant="success"
                  style={{ width: "auto", margin: "15px" }}
                  onClick={() => {
                    setOpenAddProductsModal(true);
                  }}
                >
                  + New
                </Button>
                <Button
                  disabled={
                    selectedRows.length > 1 || selectedRows.length === 0
                  }
                  variant="success"
                  style={{ width: "auto", margin: "15px" }}
                  onClick={() => {
                    setOpenStockModel(true);
                  }}
                >
                  View/Add stock
                </Button>{" "}
                <Button
                  disabled={
                    selectedRows.length > 1 || selectedRows.length === 0
                  }
                  style={{ width: "auto", margin: "15px" }}
                  variant="success"
                  onClick={() => {
                    setOpenEditProductsModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  disabled={selectedRows.length === 0}
                  style={{ width: "auto", margin: "15px" }}
                  variant="danger"
                  onClick={() => {
                    //delete
                    productMarkAs(true);
                  }}
                >
                  Mark as Delete
                </Button>
                <Button
                  disabled={selectedRows.length === 0}
                  style={{ width: "auto", margin: "15px" }}
                  variant="warning"
                  onClick={() => {
                    //active
                    productMarkAs(false);
                  }}
                >
                  Mark as Active
                </Button>
              </div>
              <div
                style={{
                  width: "auto",
                  margin: "15px",
                  //   flex: "1",
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleFilter}
                  style={{ padding: "6px 10px" }}
                />
              </div>
            </Row>
            <DataTable
              columns={column}
              data={records}
              pagination
              selectableRows
              clearSelectedRows
              selectableRowsHighlight
              //ref={tableRef}
              onSelectedRowsChange={handleSelectedRowsChange}
              conditionalRowStyles={[
                {
                  when: (row) => row.isDeleted === true,
                  style: {
                    backgroundColor: "#f55858", // Set the desired background color
                    color: "white", // Set the desired text color
                  },
                },
                {
                  when: (row) => row.id === updatedRow, // Apply highlight to the updated row
                  style: {
                    animation: "highlight 1s", // CSS animation for highlighting
                  },
                },
              ]}
            ></DataTable>
          </Col>
        </Container>
        <Row>
          <Footer />
        </Row>
      </body>
    </>
  );
};

export default Products;
