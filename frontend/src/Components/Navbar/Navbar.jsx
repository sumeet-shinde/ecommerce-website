import "./Navbar.css";
import BrandImage from "./Shopify.png";
import MenuIcon from "./menu-icon.png";
import CartIcon from "./Cart.png";
import UserIcon from "./User.png";
import SearchIcon from "./Search.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCartData } from "../../Redux/Cart/action";
import { getProductsByCategory } from "../../Redux/Products/action";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { getUsersRequest } from "../../Redux/Users/action";
import { getAuthorised } from "../../Redux/Auth/action";

export const Navbar = () => {
  const { cart } = useSelector((store) => store.carts);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store.login);
  const { users } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [authorised, setAuthorised] = useState(false);
  let id = JSON.parse(localStorage.getItem("userid"));

  useEffect(() => {
    if (id) {
      const loadCartData = async () => {
        await dispatch(getCartData(id));
      };
      loadCartData();
      const userData = async () => {
        await dispatch(getUsersRequest(id));
      };
      dispatch(getAuthorised(true));
      setAuthorised(true);
      userData();
    }
  }, [dispatch, authorised]);

  const SearchRequest = (value) => {
    axios
      .get(
        `https://ecommerce-backend-db.herokuapp.com/products/getProductsSearch/${value}`
      )
      .then((res) => {
        let data = res.data;
        if (data.length !== 0) {
          document.querySelector(".ResultContentDiv").style.display = "block";
          if (document.querySelector(".ResultContentDiv").hasChildNodes()) {
            document.querySelector(".ResultContentDiv").innerText = null;
          }
          handleList(data);
        } else {
          document.querySelector(".ResultContentDiv").style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleList = (data) => {
    data.map((e) => {
      let a = document.createElement("a");
      a.innerText = e.name;
      document.querySelector(".ResultContentDiv").append(a);
      a.addEventListener("click", () => {
        let pid = e._id;
        localStorage.setItem("productID", JSON.stringify(pid));
        navigate("/singleProduct");
        document.querySelector(".ResultContentDiv").innerText = null;
        document.querySelector(".ResultContentDiv").style.display = "none";
      });
    });
  };

  const handleDropDown = () => {
    if (document.querySelector(".ResultContentDiv").style.display === "block") {
      document.querySelector(".ResultContentDiv").style.display = "none";
    } else if (
      document.querySelector(".ResultContentDiv").style.display === "none"
    ) {
      document.querySelector(".ResultContentDiv").style.display = "block";
    }
  };

  const handleSideBar = () => {
    if (document.querySelector(".FilterDiv")) {
      document.querySelector(".FilterDiv").classList.toggle("show");
    }
    if (document.querySelector(".SecondDiv")) {
      document.querySelector(".SecondDiv").classList.toggle("merge");
    }
    if (document.querySelector(".slide-container")) {
      document.querySelector(".slide-container").classList.toggle("small");
    }
  };

  const handleSignOut = () => {
    dispatch(getAuthorised(false));
    setAuthorised(false);
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div className="container">
        <div className="NavDiv">
          {/* <img
            src={MenuIcon}
            style={{ cursor: "pointer" }}
            className="Menuicon"
            alt=""
            onClick={() => {
              document.querySelector(".SideBarMenuDiv").style.Xtranslate
            }}
          /> */}
          <input type="checkbox" id="Menuicon" />
          <label
            htmlFor="Menuicon"
            className="MenuiconToggle"
            onClick={handleSideBar}
          >
            <div className="spinner top"></div>
            <div className="spinner middle"></div>
            <div className="spinner bottom"></div>
          </label>
          <div className="SideBarMenuDiv">
            <ul className="menu">
              <li
                onClick={() => {
                  dispatch(getProductsByCategory("clothing"));
                  document.querySelector(".ClothingBtn").style.backgroundColor =
                    "gray";
                  document.querySelector(
                    ".ElectronicsBtn"
                  ).style.backgroundColor = "#dddddd";
                  document.querySelector(
                    ".FurnitureBtn"
                  ).style.backgroundColor = "#dddddd";
                  navigate("/productsPage");
                }}
              >
                <a href="#" className="ClothingBtn">
                  Clothing
                </a>
              </li>
              <li
                onClick={() => {
                  dispatch(getProductsByCategory("electronics"));
                  document.querySelector(".ClothingBtn").style.backgroundColor =
                    "#dddddd";
                  document.querySelector(
                    ".ElectronicsBtn"
                  ).style.backgroundColor = "gray";
                  document.querySelector(
                    ".FurnitureBtn"
                  ).style.backgroundColor = "#dddddd";
                  navigate("/productsPage");
                }}
              >
                <a href="#" className="ElectronicsBtn">
                  Electronics
                </a>
              </li>
              <li
                onClick={() => {
                  dispatch(getProductsByCategory("furniture"));
                  document.querySelector(".ClothingBtn").style.backgroundColor =
                    "#dddddd";
                  document.querySelector(
                    ".ElectronicsBtn"
                  ).style.backgroundColor = "#dddddd";
                  document.querySelector(
                    ".FurnitureBtn"
                  ).style.backgroundColor = "gray";
                  navigate("/productsPage");
                }}
              >
                <a href="#" className="FurnitureBtn">
                  Furniture
                </a>
              </li>
            </ul>
          </div>
          <img
            src={BrandImage}
            className="BrandName"
            alt=""
            onClick={() => {
              navigate("/");
            }}
          />
          <div className="ResultDiv">
            <DebounceInput
              minLength={3}
              className="SearchInput"
              placeholder="Enter to search..."
              debounceTimeout={500}
              onChange={(e) => {
                if (e.target.value) {
                  SearchRequest(e.target.value);
                }
              }}
              onClick={handleDropDown}
            />
            <div className="ResultContentDiv"></div>
          </div>
          <div className="SearchDiv" onClick={handleDropDown}>
            <img style={{ height: "20px" }} src={SearchIcon} alt="" />
            &nbsp;
            <p>Search</p>
          </div>
          <div
            className="CartDiv"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <h3 className="CartName">Cart</h3>&nbsp;&nbsp;
            <img src={CartIcon} alt="" />
            &nbsp;&nbsp;
            {id && <h4>{cart.length}</h4>}
            {!id && <h4>0</h4>}
          </div>
          <div
            className="SignDiv"
            onMouseOver={() => {
              document.querySelector(".SignPopDiv").style.display = "block";
            }}
            onMouseOut={() => {
              document.querySelector(".SignPopDiv").style.display = "none";
            }}
          >
            {id && <h3 className="SignName">Welcome, {users.name}</h3>}
            {!id && (
              <>
                <h3 className="SignName">Sign In</h3>&nbsp;&nbsp;
                <img style={{ paddingTop: "8px" }} src={UserIcon} alt="" />
              </>
            )}
          </div>
          <div
            className="SignPopDiv"
            onMouseOut={() => {
              document.querySelector(".SignPopDiv").style.display = "none";
            }}
            onMouseOver={() => {
              document.querySelector(".SignPopDiv").style.display = "block";
            }}
          >
            {id && (
              <ul>
                <li
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  Orders
                </li>
                <li onClick={handleSignOut}>Log Out</li>
              </ul>
            )}
            {!id && (
              <ul>
                <li
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log In
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
