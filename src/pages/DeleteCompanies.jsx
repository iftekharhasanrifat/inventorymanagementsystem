
import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCompanies = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteCompany = () => {
    setLoading(true);
    axios
      .delete(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/companies/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/companies/show');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-6">
      <BackButton />
      <h1 className="text-3xl my-6 text-center font-semibold text-gray-700">Delete Company</h1>
      {loading && <div className='flex justify-center min-h-screen'>
          <Spinner />
        </div>}

      <div className="flex flex-col items-center border-2 border-rose-500 bg-white rounded-xl max-w-md mx-auto p-6 shadow-lg">
        <h3 className="text-2xl text-gray-800 font-semibold text-center">
          ⚠️ Are you sure you want to delete this company?
        </h3>

        <button
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-md mt-6 transition duration-200"
          onClick={handleDeleteCompany}
        >
          Yes, Delete It
        </button>
      </div>
    </div>
  );
};

export default DeleteCompanies;
