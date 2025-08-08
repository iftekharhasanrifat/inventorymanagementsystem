import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';

const EditClients = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [totalDue, setTotalDue] = useState(0);
  const { id } = useParams(); // Assuming you are using react-router-dom v6
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
        name: '',
        phone: '',
        server: ''
    });


    useEffect(() => {
    axios
      .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/clients/${id}`) // Fetching the item details by ID
      .then((res) => {
        const client = res.data;
        setName(client.name);
        setPhone(client.phone);
        setTotalDue(client.totalDue);
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
  
const handleUpdateClients = () => {
  const newErrors = {
    name: '',
    phone: ''
  };
  let isValid = true;

  if (!name.trim()) {
    newErrors.name = 'Client name is required.';
    isValid = false;
  }

  if (!phone.trim()) {
    newErrors.phone = 'Phone is required.';
    isValid = false;
  }

  setErrors(newErrors);

  if (!isValid) return;

  const data = {
    name,
    phone,
    totalDue
  };

  setLoading(true);

  axios
    .put(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/clients/${id}`, data)
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
        name: newErrors.name || '', // keep previous validation error if any
        phone: newErrors.phone || '',
        server: message // optionally add a global server error
      });

      console.log(error);
    });
};



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Edit Client Info</h1>
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
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Phone</label>
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.phone && (
            <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
        )}
        </div>
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Total Due</label>
          <input
            type='text'
            value={totalDue}
            onChange={(e) => setTotalDue(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
        </div>

        <button
          onClick={handleUpdateClients}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditClients;


