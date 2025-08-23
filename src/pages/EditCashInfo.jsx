import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCashInfo = () => {
  const [totalSaleAmount, setTotalSaleAmount] = useState('');
  const [dueAmount, setDueAmount] = useState('');
  const [bankAmount, setBankAmount] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    totalSaleAmount: '',
    dueAmount: '',
    bankAmount: '',
    date: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/cashinfo/${id}`)
      .then((res) => {
        const cashInfo = res.data.cashInfo;

        setTotalSaleAmount(cashInfo.totalSaleAmount ?? '');
        setDueAmount(cashInfo.dueAmount ?? '');
        setBankAmount(cashInfo.bankAmount ?? '');

        if (cashInfo.date) {
          try {
            const formattedDate = new Date(cashInfo.date).toISOString().split('T')[0];
            setDate(formattedDate);
          } catch (e) {
            setDate('');
          }
        } else {
          setDate('');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [id]);

  const handleUpdateCashInfo = () => {
    const newErrors = {
      totalSaleAmount: '',
      dueAmount: '',
      bankAmount: '',
      date: ''
    };
    let isValid = true;

    if (!totalSaleAmount || isNaN(totalSaleAmount) || totalSaleAmount <= 0) {
      newErrors.totalSaleAmount = 'Valid total sale amount is required.';
      isValid = false;
    }
    if (!dueAmount || isNaN(dueAmount) || dueAmount < 0) {
      newErrors.dueAmount = 'Valid due amount is required.';
      isValid = false;
    }
    if ( isNaN(bankAmount) || bankAmount < 0) {
      newErrors.bankAmount = 'Valid bank amount is required.';
      isValid = false;
    }
    if (!date.trim()) {
      newErrors.date = 'Date is required.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    const data = {
      totalSaleAmount: parseFloat(totalSaleAmount),
      dueAmount: parseFloat(dueAmount),
      bankAmount: parseFloat(bankAmount),
      date
    };

    setLoading(true);
    axios
      .put(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/cashinfo/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/cashinfos/show');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Edit Cashinfo</h1>
      {loading && (
        <div className="flex justify-center min-h-screen">
          <Spinner />
        </div>
      )}

      <div className="flex flex-col border-2 border-emerald-400 rounded-xl w-full max-w-lg p-4 mx-auto bg-white shadow-lg">
        <div className="my-2">
          <label className="text-lg text-gray-700">Total Sale Amount</label>
          <input
            type="number"
            value={totalSaleAmount ?? ''}
            onChange={(e) => setTotalSaleAmount(e.target.value)}
            className="border-2 border-gray-300 p-3 w-full rounded-lg"
          />
          {errors.totalSaleAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.totalSaleAmount}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-lg text-gray-700">Due Amount</label>
          <input
            type="number"
            value={dueAmount ?? ''}
            onChange={(e) => setDueAmount(e.target.value)}
            className="border-2 border-gray-300 p-3 w-full rounded-lg"
          />
          {errors.dueAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.dueAmount}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-lg text-gray-700">Bank Amount</label>
          <input
            type="number"
            value={bankAmount ?? ''}
            onChange={(e) => setBankAmount(e.target.value)}
            className="border-2 border-gray-300 p-3 w-full rounded-lg"
          />
          {errors.bankAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.bankAmount}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-lg text-gray-700">Date</label>
          <input
            type="date"
            value={date ?? ''}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-gray-300 p-3 w-full rounded-lg"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <button
          onClick={handleUpdateCashInfo}
          className="w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCashInfo;
