import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowStockOut = () => {
  const { id } = useParams();
  const [stockoutItem, setStockoutItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/stockout/${id}`)
      .then((res) => {
        setStockoutItem(res.data);
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
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">StockIn Item Details</h1>
      
      {loading ? (
       <div className='flex justify-center min-h-screen'>
       <Spinner />
     </div>
      ) : (
        <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6">
          {[
            { label: "Date", value: stockoutItem.Date },
            { label: "Name", value: stockoutItem.Name },
            { label: "Company", value: stockoutItem.Company },
            { label: "Category", value: stockoutItem.Category },
            { label: "Quantity", value: stockoutItem.Quantity },
            { label: "Buying Price Per Unit", value: stockoutItem.BuyingPricePerUnit },
            { label: "Selling Price Per Unit", value: stockoutItem.SellingPricePerUnit },
            { label: "Hospitality", value: stockoutItem.Hospitality },
            { label: "Labour CostPer Unit", value: stockoutItem.LabourCostPerUnit },
            { label: "Client Name", value: stockoutItem.ClientName },
            { label: "Client Phone", value: stockoutItem.ClientPhone },
            { label: "Profit", value: stockoutItem.Profit },
          ].map((stockoutItem, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <span className="text-lg font-semibold text-gray-600">{stockoutItem.label}:</span>
              <span className="text-lg text-gray-800">{stockoutItem.value }</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowStockOut;