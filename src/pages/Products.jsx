import React, { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'

const ProductCard = ({data, title})=>{
  if(data?.length > 0){
    return data.map((product) => <Card key={product.id} {...product} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-sm">{title}</h2>
  );
}

const Products = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const [filters, setFilters] = useState({
    gender: [],
    color: [],
    priceRange: [],
    type: [],
  });

  // Calling API
  useEffect(()=>{
    const fetchData =async ()=>{
      try {
        const response = await fetch(
          "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setAllProducts(result);
          setFilteredItems(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])

  // For filtered Items
  useEffect(() => {
    if(allProducts?.length>0){
      const filtered = allProducts.filter((product) => {
        const meetsGenderCriteria = filters.gender.length === 0 || filters.gender.includes(product.gender);
        const meetsColorCriteria = filters.color.length === 0 || filters.color.includes(product.color);
        const meetsPriceRangeCriteria = filters.priceRange.length === 0 || filters.priceRange.includes(product.priceRange);
        const meetsTypeCriteria = filters.type.length === 0 || filters.type.includes(product.type);
        
        return meetsGenderCriteria && meetsColorCriteria && meetsPriceRangeCriteria && meetsTypeCriteria;
      });
      setFilteredItems(filtered);
    }

  }, [allProducts, filters]);

  const handleCheckboxChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName].includes(value)
        ? prevFilters[filterName].filter((item) => item !== value)
        : [...prevFilters[filterName], value],
    }));
  };

  const handleInputChange = (e)=>{
    setSearchQuery(e.target.value);

    const filteredData = filteredItems.filter((item) => {
      const searchTerms = searchQuery.toLowerCase().split(" ");
      return searchTerms.every((term) =>
        [item.name, item.color, item.type].some((attribute) =>
          attribute.toLowerCase().includes(term)
        )
      );
    });
    console.log(filteredData);

    setFilteredItems(filteredData);
  }


  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block p-3 w-[30%]"
        />
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="md:w-[20%] w-full card border-solid border-2 h-[fit-content] p-5 rounded-xl shadow-lg">
          <h2 className='text-2xl font-bold'>Filters</h2>
          <div className='flex flex-col'>
            <h3 className='text-xl font-semibold mt-2'>Gender</h3>
            {['Men', 'Women'].map((gender) => (
              <label key={gender}>
                <input
                  type="checkbox"
                  value={gender}
                  checked={filters.gender.includes(gender)}
                  onChange={() => handleCheckboxChange('gender', gender)}
                />
                {gender}
              </label>
            ))}
        </div>
        <div className='flex flex-col'>
          <h3 className='text-xl font-semibold mt-2'>Color</h3>
          {['Blue', 'Black', 'Pink', 'White', 'Grey', 'Green', 'Purple', 'Red'].map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                value={color}
                checked={filters.color.includes(color)}
                onChange={() => handleCheckboxChange('color', color)}
              />
              {color}
            </label>
          ))}
        </div>
        <div className='flex flex-col'>
          <h3 className='text-xl font-semibold mt-2'>Type</h3>
          {['Polo', 'Basic', 'Hoodie'].map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                value={type}
                checked={filters.type.includes(type)}
                onChange={() => handleCheckboxChange('type', type)}
              />
              {type}
            </label>
          ))}
        </div>
        </div>
        <div className="flex flex-wrap md:w-[70%] w-full">
          {
            filteredItems || searchQuery ? (
              <ProductCard data={filteredItems} title="No products found... Try something different"/>
            ) : (
               <ProductCard data={allProducts} title="Getting data..."/>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Products
