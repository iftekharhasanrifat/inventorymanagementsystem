import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowStockIn = () => {
  const { id } = useParams();
  const [stockinItem, setStockinItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/stockin/${id}`)
      .then((res) => {
        setStockinItem(res.data);
        setLoading(false);
        // console.log(res.data)
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
            { label: "Date", value: stockinItem.Date },
            { label: "Name", value: stockinItem.Name },
            { label: "Company", value: stockinItem.Company },
            { label: "Category", value: stockinItem.Category },
            { label: "Quantity", value: stockinItem.Quantity },
            { label: "Price Per Unit", value: stockinItem.PricePerUnit },
            { label: "Labour CostPer Unit", value: stockinItem.LabourCostPerUnit },
            { label: "Total Cost", value: stockinItem.TotalCost },
            { label: "Final Price", value: stockinItem.FinalPrice },
          ].map((stockinItem, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <span className="text-lg font-semibold text-gray-600">{stockinItem.label}:</span>
              <span className="text-lg text-gray-800">{stockinItem.value }</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowStockIn;