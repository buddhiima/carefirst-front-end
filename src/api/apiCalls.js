import axios from "./axiosConfig";
async function setDeleted(products, isDeleted) {
  try {
    await axios.delete(`/api/product/delete/${isDeleted === true ? 1 : 0}`, {
      data: products,
    });
    console.log("Deletion successful");
  } catch (error) {
    console.error("Error occurred while deleting:", error);
  }
}

export { setDeleted };
