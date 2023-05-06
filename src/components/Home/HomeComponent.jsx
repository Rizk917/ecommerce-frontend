import Chocolate from "../../images/chocolate1.png";
import "./homeComp.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CartContext from "../Cart/CartContext";


function HomeComponent() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [popularItems, setPopularItems] = useState([]);
  const{ cart, handleAddProduct, setCart, userId } =useContext(CartContext)

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/imageCarousel");
      const imagesData = response.data.data; // get the array of images from the response data
      const images = imagesData.map((image) => image.imageCarouselItem); // get an array of image URLs
      setImages(images);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPopularItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/popular");
      const popularItemsData = response.data;
      if (popularItemsData) {
        const popularItems = popularItemsData.map((item) => {
          const product = item.productId;
          console.log('test',product)
          return {  
            id: item._id,
            name: product.productName,
            image: product.productImage,
            description: product.productDescription,
            price: product.productPrice,
            quantity: product.productQuantity,
          };
        });
        setPopularItems(popularItems);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchImages();
    fetchPopularItems();
  }, []);

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
          {popularItems.map((item) => (
            <div className="card" key={item.id}>
              <img className="img_card"src={item.image} alt={item.name} />
              <h2 className="product_name">{item.name}</h2>
               <div className="details_product">
            <div className="product_price">
              <h2>{item.price} $</h2>
            </div>
            <div className="button_card">
              <button type="button">
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
