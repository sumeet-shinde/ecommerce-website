import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../Redux/Cart/action";
import { getSingleProductRequest } from "../../Redux/Products/action";
import { Navbar } from "../Navbar/Navbar";
import "./SingleProductPage.css";

export const SingleProductPage = () => {
  const { singleProduct, category } = useSelector((store) => store.product);
  const { auth } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let pid = JSON.parse(localStorage.getItem("productID"));
    if (pid) {
      const handleProductReq = async () => {
        await dispatch(getSingleProductRequest(pid));
      };
      handleProductReq();
    }
  }, [singleProduct]);

  if (!singleProduct) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Navbar />
      <div className="ProductContainer">
        <div className="ProductImageDiv">
          <img src={singleProduct.image} alt="" />
        </div>
        <div className="ProductDescDiv">
          <div>
            <h2>{singleProduct.name}</h2>
            <p>Color: {singleProduct.color}</p>
            {category === "clothing" && <p>Size: {singleProduct.size}</p>}
            <h3>Rs: {singleProduct.price}/-</h3>
            <div>
              <button
                className="SingleCartButton"
                onClick={() => {
                  if (auth) {
                    let userid = JSON.parse(localStorage.getItem("userid"));
                    dispatch(addProductToCart(userid, singleProduct));
                  } else {
                    navigate("/login");
                  }
                }}
              >
                ADD CART
              </button>
              <button
                className="SingleBuyButton"
                onClick={() => {
                  if (auth) {
                    let userid = JSON.parse(localStorage.getItem("userid"));
                    dispatch(addProductToCart(userid, singleProduct));
                    navigate("/cart");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
