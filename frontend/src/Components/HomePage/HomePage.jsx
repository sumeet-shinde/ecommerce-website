import { Navbar } from "../Navbar/Navbar";
import Image1 from "./image-1.png";
import Image2 from "./image-2.png";
import Image3 from "./image-3.png";
import "./HomePage.css";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="slide-container">
        <Carousel>
          <div
            className="slide"
            onClick={() => {
              navigate("/productsPage");
            }}
          >
            <img src={Image1} alt="" />
          </div>
          <div
            className="slide"
            onClick={() => {
              navigate("/productsPage");
            }}
          >
            <img src={Image2} alt="" />
          </div>
          <div
            className="slide"
            onClick={() => {
              navigate("/productsPage");
            }}
          >
            <img src={Image3} alt="" />
          </div>
        </Carousel>
      </div>
      <div
        className="SalesDiv"
        onClick={() => {
          navigate("/productsPage");
        }}
      >
        <div>
          <img
            src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/586725/01/fnd/IND/fmt/png/Active-Small-Logo-Regular-Fit-Men's-T-shirt"
            alt=""
          />
          <p>60% OFF on T-shirts</p>
        </div>
        <div>
          <img
            src="https://n2.sdlcdn.com/imgs/k/e/f/ORIENT-ELECTRIC-Ultimate-1000W-Dry-SDL979611164-2-6aadb.jpg"
            alt=""
          />
          <p>50% OFF on Irons</p>
        </div>
        <div>
          <img
            src="https://n4.sdlcdn.com/imgs/a/y/z/Bean-Bag-Cover-in-Black-SDL433431061-1-308e9.jpg"
            alt=""
          />
          <p>40% OFF on Sofa</p>
        </div>
      </div>
    </>
  );
};
