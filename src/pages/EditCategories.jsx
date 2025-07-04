import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';

const EditCategories = () => {
  const [name, setName] = useState('');
  const { id } = useParams(); // Assuming you are using react-router-dom v6
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
        name: '',
    });


    useEffect(() => {
    axios
      .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/categories/${id}`) // Fetching the item details by ID
      .then((res) => {
        const category = res.data;
        setName(category.Name);
      })
      .catch((error) => {
        console.error(error.message);
      });
    
    }, []);
  const handleUpdateCategories = () => {
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
      .put(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/categories/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/categories/show');
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
      <h1 className='text-3xl my-4 text-center'>Edit Category</h1>
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
          onClick={handleUpdateCategories}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCategories;


