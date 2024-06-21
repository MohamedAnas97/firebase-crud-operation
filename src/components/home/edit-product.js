import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditProduct = ({ getProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCategory, setCategory] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(db, "products", id);
      const productData = await getDoc(productDoc);
      if (productData?.exists()) {
        const data = productData?.data();
        setProduct(data);
        setNewName(data?.product_name);
        setCategory(data?.product_category);
        setNewQuantity(data?.product_quatity);
        setNewPrice(data?.product_price);
        setCurrentImage(data?.product_image);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoader(true);

    const updatedProduct = {
      product_name: newName,
      product_category: newCategory,
      product_quatity: newQuantity,
      product_price: newPrice,
      product_image: currentImage,
    };

    if (newImage) {
      const imageRef = ref(storage, `products/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      updatedProduct.product_image = await getDownloadURL(imageRef);
    }

    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, updatedProduct);
    getProducts();
    setLoader(false);
    navigate("/");
  };

  const handleImageChange = (e) => {
    if (e?.target?.files[0]) {
      setNewImage(e?.target?.files[0]);
      setCurrentImage(URL.createObjectURL(e?.target?.files[0]));
    }
  };
  if (!product)
    return (
      <div>
        <h2 className="text-center">Loading...</h2>
      </div>
    );

  return (
    <div className="flex justify-center w-full mt-14">
      <div className="w-[40%] shadow-md px-10 py-6 rounded-md">
        <h1 className="mb-12 text-center text-[32px] font-bold italic">
          Edit Product
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="flex justify-between mt-4">
            <label className="text-[16px] font-medium">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
              value={newName}
              onChange={(e) => setNewName(e?.target?.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <label className="text-[16px] font-medium">Product Category</label>
            <input
              type="text"
              placeholder="Product Category"
              className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
              value={newCategory}
              onChange={(e) => setCategory(e?.target?.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <label className="text-[16px] font-medium">Product Quantity</label>
            <input
              type="number"
              placeholder="Enter Your Product Quantity"
              value={newQuantity}
              className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
              onChange={(e) => setNewQuantity(e?.target?.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <label className="text-[16px] font-medium">Product Price</label>
            <input
              type="number"
              placeholder="Enter Your Product Price"
              value={newPrice}
              className="border-[1px] border-[#555] ml-2 w-[80%] px-6 py-1 rounded-full text-[14px]"
              onChange={(e) => setNewPrice(e?.target?.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <label className="text-[16px] font-medium">Product Image</label>
            <input type="file" className="ml-2" onChange={handleImageChange} />
            {currentImage && (
              <img
                src={currentImage}
                alt="Product"
                className="mt-2 w-20 h-20 object-contain"
              />
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full text-[#fff] py-2 bg-[blue] rounded-full"
            >
              {loader ? "Loading...." : "Update"}
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
  );
};

export default EditProduct;
