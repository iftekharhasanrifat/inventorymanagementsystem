import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../components/Spinner'

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowAllStockOut = () => {
  const [stockOuts, setStockOuts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // For filtering
  const [search, setSearch] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/stockout")
      .then((res) => {
        setStockOuts(res.data.data);
        setFilteredItems(res.data.data); // Initialize filtered data
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }, []);

  // Handle search filtering
  useEffect(() => {
    const result = stockOuts.filter((stockOuts) => 
      stockOuts.Name.toLowerCase().includes(search.toLowerCase()) ||
      stockOuts.Category.toLowerCase().includes(search.toLowerCase()) ||
      stockOuts.Company.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(result);
  }, [search, stockOuts]);

  // Define columns for the DataTable
  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.Category,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.Company,
    },
    {
      name: "Quantity",
      selector: (row) => row.Quantity,
    },
    {
      name: "Buying Price Per Unit",
      selector: (row) => row.BuyingPricePerUnit,
    },
     {
      name: "Selling Price Per Unit",
      selector: (row) => row.SellingPricePerUnit,
    },
    {
      name: "Labour Cost Per Unit",
      selector: (row) => row.LabourCostPerUnit,
    },
    {
      name: "Hospitality",
      selector: (row) => row.Hospitality,
    },
    {
      name: "Client Name",
      selector: (row) => row.ClientName,
    },
    {
      name: "Client Phone",
      selector: (row) => row.ClientPhone,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
    },
    {
      name: "Profit",
      selector: (row) => parseFloat(row.Profit).toFixed(2),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-2">
          <Link to={`/stockout/details/${row._id}`}>
            <BsInfoCircle className="text-green-800 text-xl" />
          </Link>
          <Link to={`/stockout/edit/${row._id}`}>
            <AiOutlineEdit className="text-yellow-800 text-xl" />
          </Link>
          <Link to={`/stockout/delete/${row._id}`}>
            <MdOutlineDelete className="text-red-800 text-xl" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Stock Out Record</h1>
        <Link to="/stockout/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Category or Company"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* DataTable Component */}
      <DataTable
        title="Stock Out Record"
        columns={columns}
        data={filteredItems}
        progressPending={loading}
        progressComponent={<Spinner />}
        pagination
        highlightOnHover
        responsive
        fixedHeader
        fixedHeaderScrollHeight="500px"
        defaultSortFieldId={1}
      />
    </div>
  );
};

export default ShowAllStockOut;
