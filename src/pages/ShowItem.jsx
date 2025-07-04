import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/items/${id}`)
      .then((res) => {
        setItem(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">Item Details</h1>
      
      {loading ? (
       <div className='flex justify-center min-h-screen'>
       <Spinner />
     </div>
      ) : (
        <>
        <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6">
          {[
            { label: "Name", value: item.Name },
            { label: "Company", value: item.Company },
            { label: "Category", value: item.Category },
            { label: "Available Quantity", value: item.Quantity },
            { label: "Price", value: item.BuyingPrice },
        
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <span className="text-lg font-semibold text-gray-600">{item.label}:</span>
              <span className="text-lg text-gray-800">{item.value }</span>
            </div>
          ))}
        </div>
        </>
        
      )}
    </div>
  );
};

export default ShowItem;