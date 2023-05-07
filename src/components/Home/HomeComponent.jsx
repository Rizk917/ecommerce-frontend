import Chocolate from "../../images/chocolate1.png";
import "./homeComp.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CartContext from "../Cart/CartContext";


function HomeComponent() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [popularItems, setPopularItems] = useState([]);
  const{ cart, handleAddProduct, setCart, UserId } = useContext(CartContext)

  useEffect(() => {
    fetchImages();
    fetchPopularItems();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("https://ecommerce-backend-5k4d.onrender.com/imageCarousel");
      const imagesData = response.data.data; // get the array of images from the response data
      const images = imagesData.map((image) => image.imageCarouselItem); // get an array of image URLs
      setImages(images);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPopularItems = async () => {
    try {
      const response = await axios.get("https://ecommerce-backend-5k4d.onrender.com/popular");
      const popularItemsData = response.data;
      if (popularItemsData) {
        const popularItems = popularItemsData.map((item) => {
          const product = item.productId;
          // console.log('test',product)
          return {  
            _id: item._id,
            productName: product.productName,
            productImage: product.productImage,
            productDescription: product.productDescription,
            productPrice: product.productPrice,
            productQuantity: product.productQuantity,
          };
        });
        setPopularItems(popularItems);
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) =>
        (currentImageIndex + 1) % images.length
      );
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="homepage">
      <div className="background">
        <div className="container-home">
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
                {images.length > 0 && (
                  <img
                    className="imageRight"
                    src={images[currentImageIndex]}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-home">
        <h1 className="m-top m-bottom bigFont-2 b-bottom">Popular</h1>
        <div className="flex fixing">
          {popularItems.map((product) => (
            <div className="card" key={product._id}>
              <img className="img_card"src={product.productImage} alt={product.productName} />
              <h2 className="product_name">{product.productName}</h2>
               <div className="details_product">
            <div className="product_price">
              <h2>{product.productPrice} $</h2>
            </div>
            <div className="button_card">
            <button type="button" onClick={() => handleAddProduct(UserId, product._id, product.productName, 1, product.productPrice)}>
                <p>Add to cart</p>
              </button>
            </div>
          </div>
      </div>
    ))}
  </div>
</div>
</div>
  );
}

export default HomeComponent;
