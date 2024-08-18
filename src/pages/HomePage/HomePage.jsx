import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './HomePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { Services } from '../../Components/Servicess';

import axios from 'axios';

const URL = process.env.REACT_APP_BASE_URL;

function HomePage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesResponse, servicesResponse] = await Promise.all([
          axios.get(`${URL}slides/get`),
          axios.get(`${URL}services/get`),
        ]);
        setImages(imagesResponse.data);
        setServices(servicesResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div>Բեռնվում է...</div>;
  }

  if (error) {
    return <div>Սխալ: {error.message}</div>;
  }

  return (
    <div className="homepage">
      <section className="homepage__hero" id="home">
        <h1>Բարի Գալուստ Easy SOL</h1>
        <p>Առաջատարը՝ շենքերի ինժեներական համակարգերի սպասարկման և կառավարման ոլորտում</p>
      </section>

      <section className="homepage__carousel">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel__slide">
              <img src={image.image} alt={`Engineering work ${index + 1}`} onClick={() => { navigate("/Snack") }} />
            </div>
          ))}
        </Slider>
      </section>

      <section className="homepage__services" id="services">
        <Services />
      </section>

      <section className="homepage__about" id="about">
        <h2>Մեր մասին</h2>
        <p>Easy SOL-ը պարտավորվում է ապահովել բարձրակարգ ծառայություններ շենքերի ինժեներական համակարգերի պահպանման և կառավարման գործում:</p>
      </section>
{/* <div>
      <section className="homepage__new-services" id="new-services">
        <h2>Our Services</h2>
        {services.map((service) => (
          <div key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.imageUrl && <img src={service.imageUrl} alt={service.title} />}
            <button onClick={() => navigate(`/service/${service.id}`)}>View Details</button>
          </div>
        ))}
      </section>
      </div> */}
    </div>
  );
}

export default HomePage;
