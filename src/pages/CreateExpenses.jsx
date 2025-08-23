import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateExpenses = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(''); 
  const [date, setDate] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const [errors, setErrors] = useState({
        description: '',
        amount: '',
        date: ''
    });
    

  const handleSaveExpenses = () => {
    const newErrors = {
        description: '',
        amount: '',
        date: ''
    };
    let isValid = true;
    if (!description.trim()) {
        newErrors.description = 'Description is required.';
        isValid = false;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Valid amount is required.';
        isValid = false;
    }
    if (!date.trim()) {
        newErrors.date = 'Date is required.';
        isValid = false;
    }


  setErrors(newErrors);

  if (!isValid) return;
    const data = {
      description: description,
      amount: parseFloat(amount),
      date: date
    };
  
    // console.log(data);
    setLoading(true);
    axios
      .post('https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/expenses', data)
      .then(() => {
        setLoading(false);
        navigate('/expenses/show');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Create Expenses</h1>
      {loading && <div className='flex justify-center min-h-screen'>
          <Spinner />
        </div>}
        
      <div className='flex flex-col border-2 border-emerald-400 rounded-xl w-full max-w-lg p-4 mx-auto bg-white shadow-lg'>

        <div className='my-2'>
          <label className='text-lg text-gray-700'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.description && (
            <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
        )}
        </div>
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.amount && (
            <p className='text-red-500 text-sm mt-1'>{errors.amount}</p>
        )}
        </div>
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.date && (
            <p className='text-red-500 text-sm mt-1'>{errors.date}</p>
        )}
        </div>

        <button
          onClick={handleSaveExpenses}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateExpenses;


