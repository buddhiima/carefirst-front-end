import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
import api from "../../api/axiosConfig";
import { useEffect } from "react";
import DataTable from "react-data-table-component";

function AddStockModal({ setOpenStockModel, selectedProduct = null }) {
  const [stocks, setStocks] = useState();
  const [rowsperpage, setRowsPerPage] = useState(5);
  const [isEditMode, setisEditMode] = useState(false);
  const [updatedRow, setUpdatedRow] = useState(null); // Track the updated row

  const column = [
    //  { name: "ID", selector: (row) => row.id },
    { name: "Batch", selector: (row) => row.batchnumber, sortable: true },
    { name: "Mfd", selector: (row) => row.menufacturedate },
    { name: "Exp", selector: (row) => row.expiredate },
    {
      name: "Price",
      selector: (row) => parseFloat(row.price).toFixed(2),
    },
    {
      name: "Qty",
      selector: (row) => parseFloat(row.qty).toFixed(2),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button variant="warning" onClick={() => handleActionButtonClick(row)}>
          Edit
        </Button>
      ),
    },
  ];

  const [product, setProduct] = useState({
    name: "",
    description: "",
    prescription_drug: false,
    price: "",
    isDeleted: false,
    stock: [],
  });

  const [stock, setStock] = useState({
    productid: "",
    expiredate: "",
    menufacturedate: "",
    price: "",
    batchnumber: "",
    qty: "",
    sold: 0,
    remaining: "",
    isDeleted: false,
    reason: "",
  });

  const [nstock] = useState({
    productid: "",
    expiredate: "",
    menufacturedate: "",
    price: "",
    batchnumber: "",
    qty: "",
    sold: 0,
    remaining: "",
    isDeleted: false,
    reason: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
      getStocks(selectedProduct.id);
    }
  }, [selectedProduct]);

  const handleActionButtonClick = (row) => {
    console.log(row);
    setisEditMode(true);
    setStock(row);
  };

  function handle(e) {
    const newStock = { ...stock };
    newStock[e.target.id] = e.target.value;
    setStock(newStock);
    console.log(newStock);
  }

  async function getStocks(id) {
    const response = await api.get("/api/product/stocks/" + id);
    setStocks(response.data ?? []);
  }

  async function addStock(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      if (
        stock.batchnumber === "" ||
        stock.menufacturedate === "" ||
        stock.expiredate === "" ||
        stock.price === "" ||
        stock.qty === ""
      ) {
        return;
      }
      await api.post("/api/product/stocks", {
        productid: selectedProduct.id,
        expiredate: stock.expiredate,
        menufacturedate: stock.menufacturedate,
        price: stock.price,
        batchnumber: stock.batchnumber,
        qty: stock.qty,
        sold: 0,
        remaining: stock.qty,
        reason: stock.reason,
      });

      getStocks(selectedProduct.id);
      setStock(nstock);
      //window.location.reload();
      //onCreateProductStock(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStock(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    console.log("stock", stock);
    try {
      await api.put("/api/product/stocks", {
        productid: selectedProduct.id,
        id: stock.id,
        batchnumber: stock.batchnumber,
        qty: stock.qty,
        isDeleted: stock.isDeleted,
        reason: stock.reason,
      });

      getStocks(selectedProduct.id);

      setUpdatedRow(stock.id); // Set the updated row ID for highlighting

      // Remove the highlight after 1 second
      setTimeout(() => {
        setUpdatedRow(null);
      }, 1000);
      setStock(nstock);
      setisEditMode(false);
      //window.location.reload();
      //onCreateProductStock(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="modalBackground" style={{ width: "100%" , height: "70%"}}>
      <div className="modalContainer" style={{ width: "auto", margin: "25px" , height: "130%"}}>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenStockModel(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <p className="display-4" style={{ fontSize: "1.5rem" }}>
            <strong>{"Product stocks"}</strong>
          </p>
          <hr />
        </div>

        <div className="body">
          <Row>
            <Form style={{ width: "auto" }}>
              <p style={{ width: "350px" }}>
                <strong>Product details</strong>
              </p>
              <Row style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <Col>
                  <Form.Label>Product Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder=""
                    id="name"
                    value={product.name}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <Form.Label>Batch</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    disabled={isEditMode}
                    type="text"
                    placeholder=""
                    id="batchnumber"
                    onChange={handle}
                    value={stock.batchnumber}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <Form.Label>Price</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    disabled={isEditMode}
                    type="number"
                    placeholder=""
                    id="price"
                    onChange={handle}
                    value={stock.price}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <Form.Label>Quantity</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder=""
                    id="qty"
                    onChange={handle}
                    value={stock.qty}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <Form.Label>Manufacture Date</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    disabled={isEditMode}
                    type="date"
                    placeholder=""
                    id="menufacturedate"
                    onChange={handle}
                    value={stock.menufacturedate}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <Form.Label>Expire Date</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    disabled={isEditMode}
                    type="date"
                    placeholder=""
                    id="expiredate"
                    onChange={handle}
                    value={stock.expiredate}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <Form.Label>Is Deleted</Form.Label>
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="isDeleted"
                    checked={stock.isDeleted}
                    onChange={(e) => {
                      setStock({
                        productid: stock.productid,
                        expiredate: stock.expiredate,
                        menufacturedate: stock.menufacturedate,
                        price: stock.price,
                        batchnumber: stock.batchnumber,
                        qty: stock.qty,
                        isDeleted: !stock.isDeleted,
                        id: stock.id,
                        reason: stock.reason,
                      });
                      console.log(stock);
                    }}
                    value={stock.isDeleted}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  marginBottom: "1rem",
                  display: isEditMode ? "flex" : "none",
                }}
              >
                <Col>
                  <Form.Label>Note</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder=""
                    id="reason"
                    onChange={handle}
                    value={stock.reason ?? ""}
                  />
                </Col>
              </Row>
              <div className="footer">
                <Button
                  variant="success"
                  style={{ marginRight: "2rem" }}
                  onClick={(e) => {
                    //add or edit stock
                    if (isEditMode) updateStock(e);
                    else addStock(e);
                  }}
                >
                  {isEditMode ? "Edit" : "Add"}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setStock(nstock);
                    console.log(stock);
                    setisEditMode(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </Form>
            <div style={{ width: "650px", height: "800px" }}>
              <Col>
                <strong>Stocks</strong>
                <DataTable
                  columns={column}
                  data={stocks}
                  pagination
                  paginationPerPage={rowsperpage}
                  paginationRowsPerPageOptions={[5, 10, 20, 100]}
                  onChangeRowsPerPage={(n) => {
                    setRowsPerPage(n);
                  }}
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
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AddStockModal;
