import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateItems = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
        company: '',
        category: '',
        name: '',
    });

  useEffect(() => {
    axios
      .get('http://localhost:5555/companies')
      .then((res) => {
        setCompanies(res.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    axios
      .get('http://localhost:5555/categories')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);


  const handleSaveItems = () => {
    const newErrors = {
        company: '',
        category: '',
        name: '',
    };
    let isValid = true;
    if (!company || company === '--Select Company--') {
    newErrors.company = 'Please select a valid company.';
    isValid = false;
  }

  if (!category || category === '--Select Category--') {
    newErrors.category = 'Please select a valid category.';
    isValid = false;
  }

  if (!name.trim()) {
    newErrors.name = 'Item name is required.';
    isValid = false;
  }

  setErrors(newErrors);

  if (!isValid) return;
    const data = {
      Name: name,
      Company: company,
      Category: category,   
    };
  
    // console.log(data);
    setLoading(true);
    axios
      .post('http://localhost:5555/items', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        newErrors.name = error.response?.data?.message || 'An error occurred';
        console.log(error);
      });
  };
  



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Item Setup</h1>
      {loading && <div className='flex justify-center min-h-screen'>
          <Spinner />
        </div>}
        
      <div className='flex flex-col border-2 border-emerald-400 rounded-xl w-full max-w-lg p-4 mx-auto bg-white shadow-lg'>
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Company</label>
          <select
            onChange={(e) => setCompany(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          >
            <option value='--Select Company--'>--Select Company--</option>
            {companies.map((company) => (
              <option key={company._id} value={company.Name}>
                {company.Name}
              </option>
            ))}
          </select>
          {errors.company && (
            <p className='text-red-500 text-sm mt-1'>{errors.company}</p>
        )}
        </div>
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          >
            <option value='--Select Category--'>--Select Category--</option>
            {categories.map((category) => (
              <option key={category._id} value={category.Name}>
                {category.Name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
        )}
        </div>

        <div className='my-2'>
          <label className='text-lg text-gray-700'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
        )}
        </div>

        <button
          onClick={handleSaveItems}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateItems;


