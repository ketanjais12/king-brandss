import { Link } from 'react-router-dom';


const categories = [
  {
    id: 'jeans',
    name: 'JEANS',
   image: '/images/category-jeans.jpg',
    alt: 'Blue denim jeans',
  },
 {
  id: 'bottomwear',
  name: 'BOTTOMWEAR',
  image: '/images/category-bottomwear.jpg',
  alt: 'Man wearing beige trousers',
},
  {
    id: 't-shirts',
    name: 'T-SHIRTS',
    image:
      '/images/category-tshirts.jpg',
    alt: 'Classic white T-shirt',
  },
  {
  id: 'shirts',
  name: 'SHIRTS',
  image: '/images/category-shirts.jpg',
  alt: 'Collection of shirts on hangers',
},
];

function Categories() {
  return (
    <section
      className="home-section"
      id="categories"
      aria-labelledby="categories-title"
    >
      <div className="section-heading">
        <h2 className="section-title" id="categories-title">
          SHOP BY CATEGORY
        </h2>

       <Link className="text-link" to="/collections">
  VIEW ALL →
</Link>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
         <Link
  className="category-card"
  to={`/shop?category=${category.id}`}
  key={category.id}
>
            <div className="category-image">
              <img
                src={category.image}
                alt={category.alt}
                width="600"
                height="450"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="category-info">
              <h3>{category.name}</h3>
              <span>View Collection →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;