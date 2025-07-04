import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategories = () => {
  const [name, setName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
        name: '',
    });

  const handleSaveCategories = () => {
    const newErrors = {
        name: ''
    };
    let isValid = true;
     if (!name.trim()) {
        newErrors.name = 'Category name is required.';
        isValid = false;
    }

  setErrors(newErrors);

  if (!isValid) return;
    const data = {
      Name: name   
    };
  
    // console.log(data);
    setLoading(true);
    axios
      .post('https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/categories', data)
      .then(() => {
        setLoading(false);
        navigate('/categories/show');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Category Setup</h1>
      {loading && <div className='flex justify-center min-h-screen'>
          <Spinner />
        </div>}
        
      <div className='flex flex-col border-2 border-emerald-400 rounded-xl w-full max-w-lg p-4 mx-auto bg-white shadow-lg'>

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
          onClick={handleSaveCategories}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateCategories;


