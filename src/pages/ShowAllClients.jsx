import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../components/Spinner'

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowAllClients = () => {
  const [clients, setClients] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // For filtering
  const [search, setSearch] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/clients")
      .then((res) => {
        setClients(res.data.data);
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
    const result = clients.filter((client) => 
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.toLowerCase().includes(search.toLowerCase()) 
    );
    setFilteredItems(result);
  }, [search, clients]);

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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Total Due",
      selector: (row) => row.totalDue,
    },
    {
      name: "Actions",
      width: "250px",
      cell: (row) => (
        <div className="flex flex-row justify-center items-center gap-2 overflow-x-auto">
          <Link to={`/client/details/${row._id}`}>
            <BsInfoCircle className="text-green-800 text-lg" />
          </Link>
          <Link to={`/client/edit/${row._id}`}>
            <AiOutlineEdit className="text-yellow-800 text-lg" />
          </Link>
          <Link to={`/client/delete/${row._id}`}>
            <MdOutlineDelete className="text-red-800 text-lg" />
          </Link>
          <Link to={`/client/payment/${row._id}`}>
            <button className="bg-emerald-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Payment</button>
          </Link>
          <Link to={`/client/advance/${row._id}`}>
            <button className="bg-yellow-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Advance</button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Clients</h1>
        <Link to="/client/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Phone"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* DataTable Component */}
      <DataTable
        title="Client List"
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

export default ShowAllClients;
