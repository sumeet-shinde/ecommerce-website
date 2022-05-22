import { Box, Checkbox, FormControlLabel, Slider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuthorised } from "../../Redux/Auth/action";
import { addProductToCart, getCartData } from "../../Redux/Cart/action";
import {
  getProductsByCategoryRequest,
  getProductsColorRequest,
  getProductsGenderRequest,
  getProductsLimitRequest,
  getProductsSizeRequest,
  getProductsSortingRequest,
} from "../../Redux/Products/action";
import { Navbar } from "../Navbar/Navbar";
import "./ProductsPage.css";

export const ProductsPage = () => {
  const { products, category } = useSelector((store) => store.product);
  const { cart } = useSelector((store) => store.carts);
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 100]);
  const [sorting, setSorting] = useState("");
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(50000);
  const { auth } = useSelector((store) => store.login);
  const navigate = useNavigate();

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("userid"));
    if (id) {
      const loadCartData = async () => {
        await dispatch(getCartData(id));
      };
      loadCartData();
    }

    loadDataByCategory();

    if (sorting !== "") {
      const loadProductSorting = async () => {
        await dispatch(getProductsSortingRequest(sorting, category));
      };
      loadProductSorting();
    }
  }, [dispatch, sorting, category]);

  // const loadData = async () => {
  //   await dispatch(getProductsRequest());
  // };

  const loadDataByCategory = async () => {
    await dispatch(getProductsByCategoryRequest(category));
  };

  const loadProductPrice = async (low, high) => {
    await dispatch(getProductsLimitRequest(low, high, category));
  };

  const loadProductGender = async (gender) => {
    await dispatch(getProductsGenderRequest(gender, category));
  };

  const loadProductColor = async (color) => {
    await dispatch(getProductsColorRequest(color, category));
  };

  const loadProductSize = async (size) => {
    await dispatch(getProductsSizeRequest(size, category));
  };

  if (!products || !cart) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Navbar />
      <div className="ProductsDiv">
        <div className="FilterDiv">
          <h2>Filters</h2>
          <h3>Price</h3>
          <Box sx={{ width: 210 }} className="PriceDiv">
            <Slider
              value={price}
              onChange={(e, newPrice) => {
                setPrice(newPrice);
                setLowPrice(price[0] * 500);
                setHighPrice(price[1] * 500);
              }}
              onMouseUp={() => {
                // let l = price[0] * 500;
                // let h = price[1] * 500;
                loadProductPrice(price[0] * 500, price[1] * 500);
              }}
            />
          </Box>
          <div className="PriceDisplayDiv">
            <p>Rs {price[0] * 500}</p>
            <p>Rs {price[1] * 500}</p>
          </div>
          <input
            className="PriceInput"
            value={lowPrice}
            onChange={(e) => {
              setLowPrice(e.target.value);
            }}
            type="number"
          />
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <input
            className="PriceInput"
            value={highPrice}
            onChange={(e) => {
              setHighPrice(e.target.value);
            }}
            type="number"
          />
          &nbsp;&nbsp;
          <button
            className="PriceInputButton"
            onClick={() => {
              loadProductPrice(lowPrice, highPrice);
            }}
          >
            GO
          </button>
          <h3>Gender</h3>
          <FormControlLabel
            label="Men"
            control={
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    loadProductGender("men");
                  } else {
                    loadDataByCategory();
                  }
                }}
              />
            }
          />
          <FormControlLabel
            label="Women"
            control={
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    loadProductGender("women");
                  } else {
                    loadDataByCategory();
                  }
                }}
              />
            }
          />
          <h3>Colors</h3>
          <div className="ColorsDiv">
            <FormControlLabel
              label="Red"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductColor("red");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Black"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductColor("black");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
            <br />
            <FormControlLabel
              label="White"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductColor("white");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Blue"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductColor("blue");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Orange"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductColor("orange");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
          </div>
          <h3>Size</h3>
          <div className="ColorsDiv">
            <FormControlLabel
              label="Small"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductSize("S");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Medium"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductSize("M");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Large"
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      loadProductSize("L");
                    } else {
                      loadDataByCategory();
                    }
                  }}
                />
              }
            />
          </div>
        </div>
        <div className="SecondDiv">
          <div className="SortDiv">
            Sort:&nbsp;&nbsp;
            <select
              name=""
              id=""
              onChange={(e) => {
                setSorting(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="">Relevance</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
          <div className="DisplayProductDiv">
            {products.map((e, id) => {
              return (
                <div
                  key={id}
                  className="ProDiv"
                  onClick={() => {
                    let pid = e._id;
                    localStorage.setItem("productID", JSON.stringify(pid));
                    navigate("/singleProduct");
                  }}
                >
                  <img src={e.image} alt="" />
                  <p className="ProName">{e.name}</p>
                  <span className="ProColor">Color: {e.color}</span>&nbsp;&nbsp;
                  <span className="ProSize">Size: {e.size}</span>
                  <p className="ProPrice">Rs. {e.price}</p>
                  {/* <button
                    onClick={() => {
                      if (auth) {
                        let userid = JSON.parse(localStorage.getItem("userid"));
                        dispatch(addProductToCart(userid, e));
                      } else {
                        navigate("/login");
                      }
                    }}
                    className="ProAddButton"
                  >
                    ADD CART
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    className="ProBuyButton"
                    onClick={() => {
                      if (auth) {
                        let userid = JSON.parse(localStorage.getItem("userid"));
                        dispatch(addProductToCart(userid, e));
                        navigate("/cart");
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    BUY NOW
                  </button> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
