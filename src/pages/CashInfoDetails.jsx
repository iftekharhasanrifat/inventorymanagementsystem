// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";

// import { useParams , Link} from "react-router-dom";
// import BackButton from "../components/BackButton";
// import Spinner from "../components/Spinner";

// const ShowExpense = () => {
//   const { id } = useParams();
//   const [expenses, setExpenses] = useState([]);
//   const [cashInfo, setCashInfo] = useState({});
//   const [totalExpense, setTotalExpense] = useState(0);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/cashinfo/${id}`)
//       .then((res) => {
//         setExpenses(res.data.expenses);
//         setCashInfo(res.data.cashInfo);
//         setTotalExpense(res.data.totalExpense);
//         setLoading(false);
//         console.log(res.data)
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, [id]);
//   const dateFormatter = (dateString) => {
//     const isoDate = dateString;
//     const date = new Date(isoDate);
//     const formatted = new Intl.DateTimeFormat("en-CA").format(date);
//     return formatted;
//   }

//   const columns = [
//     {
//       name: "Sl",
//       selector: (row, index) => index + 1,
//       sortable: true,
//       width: "60px",
//     },
//     {
//       name: "Date",
//       selector: (row) => dateFormatter(row.date),
//       sortable: true,
//     },
//     {
//       name: "Description",
//       selector: (row) => row.description,
//       sortable: true,
//     },
//     {
//       name: "Amount",
//       selector: (row) => row.amount,
//     }
//   ];
//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <BackButton />
//       <h1 className="text-3xl font-bold my-6 text-center text-gray-800">Cash Info Details</h1>
      
//       {loading ? (
//        <div className='flex justify-center min-h-screen'>
//        <Spinner />
//      </div>
//       ) : (
//         <>
//         <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6">
//           {[
//             { label: "Date", value: cashInfo.date ? new Date(cashInfo.date).toISOString().split("T")[0] : '' },
//             { label: "Total Sale Amount", value: cashInfo.totalSaleAmount },
//             { label: "Due Amount", value: cashInfo.dueAmount },
//             { label: "Cash Sale Amount", value: cashInfo.cashSaleAmount },
//             { label: "Expense", value: cashInfo.expense },
//             { label: "Bank Amount", value: cashInfo.bankAmount },
//             { label: "Cash", value: cashInfo.cash },
        
//           ].map((cashInfo, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center py-2 border-b last:border-none"
//             >
//               <span className="text-lg font-semibold text-gray-600">{cashInfo.label}:</span>
//               <span className="text-lg text-gray-800">{cashInfo.value }</span>
//             </div>
//           ))}
//         </div>
//         <div className="p-4">
//               {/* <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-3xl">Expenses</h1>
                
//               </div> */}
        
//               {/* Search Input */}
//               {/* <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Search by description..."
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//          */}
//               {/* DataTable Component */}
//               <DataTable
//                 title="Expenses"
//                 columns={columns}
//                 data={expenses}
//                 progressPending={loading}
//                 progressComponent={<Spinner />}
//                 pagination
//                 highlightOnHover
//                 responsive
//                 fixedHeader
//                 fixedHeaderScrollHeight="500px"
//                 defaultSortFieldId={1}
//               />
//             </div>
//             <div className="flex justify-end my-4">
//             <button
//               onClick={downloadPDF}
//               className="px-4 py-2 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700"
//             >
//               Download PDF
//             </button>
//           </div>
//         </>
        
//       )}
//     </div>
//   );
// };

// export default ShowExpense;
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ShowExpense = () => {
  const { id } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [cashInfo, setCashInfo] = useState({});
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://inventory-management-ba-git-4e9e06-iftekharhasanrifats-projects.vercel.app/cashinfo/${id}`)
      .then((res) => {
        setExpenses(res.data.expenses);
        setCashInfo(res.data.cashInfo);
        setTotalExpense(res.data.totalExpense);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const dateFormatter = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-CA").format(date);
  };

  // ✅ PDF Download Function
  const handleDownloadPDF = () => {
    const doc = new jsPDF("landscape");

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(7, 89, 133);
    doc.text("Cash Info - Expense Report", 14, 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    // ✅ Cash Info Details Section
    const details = [
      ["Date", cashInfo.date ? new Date(cashInfo.date).toISOString().split("T")[0] : ""],
      ["Total Sale Amount", cashInfo.totalSaleAmount || 0],
      ["Due Amount", cashInfo.dueAmount || 0],
      ["Cash Sale Amount", cashInfo.cashSaleAmount || 0],
      ["Expense", cashInfo.expense || 0],
      ["Bank Amount", cashInfo.bankAmount || 0],
      ["Cash", cashInfo.cash || 0],
    ];

    autoTable(doc, {
      startY: 25,
      head: [["Label", "Value"]],
      body: details,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [7, 89, 133], textColor: 255 },
      theme: "grid",
    });

    // ✅ Expenses Table Section
    const expenseData = expenses.map((row, index) => [
      index + 1,
      dateFormatter(row.date),
      row.description,
      row.amount,
    ]);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Sl", "Date", "Description", "Amount"]],
      body: expenseData,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [7, 89, 133], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      theme: "grid",
    });

    // ✅ Footer (Total Expense)
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total Expense: ", 14, finalY);
    doc.setTextColor(7, 89, 133);
    doc.text(`${totalExpense} Tk/-`, 50, finalY);

    // ✅ Save File
    doc.save("CashInfo_Expense_Report.pdf");
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
  ];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">
        Cash Info Details
      </h1>

      {loading ? (
        <div className="flex justify-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="border border-gray-300 rounded-lg shadow-lg bg-white p-6">
            {[
              { label: "Date", value: cashInfo.date ? new Date(cashInfo.date).toISOString().split("T")[0] : "" },
              { label: "Total Sale Amount", value: cashInfo.totalSaleAmount },
              { label: "Due Amount", value: cashInfo.dueAmount },
              { label: "Cash Sale Amount", value: cashInfo.cashSaleAmount },
              { label: "Expense", value: cashInfo.expense },
              { label: "Bank Amount", value: cashInfo.bankAmount },
              { label: "Cash", value: cashInfo.cash },
            ].map((info, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >
                <span className="text-lg font-semibold text-gray-600">{info.label}:</span>
                <span className="text-lg text-gray-800">{info.value}</span>
              </div>
            ))}
          </div>

          
          <div className="p-4">
            <DataTable
              title="Expenses"
              columns={columns}
              data={expenses}
              pagination
              highlightOnHover
              responsive
              fixedHeader
              fixedHeaderScrollHeight="500px"
              defaultSortFieldId={1}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDownloadPDF}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Download PDF
            </button>
          </div>

        </>
      )}
    </div>
  );
};

export default ShowExpense;
