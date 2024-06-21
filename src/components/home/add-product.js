import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

const AddProduct = ({ getProducts }) => {
  const usersCollectionRef = collection(db, "products");
  const [newName, setNewName] = useState("");
  const [newCategory, setCategory] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const createProduct = async (e) => {
    e.preventDefault();
    setLoader(true);

    let imageUrl = "";
    if (newImage) {
      const imageRef = ref(storage, `products/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(usersCollectionRef, {
      product_name: newName,
      product_category: newCategory,
      product_quatity: newQuantity,
      product_price: newPrice,
      product_image: imageUrl,
    });
    getProducts();
    setNewName("");
    setCategory("");
    setNewQuantity("");
    setNewPrice("");
    setNewImage(null);
    setLoader(false);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center  w-full mt-14">
      <div className="w-[40%] shadow-md px-10 py-6 rounded-md">
        <div>
          <h1 className="mb-12 text-center text-[32px] font-bold italic">
            Add Product Details
          </h1>
        </div>
        <div>
          <form onSubmit={createProduct}>
            <div className="flex justify-between mt-4">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
                value={newName}
                onChange={(e) => setNewName(e?.target?.value)}
              />
            </div>
            <div className="flex justify-between mt-4">
              <label>Product Category</label>
              <input
                type="text"
                placeholder="Product Category"
                className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
                value={newCategory}
                onChange={(e) => setCategory(e?.target?.value)}
              />
            </div>
            <div className="flex justify-between mt-4">
              <label>Product Quantity</label>
              <input
                type="number"
                placeholder="Enter Your Product Quantity"
                value={newQuantity}
                className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
                onChange={(e) => setNewQuantity(e?.target?.value)}
              />
            </div>
            <div className="flex justify-between mt-4">
              <label>Product Price</label>
              <input
                type="number"
                placeholder="Enter Your Product Price"
                value={newPrice}
                className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
                onChange={(e) => setNewPrice(e?.target?.value)}
              />
            </div>
            <div className="flex justify-between mt-4">
              <label>Product Image</label>
              <input
                type="file"
                className="ml-2"
                onChange={(e) => setNewImage(e?.target?.files[0])}
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full text-[#fff] py-2 bg-[blue] rounded-full"
              >
                {loader ? "Loading...." : "Submit"}
              </button>
            </div>
          </form>
          <div className="flex justify-center my-4">
            <Link to="/">
              {" "}
              <button className="underline text-[red] text-[16px] font-semibold">
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
