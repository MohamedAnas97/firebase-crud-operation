import { Route, Routes } from "react-router-dom";
import Homepage from "../container/home";
import Loginpage from "../container/login";
import SignUp from "../components/signUp/signUp";
import AddProduct from "../components/home/add-product";
import EditProduct from "../components/home/edit-product";
import { useState, useCallback, useEffect } from "react";
import { db } from "../Firebase";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const AllRoutes = () => {
  const [products, setProducts] = useState([]);
  const usersCollectionRef = collection(db, "products");
  const getProducts = useCallback(async () => {
    const data = await getDocs(usersCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [usersCollectionRef]);

  const updateProduct = async (id, updatedProduct) => {
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, updatedProduct);
    getProducts();
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              products={products}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
            />
          }
        />
        <Route path="/signin" element={<Loginpage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/add-product"
          element={<AddProduct getProducts={getProducts} />}
        />
        <Route
          path="/edit-product/:id"
          element={<EditProduct getProducts={getProducts} />}
        />
      </Routes>
    </div>
  );
};
export default AllRoutes;
