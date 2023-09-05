const productsData = [
  // Tarjetas Graficas
  {
    id: 1,
    productName: "Tarjeta Grafica Gigabyte Nvidia RTX 2060 6GB",
    precio: 150000,
    categoria: "graficas",
    img: "/data/db-img/graficas/gigabyte-2060-6gb.png",
  },
  {
    id: 2,
    productName: "Tarjeta Grafica MSI Nvidia RTX 2060Super 8GB",
    precio: 190000,
    categoria: "graficas",
    img: "/data/db-img/graficas/msi-2060s-8gb.png",
  },
  {
    id: 3,
    productName: "Tarjeta Grafica Asus Nvidia RTX 2070 8GB",
    precio: 200000,
    categoria: "graficas",
    img: "/data/db-img/graficas/asus-2070-8gb.png",
  },
  {
    id: 4,
    productName: "Tarjeta Grafica MSI Nvidia RTX 2070Super Gaming TRIO 8GB",
    precio: 230000,
    categoria: "graficas",
    img: "/data/db-img/graficas/msi-2070s-gt-8gb.png",
  },
  {
    id: 5,
    productName: "Tarjeta Grafica MSI Nvidia RTX 2080Ti Gaming X Trio 12GB",
    precio: 290000,
    categoria: "graficas",
    img: "/data/db-img/graficas/msi-2080ti-xtrio-12gb.png",
  },
  {
    id: 6,
    productName: "Tarjeta Grafica MSI Nvidia RTX 3060Ti Gaming X 8GB",
    precio: 350000,
    categoria: "graficas",
    img: "/data/db-img/graficas/msi-3060ti-gx-8gb.png",
  },

  // Motherboards
  {
    id: 7,
    productName: "Mother MSI A320M-A PRO AM4 (AMD)",
    precio: 120634,
    categoria: "motherboards",
    img: "/data/db-img/motherboards/msi-a320m-a-pro-am4.png",
  },
  {
    id: 8,
    productName: "Mother AsRock B450M AC AM4 (AMD)",
    precio: 143852,
    categoria: "motherboards",
    img: "/data/db-img/motherboards/asrock-b450m-ac-am4.png",
  },
  {
    id: 9,
    productName: "Mother Gigabyte A520M-K V2 DDR4 AM4 (AMD)",
    precio: 350000,
    categoria: "motherboards",
    img: "/data/db-img/motherboards/gigabyte-a520m-k-v2-ddr4-am4.png",
  },
  {
    id: 10,
    productName: "Mother Gigabyte B560M AORUS PRO AX S1200 (Intel)",
    precio: 259031,
    categoria: "motherboards",
    img: "/data/db-img/motherboards/gigabyte-b560m-aorus-pro-ax-s1200.png",
  },
  {
    id: 11,
    productName: "Mother Asus Prime H610M-E D4 S1700 (Intel)",
    precio: 149117,
    categoria: "motherboards",
    img: "/data/db-img/motherboards/asus-prime-h610m-e-d4-s1700.png",
  },
  {
    id: 12,
    productName: "Mother MSI PRO B660M-A DDR4 S1700 (Intel)",
    precio: 151223,
    categoria: "motherboards",
    img: "/data/db-img/motherboards/msi-pro-b660m-a-ddr4-s1700.png",
  },
  // Procesadores
  {
    id: 13,
    productName:
      "Procesador AMD Ryzen 5 5500 4.2GHz Turbo + Wraith Stealth Cooler",
    precio: 223959,
    categoria: "procesadores",
    img: "/data/db-img/procesadores/amd-ryzen-5-5500.png",
  },
  {
    id: 14,
    productName:
      "Procesador AMD Ryzen 7 5700X 4.6GHz Turbo AM4 - No incluye Cooler",
    precio: 467844,
    categoria: "procesadores",
    img: "/data/db-img/procesadores/amd-ryzen-7-5700-x.png",
  },
  {
    id: 15,
    productName:
      "Procesador AMD Ryzen 7 5800X 4.7GHz Turbo AM4 - No incluye Cooler",
    precio: 534910,
    categoria: "procesadores",
    img: "/data/db-img/procesadores/amd-ryzen-7-5800-x.png",
  },
  {
    id: 16,
    productName: "Procesador Intel Celeron G5925 3.6GHz Socket 1200 Comet Lake",
    precio: 54512,
    categoria: "procesadores",
    img: "/data/db-img/procesadores/intel-celeron-g5925-36ghz-4mb-s1200.png",
  },
  {
    id: 17,
    productName:
      "Procesador Intel Core i5 11600K 4.9GHz Turbo Socket 1200 Rocket Lake",
    precio: 384920,
    categoria: "procesadores",
    img: "/data/db-img/procesadores/intel-i5-11600-s1200-rocket-lake.png",
  },
  {
    id: 18,
    productName:
      "Procesador Intel Core i7 12700KF 5.0GHz Socket 1700 Alder Lake",
    precio: 476632,
    categoria: "procesadores",
    img: "/data/db-img/procesadores/intel-i7-12700-kf-alder-lake.png",
  },
  // Memorias Ram
  {
    id: 19,
    productName:
      "Memoria Adata DDR4 16GB (2x8GB) 4133MHz XPG Spectrix D60G RGB",
    precio: 121416,
    categoria: "memorias_ram",
    img: "/data/db-img/ram/xpg-adata-ddr4-4133mhz.png",
  },
  {
    id: 20,
    productName:
      "Memoria Corsair DDR4 16GB (2x8GB) 2666MHz Vengeance RGB PRO Black",
    precio: 99303,
    categoria: "memorias_ram",
    img: "/data/db-img/ram/corsair-ddr4-16gb-2x8GB-2666mhz.png",
  },
  {
    id: 21,
    productName:
      "Memoria GeiL DDR4 16GB (2x8GB) 3000MHz EVO SPEAR Phantom Gaming Edition",
    precio: 91042,
    categoria: "memorias_ram",
    img: "/data/db-img/ram/geil-ddr4-16gb-2x8GB-3000mhz.png",
  },
  // Almacenamiento
  {
    id: 22,
    productName: "Disco Rígido WD 1TB BLUE 64MB SATA 6.0GB/s",
    precio: 56861,
    categoria: "almacenamiento",
    img: "/data/db-img/almacenamiento/wd-1tb-blue-64mb-sata.png",
  },
  {
    id: 23,
    productName: "Disco Sólido SSD Kingston 960GB A400 500MB/s",
    precio: 91771,
    categoria: "almacenamiento",
    img: "/data/db-img/almacenamiento/disco-sólido-ssd-kingston-960gb-a400.png",
  },
  {
    id: 24,
    productName:
      "Disco Solido SSD M.2 WD 500GB Black SN850 7000MB/s NVMe Gen4 PCI-E x4",
    precio: 151628,
    categoria: "almacenamiento",
    img: "/data/db-img/almacenamiento/wd-black-sn850-nvme-ssd.png",
  },
  // Fuentes de alimentacion
  {
    id: 25,
    productName:
      "Fuente Be Quiet 1000W 80 Plus Gold PURE POWER 11 Full Modular",
    precio: 170096,
    categoria: "fuentes",
    img: "/data/db-img/fuentes/fuente-be-quiet-1000w-80-plus-gold-pure-power-11-full-modular.png",
  },
  {
    id: 26,
    productName: "Fuente Deepcool 700W DA700 80 Plus Bronze",
    precio: 83995,
    categoria: "fuentes",
    img: "/data/db-img/fuentes/fuente-deepcool-700w-da700-80-plus-bronze.png",
  },
  {
    id: 27,
    productName: "Fuente Gigabyte 650W 80 Plus Bronze P650B",
    precio: 93796,
    categoria: "fuentes",
    img: "/data/db-img/fuentes/fuente-gigabyte-650w-80-plus-bronze-p650b.png",
  }

  /* Agregar 5 elementos mas para que el corte sea par */
];

const divideProductsInParts = (size) => {
  let productsList = []

  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size))
  }

  // Con esto hago que por cada vez que se ingrese a la web, aparezcan productos distintos en las cards
  productsList.sort( () => Math.random() - 0.5);
  return productsList;
};

const appState = {
  products: divideProductsInParts(6),
  currentIndex: 0,
  productLimit: divideProductsInParts(6).length,
  activeFilter: null 
};