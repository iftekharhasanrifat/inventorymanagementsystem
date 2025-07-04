import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../components/Spinner'

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowAllStockIn = () => {
  const [stockInLogs, setStockInLogs] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // For filtering
  const [search, setSearch] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/stockin")
      .then((res) => {
        setStockInLogs(res.data.data);
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
    const result = stockInLogs.filter((stockInLog) => 
      stockInLog.Name.toLowerCase().includes(search.toLowerCase()) ||
      stockInLog.Category.toLowerCase().includes(search.toLowerCase()) ||
      stockInLog.Company.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(result);
  }, [search, stockInLogs]);

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
      name: "Price Per Unit",
      selector: (row) => row.PricePerUnit,
    },
    {
      name: "Labour Cost Per Unit",
      selector: (row) => row.LabourCostPerUnit,
    },
    {
      name: "Total Cost",
      selector: (row) => row.TotalCost,
    },
    {
      name: "Final Price",
      selector: (row) => row.FinalPrice,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-2">
          <Link to={`/stockin/details/${row._id}`}>
            <BsInfoCircle className="text-green-800 text-xl" />
          </Link>
          <Link to={`/stockin/edit/${row._id}`}>
            <AiOutlineEdit className="text-yellow-800 text-xl" />
          </Link>
          <Link to={`/stockin/delete/${row._id}`}>
            <MdOutlineDelete className="text-red-800 text-xl" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Stock_In_Log</h1>
        <Link to="/stockin/create">
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
        title="Stock In Logs"
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

export default ShowAllStockIn;
