import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../components/Spinner'

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // For filtering
  const [search, setSearch] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/expenses")
      .then((res) => {
        setExpenses(res.data.data);
        setFilteredItems(res.data.data); // Initialize filtered data
        setLoading(false);
        // console.log(res.data.data)
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }, []);

  // Handle search filtering
  useEffect(() => {
    const result = expenses.filter((expense) => 
      expense.description.toLowerCase().includes(search.toLowerCase()) 
    );
    setFilteredItems(result);
  }, [search, expenses]);

  const dateFormatter = (dateString) => {
    const isoDate = dateString;
    const date = new Date(isoDate);
    const formatted = new Intl.DateTimeFormat("en-CA").format(date);
    return formatted;
  }
  // Define columns for the DataTable
  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Date",
      selector: (row) => dateFormatter(row.date),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Actions",
      width: "250px",
      cell: (row) => (
        <div className="flex flex-row justify-center items-center gap-2 overflow-x-auto">
          <Link to={`/expenses/details/${row._id}`}>
            <BsInfoCircle className="text-green-800 text-lg" />
          </Link>
          <Link to={`/expenses/edit/${row._id}`}>
            <AiOutlineEdit className="text-yellow-800 text-lg" />
          </Link>
          <Link to={`/expenses/delete/${row._id}`}>
            <MdOutlineDelete className="text-red-800 text-lg" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Expenses</h1>
        <Link to="/expenses/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by description..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* DataTable Component */}
      <DataTable
        title="Expenses List"
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

export default ShowExpenses;
