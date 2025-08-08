import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [ledger, setLedger] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // For filtering
  const [search, setSearch] = useState(""); // Search input state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/clients/ledger/${id}`)
      .then((res) => {
        setClient(res.data.client);
        setLedger(res.data.ledger);
        setFilteredItems(res.data.ledger); // Initialize filtered data
        setLoading(false);
        // console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  useEffect(() => {
      const result = ledger.filter((client) => 
        client.type.toLowerCase().includes(search.toLowerCase()) ||
        client.date.toLowerCase().includes(search.toLowerCase()) 
      );
      setFilteredItems(result);
    }, [search, ledger]);
    const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // Add leading zero
  const day = (`0${date.getDate()}`).slice(-2);        // Add leading zero
  return `${year}-${month}-${day}`;
};

    const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Date",
      selector: (row) => formatDate(row.date),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
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
          {row.type!=='sale' &&<Link to={`/client/edit-ledger/${row._id}`}>
            <AiOutlineEdit className="text-yellow-800 text-lg" />
          </Link>}
          {row.type!=='sale' && <Link to={`/client/delete-ledger/${row._id}`}>
            <MdOutlineDelete className="text-red-800 text-lg" />
          </Link>}
          
          {/* <Link to={`/client/payment/${row._id}`}>
            <button className="bg-emerald-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Payment</button>
          </Link>
          <Link to={`/client/advance/${row._id}`}>
            <button className="bg-yellow-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Advance</button>
          </Link> */}
        </div>
      ),
    },
  ];
  


  return (
    <>
    <div className="p-4 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">Client Details</h1>
      
      {loading ? (
       <div className='flex justify-center min-h-screen'>
       <Spinner />
     </div>
      ) : (
        <>
        <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6">
          {[
            { label: "Name", value: client.name },
            { label: "Phone", value: client.phone },
            { label: "Total Due", value: client.totalDue }
          ].map((client, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <span className="text-lg font-semibold text-gray-600">{client.label}:</span>
              <span className="text-lg text-gray-800">{client.value }</span>
            </div>
          ))}
        </div>
        </>
        
      )}
    </div>
    <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            {/* <h1 className="text-3xl">Name: {client.name}</h1>
            <h1 className="text-3xl">Phone: {client.phone}</h1>
            <h1 className="text-3xl">Total Due: {client.totalDue}</h1> */}
            {/* <Link to="/client/create">
              <MdOutlineAddBox className="text-sky-800 text-4xl" />
            </Link> */}
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
            title={`${client.name} Ledger`}
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
        </>
  );
};

export default ClientDetails;