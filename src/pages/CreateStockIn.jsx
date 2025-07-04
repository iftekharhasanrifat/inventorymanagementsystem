// import React, { useState, useEffect } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateStockIn = () => {
//   const [items, setItems] = useState([]);
//   const [itemId, setItemId] = useState('');
//   const [name, setName] = useState('');
//   const [company, setCompany] = useState('');
//   const [category, setCategory] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [pricePerUnit, setPricePerUnit] = useState('');
//   const [labourCostPerUnit, setLabourCostPerUnit] = useState('');
//   const [date, setDate] = useState('');
  
  
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({
//         company: '',
//         category: '',
//         name: '',
//     });

//   useEffect(() => {
//     axios
//       .get('http://localhost:5555/items')
//       .then((res) => {
//         setItems(res.data.data);
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }, []);


//   const handleSaveStockIn = () => {
//     console.log(name,itemId, company, category, quantity, pricePerUnit, labourCostPerUnit, date);
// //     const newErrors = {
// //         company: '',
// //         category: '',
// //         name: '',
// //     };
// //     let isValid = true;
// //     if (!company || company === '--Select Company--') {
// //     newErrors.company = 'Please select a valid company.';
// //     isValid = false;
// //   }

// //   if (!category || category === '--Select Category--') {
// //     newErrors.category = 'Please select a valid category.';
// //     isValid = false;
// //   }

// //   if (!name.trim()) {
// //     newErrors.name = 'Item name is required.';
// //     isValid = false;
// //   }

// //   setErrors(newErrors);

// //   if (!isValid) return;
//     const data = {
//       Name: name,
//       Company: company,
//       Category: category,   
//       ItemId: itemId,
//       Quantity: Number(quantity),
//       PricePerUnit: Number(pricePerUnit),
//       LabourCostPerUnit: Number(labourCostPerUnit),
//       Date: date,
//     };
  
// //     // console.log(data);
// //     setLoading(true);
//     axios
//       .post('http://localhost:5555/stockin', data)
//       .then(() => {
//         setLoading(false);
//         navigate('/stockin-log');
//       })
//       .catch((error) => {
//         setLoading(false);
//         newErrors.name = error.response?.data?.message || 'An error occurred';
//         console.log(error);
//       });
//   };
  



//   return (
//     <div className='p-4'>
//       <BackButton />
//       <h1 className='text-3xl my-4 text-center'>Create Stock</h1>
//       {loading && <div className='flex justify-center min-h-screen'>
//           <Spinner />
//         </div>}
        
//       <div className='flex flex-col border-2 border-emerald-400 rounded-xl w-full max-w-lg p-4 mx-auto bg-white shadow-lg'>
//         <div className='my-2'>
//           <label className='text-lg text-gray-700'>Item</label>
//           {/* <select
//             onChange={(e) =>{
//                 setName(e.target.value)
//                 setItemId(e.target.key)
//                 console.log(e.target.value, e.target.key)
//             }}
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           >
//             <option value='--Select Company--'>--Select Item--</option>
//             {items.map((item) => (
//               <option key={item._id} value={item.Name}>
//                 {item.Name}
//               </option>
//             ))}
//           </select> */}
//           {/* <select
//         onChange={(e) => {
//         const selected = JSON.parse(e.target.value);
//         setName(selected.name);
//     setItemId(selected.id);
//     setCompany(selected.company);
//     setCategory(selected.category);
//     // console.log(selected.name, selected.id);
//   }}
//   className='border-2 border-gray-300 p-3 w-full rounded-lg'
// >
//   <option value=''>--Select Item--</option>
//   {items.map((item) => (
//     <option key={item._id} value={JSON.stringify({ name: item.Name, id: item._id ,company: item.Company, category: item.Category })}>
//       {item.Name}
//     </option>
//   ))}
// </select> */}
//             <select
//   onChange={(e) => {
//     if (!e.target.value) {
//       setName('');
//       setItemId('');
//       setCompany('');
//       setCategory('');
//       return;
//     }

//     const selected = JSON.parse(e.target.value);
//     setName(selected.name);
//     setItemId(selected.id);
//     setCompany(selected.company);
//     setCategory(selected.category);
//   }}
//   className='border-2 border-gray-300 p-3 w-full rounded-lg'
// >
//   <option value=''>--Select Item--</option>
//   {items.map((item) => (
//     <option
//       key={item._id}
//       value={JSON.stringify({
//         name: item.Name,
//         id: item._id,
//         company: item.Company,
//         category: item.Category,
//       })}
//     >
//       {item.Name}
//     </option>
//   ))}
// </select>

//           {errors.company && (
//             <p className='text-red-500 text-sm mt-1'>{errors.company}</p>
//         )}
//         </div>
//         {/* <div className='my-2'>
//           <label className='text-lg text-gray-700'>Category</label>
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           >
//             <option value='--Select Category--'>--Select Category--</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category.Name}>
//                 {category.Name}
//               </option>
//             ))}
//           </select>
//           {errors.category && (
//             <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
//         )}
//         </div> */}
//         <div className='my-2'>
//           <label className='text-lg text-gray-700'>Company</label>
//           <input
//             type='text'
//             value={company}
//             // onChange={(e) => setName(e.target.value)}
//             readOnly
//             disabled
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           />
//           {errors.company && (
//             <p className='text-red-500 text-sm mt-1'>{errors.company}</p>
//         )}
//         </div>
//         <div className='my-2'>
//           <label className='text-lg text-gray-700'>Category</label>
//           <input
//             type='text'
//             value={category}
//             // onChange={(e) => setName(e.target.value)}
//             readOnly
//             disabled
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           />
//           {errors.category && (
//             <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
//         )}
//         </div>
//         <div className='my-2'>
//           <label className='text-lg text-gray-700'>Quantity</label>
//           <input
//             type='number'
//             onChange={(e) => setQuantity(e.target.value)}
            
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           />
//           {errors.category && (
//             <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
//         )}
//         </div>
//         <div className='my-2'>
//           <label className='text-lg text-gray-700'>Price Per Unit</label>
//           <input
//             type='number'
//             onChange={(e) => setPricePerUnit(e.target.value)}
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           />
//           {errors.name && (
//             <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
//         )}
//         </div>
//         <div className='my-2'>
//           <label className='text-lg text-gray-700'>Labour Cost Per Unit</label>
//           <input
//             type='number'
//             onChange={(e) => setLabourCostPerUnit(e.target.value)}
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           />
//           {errors.name && (
//             <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
//         )}
//         </div>
//         <div className='my-2'>
//           <label className='text-lg text-gray-700'>Date</label>
//           <input
//             type='date'
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className='border-2 border-gray-300 p-3 w-full rounded-lg'
//           />
//         </div>
//         <button
//           onClick={handleSaveStockIn}
//           className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
//         >
//           Create
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateStockIn;


import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStockIn = () => {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [labourCostPerUnit, setLabourCostPerUnit] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5555/items')
      .then((res) => setItems(res.data.data))
      .catch((error) => console.error(error.message));
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!itemId) newErrors.item = 'Please select a valid item.';
    if (!quantity || Number(quantity) <= 0) newErrors.quantity = 'Enter a valid quantity.';
    // if (!pricePerUnit || Number(pricePerUnit) <= 0) newErrors.pricePerUnit = 'Enter a valid price.';
    if (!labourCostPerUnit || Number(labourCostPerUnit) < 0) newErrors.labourCostPerUnit = 'Enter valid labour cost.';
    if (!date) newErrors.date = 'Please select a date.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveStockIn = () => {
    if (!validate()) return;

    

    const data = {
      Name: name,
      Company: company,
      Category: category,
      ItemId: itemId,
      Quantity: Number(quantity),
      PricePerUnit: Number(pricePerUnit),
      LabourCostPerUnit: Number(labourCostPerUnit),
      Date: date,
    };

    const fittingsData = {
      Name: name,
      Company: company,
      Category: category,
      ItemId: itemId,
      Quantity: Number(quantity),
      LabourCostPerUnit: Number(labourCostPerUnit),
      Date: date,
    };

    setLoading(true);
    if (category === 'fittings') {
      axios
      .post('http://localhost:5555/stockin/transform', fittingsData)
      .then(() => {
        setLoading(false);
        navigate('/stockIn/show');
      })
      .catch((error) => {
        setLoading(false);
        setErrors({ api: error.response?.data?.message || 'An error occurred' });
        console.error(error);
      });
    }
    else {
      axios
      .post('http://localhost:5555/stockin', data)
      .then(() => {
        setLoading(false);
        navigate('/stockIn/show');
      })
      .catch((error) => {
        setLoading(false);
        setErrors({ api: error.response?.data?.message || 'An error occurred' });
        console.error(error);
      });
    }
    
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Create Stock</h1>
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
            onChange={(e) => {
              if (!e.target.value) {
                setName('');
                setItemId('');
                setCompany('');
                setCategory('');
                return;
              }
              const selected = JSON.parse(e.target.value);
              setName(selected.name);
              setItemId(selected.id);
              setCompany(selected.company);
              setCategory(selected.category);
            }}
            className='border-2 border-gray-300 p-3 w-full rounded-lg'
          >
            <option value=''>--Select Item--</option>
            {items.map((item) => (
              <option
                key={item._id}
                value={JSON.stringify({
                  name: item.Name,
                  id: item._id,
                  company: item.Company,
                  category: item.Category,
                })}
              >
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
        {category !== 'fittings' && (
          <div className='my-2'>
            <label className='text-lg text-gray-700'>Price Per Unit</label>
            <input
              type='number'
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              className='border-2 border-gray-300 p-3 w-full rounded-lg'
            />
            {errors.pricePerUnit && <p className='text-red-500 text-sm mt-1'>{errors.pricePerUnit}</p>}
          </div>
        )}

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

        {/* General API error */}
        {errors.api && <p className='text-red-600 text-sm mt-2'>{errors.api}</p>}

        <button
          onClick={handleSaveStockIn}
          className='w-full py-3 mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition duration-200'
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateStockIn;
