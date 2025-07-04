import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Spinner from '../components/Spinner'
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/items")
      .then((res) => {
        setItems(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }, []);
  const handleDownloadPDF = () => {
    const doc = new jsPDF("landscape");
  
    // ✅ Title Styling
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(7, 89, 133);
    doc.text("Inventory Management System - Item Report", 14, 15);
  
    // ✅ Reset font and color
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
  
    // // ✅ Optional Item Info
    // if (item !== "--Select Item--" && item !== "") {
    //   doc.setFontSize(10);
    //   doc.setFont("helvetica", "bold");
    //   doc.text("Item Name : ", 14, 23);
    //   doc.text(`${item}`, 40, 23);
    // }
  
    // // ✅ Date Range
    // doc.setFontSize(10);
    // doc.setFont("helvetica", "bold");
    // doc.text("Date : ", 14, 30);
    // doc.text(`${sdate} To ${tdate}`, 40, 30);
  
    // ✅ Sort trader data by date
    // const sortedstockOuts = [...stockOuts].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    // ✅ Table headers
    const headers = [
      [
        "Sl", "Name", "Category", "Company", "Availbale Quantity", "Buying Price Per Unit"
      ],
    ];
  
    // ✅ Table body
    const data = items.map((item, index) => [
      index + 1,
      item.Name,
      item.Category,
      item.Company,
      item.Quantity,
      item.BuyingPrice,
    ]);
  
    // ✅ Render table
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 35,
      styles: { fontSize: 6, cellPadding: 3 },
      headStyles: {
        fillColor: [7, 89, 133],
        textColor: [255, 255, 255],
        fontSize: 6,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      rowPageBreak: "avoid",
      theme: "grid",
      margin: { top: 10 },
    });
  
    // ✅ Calculate remaining space
    const pageHeight = doc.internal.pageSize.height;
    let finalY = doc.lastAutoTable.finalY + 10;
    const footerHeight = 30;
  
    if (finalY + footerHeight > pageHeight) {
      doc.addPage();
      finalY = 15;
    }
  
    // ✅ Separator Line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(14, finalY - 5, 280, finalY - 5);
  
    // ✅ Footer Labels
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
  
  
    // ✅ Save PDF
    doc.save("item_report.pdf");
  };
  
  
    const handleExportExcel = () => {
      const ws = XLSX.utils.json_to_sheet(items.map((item, index) => ({
        Sl: index + 1,
        "Name": item.Name,
        "Company": item.Company,
        "Category": item.Category,
        "Available Quantity": item.Quantity,
        "Buying Price Per Unit": item.BuyingPrice,
        
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Item Report");
      XLSX.writeFile(wb, "Item_Report.xlsx");
    };
    


   return (
    <>
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Item List</h1>
        <Link to='/items/create'>
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
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Name</th>
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Company Name</th>
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Category Name</th>
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Available Quantity</th>
                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Price</th>

                <th className='border border-slate-600 py-2 px-4 rounded-md text-left'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id} className='hover:bg-sky-50'>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{index + 1}</td>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{item.Name}</td>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{item.Company}</td>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{item.Category}</td>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{item.Quantity}</td>
                  <td className='border border-slate-700 py-2 px-4 text-center'>{item.BuyingPrice}</td>


                  <td className='border border-slate-700 py-2 px-4 text-center'>
                    <div className='flex justify-center gap-x-4'>
                        <Link to={`/items/details/${item._id}`}>
                                    <BsInfoCircle className="text-green-800 text-xl" />
                                  </Link>
                      <Link to={`/items/edit/${item._id}`}>
                        <AiOutlineEdit className='text-yellow-800 text-2xl hover:text-yellow-600 transition duration-300' />
                      </Link>
                      <Link to={`/items/delete/${item._id}`}>
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
    <div className='flex justify-center mt-4'>
          <button
  onClick={handleDownloadPDF}
  className="p-2 m-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200"
>
  Download Report
</button>
            <button
          onClick={handleExportExcel}
          className='p-2 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200'
        >
          Export To Excel
        </button>
          </div>
      </>
  );
};

export default ShowAllItems;
