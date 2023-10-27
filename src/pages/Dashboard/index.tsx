import React from "react";
import { Products } from "../../components/products/products";

const Dashboard: React.FC = ()=> {
  const mockProducts = [
    {
      id: 1,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
    {
      id: 2,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
    {
      id: 3,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
    {
      id: 4,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
    {
      id: 5,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
    {
      id: 6,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
    {
      id: 7,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
    {
      id: 8,
      name: "Tenis Nike",
      value: 19.9,
      auffs: 100,
      image: "https://imgnike-a.akamaihd.net/1920x1920/015883IF.jpg",
      link: "https://www.nike.com.br/Produto/Tenis-Nike-Revolution-5-Masculino/111-169-001-169001?site_id=106"
    },
  ];

  return (
    mockProducts.map((product) => (
      <Products
        key={product.id}
        name={product.name}
        value={product.value}
        auffs={product.auffs}
        image={product.image}
        link={product.link}
      />
    ))
  );
}

export default Dashboard;
