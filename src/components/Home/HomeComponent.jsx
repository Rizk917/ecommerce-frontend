import Chocolate from "../../images/chocolate1.png";
import "./homeComp.css";
function HomeComponent() {
  return (
    <div className="homepage">
      <div className="background">
        <div className="container">
          <div className="banner">
            <div className="left flex-50">
              <h1 className="bigFont-3">Lorem, ipsum dolor.</h1>
              <p className="m-top">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt, fugiat nam repudiandae quis at voluptatum numquam vero
                beatae quidem dicta unde officiis, necessitatibus laborum
                molestiae!z
              </p>
            </div>
            <div className="right flex-r flex-50">
              <div className="image w-75  d-flex">
                <img className="imageRight" src={Chocolate} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="m-top m-bottom bigFont-2 b-bottom">Popular</h1>
        <div className="popular-card">
          <img src={Chocolate} alt="" />
          <h1 className="bold-text bigFont-1">item name</h1>
          <div className="d-flex-row">
            <h4 className="m-top">0.5$</h4>
            <button class="button-7" role="button">
              Add to cart
            </button>
          </div>
        </div>
        <div className="popular-card">
          <img src={Chocolate} alt="" />
          <h1 className="bold-text bigFont-1">item name</h1>
          <div className="d-flex-row">
            <h4 className="m-top">0.5$</h4>
            <button class="button-7" role="button">
            +
            </button>
          </div>
        </div>{" "}
        <div className="popular-card">
          <img src={Chocolate} alt="" />
          <h1 className="bold-text bigFont-1">item name</h1>
          <div className="d-flex-row">
            <h4 className="m-top">0.5$</h4>
            <button class="button-7" role="button">
              Add to cart
            </button>
          </div>
        </div>
        <div className="popular-card">
          <img src={Chocolate} alt="" />
          <h1 className="bold-text bigFont-1">item name</h1>
          <div className="d-flex-row">
            <h4 className="m-top">0.5$</h4>
            <button class="button-7" role="button">
              Add to cart
            </button>
          </div>
        </div>
        <div className="popular-card">
          <img src={Chocolate} alt="" />
          <h1 className="bold-text bigFont-1">item name</h1>
          <div className="d-flex-row">
            <h4 className="m-top">0.5$</h4>
            <button class="button-7" role="button">
              Add to cart
            </button>
          </div>
        </div>
        <div className="popular-card">
          <img src={Chocolate} alt="" />
          <h1 className="bold-text bigFont-1">item name</h1>
          <div className="d-flex-row">
            <h4 className="m-top">0.5$</h4>
            <button class="button-7" role="button">
              Add to cart
            </button>
          </div>
        </div>
        <div className="popular-card">
          <img src={Chocolate} alt="" />
          <h1 className="bold-text bigFont-1">item name</h1>
          <div className="d-flex-row">
            <h4 className="m-top">0.5$</h4>
            <button class="button-7" role="button">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
