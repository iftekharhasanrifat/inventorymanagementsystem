import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from '../components/Spinner'
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/categories")
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }, []);



   return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Category List</h1>
        <Link to='/categories/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl hover:text-sky-600 transition duration-300' />
        </Link>
      </div>

      {loading ? (
        <div className='flex justify-center min-h-screen'>
          <Spinner />
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-separate border-spacing-2'>
            <thead>
              <tr className='bg-sky-100'>
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Sl</th>
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Category Name</th>
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id} className='hover:bg-sky-50'>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{index + 1}</td>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{category.Name}</td>
                  <td className='border border-slate-700 py-2 px-4 text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/categories/edit/${category._id}`}>
                        <AiOutlineEdit className='text-yellow-800 text-2xl hover:text-yellow-600 transition duration-300' />
                      </Link>
                      <Link to={`/categories/delete/${category._id}`}>
                        <MdOutlineDelete className='text-red-800 text-2xl hover:text-red-600 transition duration-300' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowAllCategories;
