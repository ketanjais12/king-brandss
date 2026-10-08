import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categories = [
  { value: '', label: 'All categories' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'topwear', label: 'Topwear' },
  { value: 'bottomwear', label: 'Bottomwear' },
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'shirts', label: 'Shirts' },
  { value: 'trousers', label: 'Trousers' },
];

const subcategories = {
  topwear: [
    { value: '', label: 'All topwear' },
    { value: 'shirts', label: 'Shirts' },
    { value: 't-shirts', label: 'T-Shirts' },
  ],
  bottomwear: [
    { value: '', label: 'All bottomwear' },
    { value: 'jeans', label: 'Jeans' },
    { value: 'trousers', label: 'Trousers' },
  ],
};

function matchesCategory(product, category) {
  if (!category) return true;

  if (category === 'topwear') {
    return ['shirts', 't-shirts'].includes(product.category);
  }

  if (category === 'bottomwear') {
    return ['jeans', 'trousers', 'shorts'].includes(product.category);
  }

  return product.category === category;
}

function Shop() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const sort = searchParams.get('sort') || '';
  const collection = searchParams.get('collection') || '';

  const isSearchPage = pathname === '/search';
  const isCollectionsPage = pathname === '/collections';
  const isNewArrivals = collection === 'new';

  const showFullToolbar =
  isSearchPage ||
  isCollectionsPage ||
  (!category && !isNewArrivals);
  const subcategoryOptions = subcategories[category] || [];

  const showSubcategoryFilter =
    !showFullToolbar && subcategoryOptions.length > 0;

  const selectedSubcategory = subcategoryOptions.some(
    (option) => option.value === subcategory,
  )
    ? subcategory
    : '';

  const categoryLabel = categories.find(
    (item) => item.value === category,
  )?.label;

 const title = isSearchPage
  ? 'SEARCH PRODUCTS'
  : isCollectionsPage
    ? 'SHOP COLLECTION'
    : isNewArrivals
      ? 'NEW ARRIVALS'
      : category
        ? (categoryLabel || 'COLLECTION').toUpperCase()
        : 'SHOP COLLECTION';

  function updateParam(key, value, replace = false) {
    const next = new URLSearchParams(searchParams);

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    if (key === 'category') {
      next.delete('subcategory');
    }

    setSearchParams(next, { replace });
  }

  function clearFilters() {
    const next = new URLSearchParams(searchParams);

    next.delete('q');
    next.delete('sort');
    next.delete('subcategory');

    // Keep the current category/collection on dedicated pages.
   if (isSearchPage || isCollectionsPage)  {
      next.delete('category');
      next.delete('collection');
    }

    setSearchParams(next);
  }

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesCollection =
      !isNewArrivals || product.isNew;

    const matchesSubcategory =
      !selectedSubcategory ||
      product.category === selectedSubcategory;

    return (
      matchesSearch &&
      matchesCategory(product, category) &&
      matchesCollection &&
      matchesSubcategory
    );
  });

  const sortedProducts = [...filteredProducts];

  if (sort === 'price-low') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'name') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

const hasAdjustments = Boolean(
  query ||
  sort ||
  subcategory ||
  ((isSearchPage || isCollectionsPage) && (category || collection)),
);

  const toolbarClass = showFullToolbar
    ? ''
    : showSubcategoryFilter
      ? 'shop-controls-subcategory'
      : 'shop-controls-sort-only';

  return (
<section
  className={`home-section shop-page ${
    !showFullToolbar ? 'shop-page-compact' : ''
  }`}
>
          <div className="section-heading">
        <h1 className="section-title">{title}</h1>

        {!showFullToolbar && (
          <Link className="text-link" to="/collections">
            ALL PRODUCTS →
          </Link>
        )}
      </div>

      <div className={`shop-controls ${toolbarClass}`}>
        {showFullToolbar && (
          <div className="shop-field shop-search">
            <label htmlFor="product-search">Search products</label>

            <input
              id="product-search"
              type="search"
              placeholder="Search jeans, shirts..."
              value={query}
              onChange={(event) =>
                updateParam('q', event.target.value, true)
              }
            />
          </div>
        )}

        {showFullToolbar && (
          <div className="shop-field">
            <label htmlFor="category-filter">Category</label>

            <div className="select-wrapper">
              <select
                id="category-filter"
                value={category}
                onChange={(event) =>
                  updateParam('category', event.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="select-arrow"
                size={18}
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {showSubcategoryFilter && (
          <div className="shop-field">
            <label htmlFor="subcategory-filter">Product type</label>

            <div className="select-wrapper">
              <select
                id="subcategory-filter"
                value={selectedSubcategory}
                onChange={(event) =>
                  updateParam('subcategory', event.target.value)
                }
              >
                {subcategoryOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="select-arrow"
                size={18}
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        <div className="shop-field">
          <label htmlFor="product-sort">Sort by</label>

          <div className="select-wrapper">
            <select
              id="product-sort"
              value={sort}
              onChange={(event) =>
                updateParam('sort', event.target.value)
              }
            >
              <option value="">Featured</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="name">Name: A–Z</option>
            </select>

            <ChevronDown
              className="select-arrow"
              size={18}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Keep an existing search visible even on a category page. */}
      {!showFullToolbar && query && (
        <div className="active-search-filter">
          <span>Search: “{query}”</span>
          <button
            className="plain-button"
            type="button"
            onClick={() => updateParam('q', '')}
          >
            Clear search
          </button>
        </div>
      )}

      <div className="shop-results-bar">
        <p role="status">
          {sortedProducts.length}{' '}
          {sortedProducts.length === 1 ? 'product' : 'products'} found
        </p>

        {hasAdjustments && (
          <button
            className="plain-button"
            type="button"
            onClick={clearFilters}
          >
            Reset filters
          </button>
        )}
      </div>

      {sortedProducts.length > 0 ? (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="page-empty">
          <h2>No products found</h2>
          <p>Try adjusting your filters or browse all products.</p>

          {hasAdjustments && (
            <button
              className="plain-button"
              type="button"
              onClick={clearFilters}
            >
              Reset filters
            </button>
          )}

          <Link className="primary-button" to="/collections">
            VIEW ALL PRODUCTS
          </Link>
        </div>
      )}
    </section>
  );
}

export default Shop;