import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditStockOut = () => {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [labourCostPerUnit, setLabourCostPerUnit] = useState('');
    const [hospitality, setHospitality] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, stockOutRes] = await Promise.all([
          axios.get('https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/items'),
          axios.get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/stockout/${id}`),
        ]);

        const itemList = itemsRes.data.data;
        setItems(itemList);

        const stockOut = stockOutRes.data;

        // Match item based on the name (e.g., "Seven Ring Cement")
        const matchedItem = itemList.find(
          (item) => item.Name === stockOut.Name
        );

        if (matchedItem) {
          setItemId(matchedItem._id);
          setName(matchedItem.Name);
          setCompany(matchedItem.Company);
          setCategory(matchedItem.Category);
        } else {
          // fallback if item no longer exists in the item list
          setItemId(stockOut.ItemId || '');
          setName(stockOut.Name || '');
          setCompany(stockOut.Company || '');
          setCategory(stockOut.Category || '');
        }

        setQuantity(stockOut.Quantity);
        setPricePerUnit(stockOut.SellingPricePerUnit);
        setLabourCostPerUnit(stockOut.LabourCostPerUnit);
        setHospitality(stockOut.Hospitality || 0);
        setClientName(stockOut.ClientName || '');
        setClientPhone(stockOut.ClientPhone || '');
        setDate(stockOut.Date);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!itemId) newErrors.item = 'Please select a valid item.';
    if (!quantity || Number(quantity) <= 0) newErrors.quantity = 'Enter a valid quantity.';
    if (!pricePerUnit || Number(pricePerUnit) <= 0) newErrors.pricePerUnit = 'Enter a valid price.';
    if (Number(labourCostPerUnit) < 0) newErrors.labourCostPerUnit = 'Enter valid labour cost.';
    if (!clientName) newErrors.clientName = 'Please enter client name.';
    if (!date) newErrors.date = 'Please select a date.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateStockOut = () => {
    if (!validate()) return;

    const data = {
      Name: name,
      Company: company,
      Category: category,
      Quantity: Number(quantity),
      SellingPricePerUnit: Number(pricePerUnit),
      LabourCostPerUnit: Number(labourCostPerUnit),
        Hospitality: Number(hospitality),
        ClientName: clientName,
        ClientPhone: clientPhone,
      Date: date,
    };

    setLoading(true);
    axios
      .put(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/stockout/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/stockout/show');
      })
      .catch((error) => {
        setLoading(false);
        setErrors({ api: error.response?.data?.message || 'An error occurred' });
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Edit Stock Out</h1>
      {loading && (
        <div className='flex justify-center min-h-screen'>
          <Spinner />
        </div>
      )}

      <div className='flex flex-col border-2 border-emerald-400 rounded-xl w-full max-w-lg p-4 mx-auto bg-white shadow-lg'>
        {/* Item Select */}
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Item</label>
          <select
            disabled
            value={itemId}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedItem = items.find((item) => item._id === selectedId);
              if (selectedItem) {
                setItemId(selectedItem._id);
                setName(selectedItem.Name);
                setCompany(selectedItem.Company);
                setCategory(selectedItem.Category);
              }
            }}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          >
            <option value=''>--Select Item--</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.Name}
              </option>
            ))}
          </select>
          {errors.item && <p className='text-red-500 text-sm mt-1'>{errors.item}</p>}
        </div>

        {/* Company */}
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Company</label>
          <input
            type='text'
            value={company}
            readOnly
            disabled
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
        </div>

        {/* Category */}
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Category</label>
          <input
            type='text'
            value={category}
            readOnly
            disabled
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
        </div>

        {/* Quantity */}
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Quantity</label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.quantity && <p className='text-red-500 text-sm mt-1'>{errors.quantity}</p>}
        </div>

        {/* Price Per Unit */}
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Selling Price Per Unit</label>
          <input
            type='number'
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.pricePerUnit && <p className='text-red-500 text-sm mt-1'>{errors.pricePerUnit}</p>}
        </div>

        {/* Labour Cost Per Unit */}
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Labour Cost Per Unit</label>
          <input
            type='number'
            value={labourCostPerUnit}
            onChange={(e) => setLabourCostPerUnit(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.labourCostPerUnit && <p className='text-red-500 text-sm mt-1'>{errors.labourCostPerUnit}</p>}
        </div>
            <div className='my-2'>
          <label className='text-lg text-gray-700'>Hospitality</label>
          <input
            type='number'
            value={hospitality}
            onChange={(e) => setHospitality(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
        </div>
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Client Name</label>
          <input
            type='text'
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.clientName && <p className='text-red-500 text-sm mt-1'>{errors.clientName}</p>}

        </div>
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Client Number</label>
          <input
            type='text'
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
        </div>
        {/* Date */}
        <div className='my-2'>
          <label className='text-lg text-gray-700'>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          />
          {errors.date && <p className='text-red-500 text-sm mt-1'>{errors.date}</p>}
        </div>

        {/* API error */}
        {errors.api && <p className='text-red-600 text-sm mt-2'>{errors.api}</p>}

        <button
          onClick={handleUpdateStockOut}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditStockOut;
