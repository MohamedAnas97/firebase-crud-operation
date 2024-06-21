import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Product = ({ products, deleteProduct }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="px-[3%] bg-[#540707] h-[100vh]">
      <div className="flex justify-end py-4">
        <button
          className="px-6 bg-[green] text-[#fff] font-medium py-2"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </button>
      </div>
      <div className="my-20 grid grid-cols-5 gap-8">
        {products?.map((item, index) => (
          <div className="shadow-md border-[1px] rounded-xl px-8 py-6 bg-[#fff]" key={index}>
            {item?.product_image && (
              <div className="flex justify-center">
                <img
                  src={item?.product_image}
                  alt=""
                  className="w-full h-40 rounded-md shadow-md mb-4"
                />
              </div>
            )}
            <h3 className="text-[16px] font-semibold text-[#333]">
              Product Name:{" "}
              <span className="text-[#111]">{item?.product_name}</span>
            </h3>
            <h3 className="text-[16px] font-semibold text-[#333] mt-1">
              Product Category:{" "}
              <span className="text-[#111]">{item?.product_category}</span>
            </h3>
            <h3 className="text-[16px] font-semibold text-[#333] mt-1">
              Product Quantity:{" "}
              <span className="text-[darkblue]">{item?.product_quatity}</span>
            </h3>
            <h3 className="text-[16px] font-semibold text-[#333] mt-1">
              Product Price:{" "}
              <span className="text-[#267618]">{item?.product_price}</span>
            </h3>
            <div className="mt-4 flex justify-between">
              <div>
                <Link to={`/edit-product/${item?.id}`}>
                  <button className="text-[blue] underline font-semibold">
                    <img src={require("../../assets/pen.png")} alt="" className="h-[32px]" />
                  </button>
                </Link>
              </div>
              <div>
                <button className="text-[red] underline" onClick={() => handleDelete(item?.id)}>
                 <img src={require("../../assets/delete.png")} alt="" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
