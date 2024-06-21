import React from "react";
import Banner from "../components/home/banner";
import Product from "../components/home/product";

const Homepage = ({products, deleteProduct}) => {
  return (
    <React.Fragment>
      <Banner />
      <Product products={products} deleteProduct={deleteProduct} />
    </React.Fragment>
  );
};
export default Homepage;
