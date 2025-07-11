import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";  // ✅ Import autoTable separately

const ShowStockInLogReport = () => {
  const [items, setItems] = useState([]);
  const [stockIns, setStockIns] = useState([]);
  const [item, setItem] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [profit, setProfit] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [buyingPricePerUnit, setBuyingPricePerUnit] = useState(0);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(0);
  const [labourCostPerUnit, setLabourCostPerUnit] = useState(0);
  const [hospitality, setHospitality] = useState(0);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [sdate, setSDate] = useState('');
  const [tdate, setTDate] = useState('');

  const [loading, setLoading] = useState(false);

  const pdfRef = useRef();

  useEffect(() => {
    axios
      .get('https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/items')
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  
  const handleDownloadPDF = () => {
  const doc = new jsPDF("landscape");

  // ✅ Title Styling
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(7, 89, 133);
  doc.text("Inventory Management System - StockIn Log Report", 14, 15);

  // ✅ Reset font and color
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  // ✅ Optional Item Info
  if (item !== "--Select Item--" && item !== "") {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Item Name : ", 14, 23);
    doc.text(`${item}`, 40, 23);
  }

  // ✅ Date Range
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Date : ", 14, 30);
  doc.text(`${sdate} To ${tdate}`, 40, 30);

  // ✅ Sort trader data by date
  const sortedstockIns = [...stockIns].sort((a, b) => new Date(a.date) - new Date(b.date));

  // ✅ Table headers
  const headers = [
    [
      "Sl", "Date", "Name", "Category", "Company", "Quantity", "Price Per Unit", "Labour Cost Per Unit", "Final Price", "Total Cost"
    ],
  ];

  // ✅ Table body
  const data = sortedstockIns.map((stockIn, index) => [
    index + 1,
    stockIn.Date,
    stockIn.Name,
    stockIn.Category,
    stockIn.Company,
    stockIn.Quantity,
    stockIn.PricePerUnit,
    stockIn.LabourCostPerUnit,
    stockIn.FinalPrice,
    stockIn.TotalCost,
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


  doc.text("Total Cost : ", 14, finalY + 3);

 

  // ✅ Footer Values
  doc.setTextColor(7, 89, 133);
  const alignRightX = 255;
  doc.text(`${totalCost} Tk/-`, alignRightX, finalY + 3);

  // ✅ Save PDF
  doc.save("StockInLog_Report.pdf");
};


  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(stockIns.map((sotckIn, index) => ({
      Sl: index + 1,
      Date: sotckIn.Date,
      "Name": sotckIn.Name,
      "Company": sotckIn.Company,
      "Category": sotckIn.Category,
      "Quantity": sotckIn.Quantity,
      "Price Per Unit": sotckIn.PricePerUnit,
      "Labour Cost Per Unit": sotckIn.LabourCostPerUnit,
      "Final Price": sotckIn.FinalPrice,
      "Total Cost": sotckIn.TotalCost,
      
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Profit Report");
    XLSX.writeFile(wb, "Profit_Report.xlsx");
  };
  

  const handleShowTotalCost = () => {
    const month = sdate.split('-')[1];
    const year = sdate.split('-')[0];
    const url = item === '--Select Item--' || item === ''
      ? `https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/stockin/totaltaka/${sdate}/${tdate}`
      : `https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/stockin/totaltaka/${item}/${sdate}/${tdate}`;

      console.log(url)
    axios
      .get(url)
      .then((res) => {
        setStockIns(res.data.data);
        setTotalCost(res.data.totalCost);
        setLoading(false);
        console.log(res.data.data)
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <div className='my-2'>
        <div className='flex flex-col border-2 border-emerald-400 rounded-xl p-4 mx-auto w-full max-w-md'>
          <div className='my-1'>
            <label className='mr-4 text-gray-500'>Item</label>
            <select
              onChange={(e) => setItem(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              name='cars'
              id='cars'
            >
              <option value='--Select Item--'>--Select Item--</option>
              {items.map((item) => (
                <option key={item._id} value={item.Name}>
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className='my-1'>
            <label className='mr-4 text-gray-500'>From Date</label>
            <input
              type='date'
              value={sdate}
              onChange={(e) => setSDate(e.target.value)}
              className='border-2 border-gray-400 px-4 py-2 w-full'
            />
          </div>
          <div className='my-1'>
            <label className='mr-4 text-gray-500'>To Date</label>
            <input
              type='date'
              value={tdate}
              onChange={(e) => setTDate(e.target.value)}
              className='border-2 border-gray-400 px-4 py-2 w-full'
            />
          </div>
          <button
            className='p-2 bg-emerald-500 hover:bg-emerald-600 m-8 text-white rounded-lg transition-all duration-200'
            onClick={handleShowTotalCost}
          >
            Generate Report
          </button>
        </div>
      </div>

      {stockIns.length > 0 && (
        <>
          <div ref={pdfRef} className='p-4'>
            <div className='flex justify-center items-center'>
              <div>
                <h1 className='text-3xl my-4'>Saber Traders Unit 2</h1>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full table-auto border-separate border-spacing-2'>
                <thead>
                  <tr>
                    <th className='border border-slate-600 rounded-md p-2'>Sl</th>
                    <th className='border border-slate-600 rounded-md p-2'>Date</th>
                    <th className='border border-slate-600 rounded-md p-2'>Name</th>
                    <th className='border border-slate-600 rounded-md p-2'>Category</th>
                    <th className='border border-slate-600 rounded-md p-2'>Company</th>
                    <th className='border border-slate-600 rounded-md p-2'>Quantity</th>
                    <th className='border border-slate-600 rounded-md p-2'>Price Per Unit</th>
                    <th className='border border-slate-600 rounded-md p-2'>Labour Cost Per Unit</th>
                    <th className='border border-slate-600 rounded-md p-2'>Final Price</th>
                    <th className='border border-slate-600 rounded-md p-2'>Total Cost</th>

                  </tr>
                </thead>
                <tbody>
                  {/* {stockIns.map((trader, index) => (
                    <tr key={trader._id}>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{index + 1}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.date}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.truckNo}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.description}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.quantityOfCementBagRod}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.priceRate}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.taka}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.driverSalary}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.fuelExpense}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.labourGratuity}</td>
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.toll}</td>
                      {
                        trader.transportCost>0 && trader.transportCostDescription!=="" && trader.transportCostDescription !== undefined?
                        <td className='border border-slate-700 rounded-md text-center p-2'>{trader.transportCost} ({trader.transportCostDescription})</td>:
                        <td className='border border-slate-700 rounded-md text-center p-2'>{trader.transportCost}</td>
                      }
                      <td className='border border-slate-700 rounded-md text-center p-2'>{trader.remainingTaka}</td>
                    </tr>
                  ))} */}

{stockIns
  .slice() // Create a shallow copy to avoid mutating the original array
  .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sorting in ascending order
  .map((stockin, index) => (
    <tr key={stockin._id}>
      <td className='border border-slate-700 rounded-md text-center p-2'>{index + 1}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.Date}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.Name}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.Category}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.Company}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.Quantity}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.PricePerUnit}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.LabourCostPerUnit}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.FinalPrice}</td>
      <td className='border border-slate-700 rounded-md text-center p-2'>{stockin.TotalCost}</td>

    </tr>
  ))}
                </tbody>
              </table>
            </div>

            <div className='flex justify-between items-center'>
              <h4 className='text-xl my-1'>Total Cost</h4>
              <div className='flex gap-x-8'>     
                <h4 className='text-sky-800 text-xl'>{totalCost}Tk/-</h4>
              </div>
            </div>
            
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
      )}
    </>
  );
};

export default ShowStockInLogReport;
