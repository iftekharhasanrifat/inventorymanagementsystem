import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';

const EditClientLedger = () => {
  const [type,setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const { id } = useParams(); // Assuming you are using react-router-dom v6
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
        description: '',
        date: '',
        amount: '',
    });


    useEffect(() => {
    axios
      .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/clients/ledger/entry/${id}`) // Fetching the item details by ID
      .then((res) => {
        const ledger = res.data;
        setType(ledger.type);
        setDescription(ledger.description);
        setAmount(ledger.amount);
        setDate(ledger.date?.substring(0, 10));
        // console.log(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
    
    }, []);
//   const handleUpdateClients = () => {
//     const newErrors = {
//         name: '',
//         phone: ''
//     };
//     let isValid = true;
//     if (!name.trim()) {
//         newErrors.name = 'Client name is required.';
//         isValid = false;
//     }
//     if (!phone.trim()) {
//         newErrors.phone = 'Phone is required.';
//         isValid = false;
//     }

//   setErrors(newErrors);

//   if (!isValid) return;
//     const data = {
//         name: name,
//         phone: phone,
//         totalDue: totalDue
//     };
  
//     // console.log(data);
//     setLoading(true);
//     axios
//       .put(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/clients/${id}`, data)
//       .then(() => {
//         setLoading(false);
//         navigate('/clients/show');
//       })
//       .catch((error) => {
//         setLoading(false);
//         newErrors.name = error.response?.data?.message || 'An error occurred';
//         console.log(error);
//       });
//   };
  
const handleUpdateClientLedger = () => {
  const newErrors = {
    description: '',
    amount: '',
    date: ''
  };
  let isValid = true;

  if (!description.trim()) {
    newErrors.description = 'description is required.';
    isValid = false;
  }

  if (!date.trim()) {
    newErrors.date = 'date is required.';
    isValid = false;
  }
    if (!amount || Number(amount) === 0) {
        newErrors.amount = 'Enter a valid amount.';
        isValid = false;
    }

  setErrors(newErrors);

  if (!isValid) return;

  const data = {
    description,
    amount: Number(amount)  ,
    date
  };

  setLoading(true);

  axios
    .put(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/clients/ledger/${id}`, data)
    .then(() => {
      setLoading(false);
      navigate('/clients/show');
    })
    .catch((error) => {
      setLoading(false);

      // Optional: check if error is validation-related
      const message = error.response?.data?.message || 'An error occurred';

      // Show server error as general error or assign to specific field
      setErrors({
        description: newErrors.description || '', // keep previous validation error if any
        amount: newErrors.amount || '',
        date: newErrors.date || '',
        server: message // optionally add a global server error
      });

      console.log(error);
    });
};



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Edit Client Ledger</h1>
      {loading && <div className='flex justify-center min-h-screen'>
          <Spinner />
        </div>}
        
      <div className='flex flex-col border-2 border-emerald-400 rounded-xl w-full max-w-lg p-4 mx-auto bg-white shadow-lg'>

        <div className='my-2'>
          <label className='text-lg text-gray-700'>Type</label>
          <input
            type='text'
            value={type}
            disabled
            onChange={(e) => setType(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {/* {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
        )} */}
        </div>
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
            type= 'number'
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
          onClick={handleUpdateClientLedger}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditClientLedger;


