
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "../App";

// const Navbar = () => {
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [isShowOpen, setIsShowOpen] = useState(false);
//   const [isReportOpen, setIsReportOpen] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [mobileCreateOpen, setMobileCreateOpen] = useState(false);
//   const [mobileShowOpen, setMobileShowOpen] = useState(false);
//   const [mobileReportOpen, setMobileReportOpen] = useState(false);

//   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//   // const user = JSON.parse(sessionStorage.getItem("user"));
//   const user = JSON.parse(localStorage.getItem("user"));


//   const handleLogout = () => {
//     window.location.reload();
//     // sessionStorage.clear();
//     localStorage.clear();
//   };

//   return (
//     <nav className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="w-8 h-8 text-emerald-400"
//           >
//             <path d="M3 16V6a2 2 0 012-2h10a2 2 0 012 2v10m-6 4a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4zm12-6h4l3 3v3h-3m-4 0h-2m2 0V8h4m-4 0l3 3" />
//           </svg>
//           <span className="text-2xl font-bold tracking-wide text-emerald-400">
//             Inventory Management System
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-6 items-start relative">
//           <li>
//             <Link to="/" className="hover:text-gray-300 transition">Home</Link>
//           </li>

//           <li className="relative">
//             <button onClick={() => setIsCreateOpen(!isCreateOpen)} className="hover:text-gray-300 transition">
//               Create ▾
//             </button>
//             {isCreateOpen && (
//               <ul className="absolute bg-gray-700 mt-2 rounded shadow-md z-10 min-w-[180px]">
//                 <li><Link to="/items/create" className="block px-4 py-2 hover:bg-gray-600">Item Setup</Link></li>
//                 <li><Link to="/categories/create" className="block px-4 py-2 hover:bg-gray-600">Category Setup</Link></li>
//                 <li><Link to="/companies/create" className="block px-4 py-2 hover:bg-gray-600">Company Setup</Link></li>
//               </ul>
//             )}
//           </li>

//           <li className="relative">
//             <button onClick={() => setIsShowOpen(!isShowOpen)} className="hover:text-gray-300 transition">
//               Show ▾
//             </button>
//             {isShowOpen && (
//               <ul className="absolute bg-gray-700 mt-2 rounded shadow-md z-10 min-w-[180px]">
//                 <li><Link to="/items/show" className="block px-4 py-2 hover:bg-gray-600">Item List</Link></li>
//                 <li><Link to="/categories/show" className="block px-4 py-2 hover:bg-gray-600">Category List</Link></li>
//                 <li><Link to="/companies/show" className="block px-4 py-2 hover:bg-gray-600">Company List</Link></li>
//                 <li><Link to="/stockIn/show" className="block px-4 py-2 hover:bg-gray-600">Stock In Log</Link></li>
//                 <li><Link to="/stockout/show" className="block px-4 py-2 hover:bg-gray-600">Stock Out Record</Link></li>

//               </ul>
//             )}
//           </li>

//           <li className="relative">
//             <button onClick={() => setIsReportOpen(!isReportOpen)} className="hover:text-gray-300 transition">
//               Show Report ▾
//             </button>
//             {isReportOpen && (
//               <ul className="absolute bg-gray-700 mt-2 rounded shadow-md z-10 min-w-[180px]">
//                 <li><Link to="/profit/show" className="block px-4 py-2 hover:bg-gray-600">Profit Report</Link></li>
//                 <li><Link to="/stockin-log" className="block px-4 py-2 hover:bg-gray-600">Stock In Log Report</Link></li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <Link to="/stockin/create" className="hover:text-gray-300 transition">Stock In</Link>
//           </li>
//           <li>
//             <Link to="/stockout/create" className="hover:text-gray-300 transition">Stock Out</Link>
//           </li>
//           {loggedInUser.username || user ? (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/signin"
//               className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition"
//             >
//               Login
//             </Link>
//           )}
//         </ul>

//         {/* Mobile Menu Toggle */}
//         <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden text-2xl focus:outline-none">
//           {isMobileOpen ? "✖" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Accordion Menu */}
//       {isMobileOpen && (
//         <div className="md:hidden bg-gray-800 text-white px-4 py-2 space-y-2">
//           <Link to="/" className="block py-2 hover:text-gray-300 transition">Home</Link>

//           {/* Mobile Accordion: Create */}
//           <div>
//             <button onClick={() => setMobileCreateOpen(!mobileCreateOpen)} className="w-full text-left py-2">
//               Create ▾
//             </button>
//             {mobileCreateOpen && (
//               <div className="ml-4 space-y-1">
//                 <Link to="/items/create" className="block py-1 hover:text-gray-300">Item Setup</Link>
//                 <Link to="/categories/create" className="block py-1 hover:text-gray-300">Category Setup</Link>
//                 <Link to="/companies/create" className="block py-1 hover:text-gray-300">Company Setup</Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Accordion: Show */}
//           <div>
//             <button onClick={() => setMobileShowOpen(!mobileShowOpen)} className="w-full text-left py-2">
//               Show ▾
//             </button>
//             {mobileShowOpen && (
//               <div className="ml-4 space-y-1">
//                 <Link to="/items/show" className="block py-1 hover:text-gray-300">Item List</Link>
//                 <Link to="/categories/show" className="block py-1 hover:text-gray-300">Category List</Link>
//                 <Link to="/companies/show" className="block py-1 hover:text-gray-300">Company List</Link>
//                 <Link to="/stockIn/show" className="block py-1 hover:text-gray-300">Stock In Log</Link>
//                 <Link to="/stockout/show" className="block py-1 hover:text-gray-300">Stock Out Record</Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Accordion: Report */}
//           <div>
//             <button onClick={() => setMobileReportOpen(!mobileReportOpen)} className="w-full text-left py-2">
//               Show Report ▾
//             </button>
//             {mobileReportOpen && (
//               <div className="ml-4 space-y-1">
//                 <Link to="/profit/show" className="block py-1 hover:text-gray-300">Profit Report</Link>
//                 <Link to="/stockin-log" className="block py-1 hover:text-gray-300">Stock In Log Report</Link>
//               </div>
//             )}
//           </div>
//             <Link to="/stockIn/create" className="block py-2 hover:text-gray-300 transition">Stock In</Link> 
//             <Link to="/stockout/create" className="block py-2 hover:text-gray-300 transition">Stock Out</Link>
//           {user ? (
//             <button onClick={handleLogout} className="w-full mt-2 bg-rose-500 hover:bg-rose-600 py-2 rounded-md transition">
//               Logout
//             </button>
//           ) : (
//             <Link to="/signin" className="block w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-center py-2 rounded-md transition">
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isShowOpen, setIsShowOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileCreateOpen, setMobileCreateOpen] = useState(false);
  const [mobileShowOpen, setMobileShowOpen] = useState(false);
  const [mobileClientOpen, setMobileClientOpen] = useState(false);
  const [mobileReportOpen, setMobileReportOpen] = useState(false);

  const [loggedInUser] = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-zinc-900 text-zinc-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <svg
            className="w-8 h-8 text-emerald-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 16V6a2 2 0 012-2h10a2 2 0 012 2v10m-6 4a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4zm12-6h4l3 3v3h-3m-4 0h-2m2 0V8h4m-4 0l3 3" />
          </svg>
          <span className="text-2xl font-bold text-emerald-400">
            Inventory Management
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-start relative">
          <li><Link to="/" className="hover:text-emerald-400 transition">Home</Link></li>

          <li className="relative">
            <button onClick={() => setIsCreateOpen(!isCreateOpen)} className="hover:text-emerald-400 transition">
              Create ▾
            </button>
            {isCreateOpen && (
              <ul className="absolute bg-zinc-800 mt-2 rounded shadow-md z-10 min-w-[180px]">
                <li><Link to="/items/create" className="block px-4 py-2 hover:bg-zinc-700">Item Setup</Link></li>
                <li><Link to="/categories/create" className="block px-4 py-2 hover:bg-zinc-700">Category Setup</Link></li>
                <li><Link to="/companies/create" className="block px-4 py-2 hover:bg-zinc-700">Company Setup</Link></li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button onClick={() => setIsShowOpen(!isShowOpen)} className="hover:text-emerald-400 transition">
              Show ▾
            </button>
            {isShowOpen && (
              <ul className="absolute bg-zinc-800 mt-2 rounded shadow-md z-10 min-w-[180px]">
                <li><Link to="/items/show" className="block px-4 py-2 hover:bg-zinc-700">Item List</Link></li>
                <li><Link to="/categories/show" className="block px-4 py-2 hover:bg-zinc-700">Category List</Link></li>
                <li><Link to="/companies/show" className="block px-4 py-2 hover:bg-zinc-700">Company List</Link></li>
                <li><Link to="/stockIn/show" className="block px-4 py-2 hover:bg-zinc-700">Stock In Log</Link></li>
                <li><Link to="/stockout/show" className="block px-4 py-2 hover:bg-zinc-700">Stock Out Record</Link></li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button onClick={() => setIsClientOpen(!isClientOpen)} className="hover:text-emerald-400 transition">
              Clients ▾
            </button>
            {isClientOpen && (
              <ul className="absolute bg-zinc-800 mt-2 rounded shadow-md z-10 min-w-[180px]">
                <li><Link to="/clients/show" className="block px-4 py-2 hover:bg-zinc-700">Client List</Link></li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button onClick={() => setIsReportOpen(!isReportOpen)} className="hover:text-emerald-400 transition">
              Show Report ▾
            </button>
            {isReportOpen && (
              <ul className="absolute bg-zinc-800 mt-2 rounded shadow-md z-10 min-w-[180px]">
                <li><Link to="/profit/show" className="block px-4 py-2 hover:bg-zinc-700">Profit Report</Link></li>
                <li><Link to="/stockin-log" className="block px-4 py-2 hover:bg-zinc-700">Stock In Log Report</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/stockin/create" className="hover:text-emerald-400 transition">Stock In</Link></li>
          <li><Link to="/stockout/create" className="hover:text-emerald-400 transition">Stock Out</Link></li>

          {loggedInUser?.username || user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition"
            >
              Login
            </Link>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden text-2xl focus:outline-none">
          {isMobileOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-zinc-900 text-zinc-100 px-4 py-2 space-y-2">
          <Link to="/" className="block py-2 hover:text-emerald-400">Home</Link>

          <div>
            <button onClick={() => setMobileCreateOpen(!mobileCreateOpen)} className="w-full text-left py-2">Create ▾</button>
            {mobileCreateOpen && (
              <div className="ml-4 space-y-1">
                <Link to="/items/create" className="block py-1 hover:text-emerald-400">Item Setup</Link>
                <Link to="/categories/create" className="block py-1 hover:text-emerald-400">Category Setup</Link>
                <Link to="/companies/create" className="block py-1 hover:text-emerald-400">Company Setup</Link>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setMobileShowOpen(!mobileShowOpen)} className="w-full text-left py-2">Show ▾</button>
            {mobileShowOpen && (
              <div className="ml-4 space-y-1">
                <Link to="/items/show" className="block py-1 hover:text-emerald-400">Item List</Link>
                <Link to="/categories/show" className="block py-1 hover:text-emerald-400">Category List</Link>
                <Link to="/companies/show" className="block py-1 hover:text-emerald-400">Company List</Link>
                <Link to="/stockIn/show" className="block py-1 hover:text-emerald-400">Stock In Log</Link>
                <Link to="/stockout/show" className="block py-1 hover:text-emerald-400">Stock Out Record</Link>
              </div>
            )}
          </div>
          <div>
            <button onClick={() => setMobileClientOpen(!mobileClientOpen)} className="w-full text-left py-2">Clients ▾</button>
            {mobileClientOpen && (
              <div className="ml-4 space-y-1">
                <Link to="/clients/show" className="block py-1 hover:text-emerald-400">Client List</Link>
                
              </div>
            )}
          </div>
          <div>
            <button onClick={() => setMobileReportOpen(!mobileReportOpen)} className="w-full text-left py-2">Show Report ▾</button>
            {mobileReportOpen && (
              <div className="ml-4 space-y-1">
                <Link to="/profit/show" className="block py-1 hover:text-emerald-400">Profit Report</Link>
                <Link to="/stockin-log" className="block py-1 hover:text-emerald-400">Stock In Log Report</Link>
              </div>
            )}
          </div>

          <Link to="/stockin/create" className="block py-2 hover:text-emerald-400">Stock In</Link>
          <Link to="/stockout/create" className="block py-2 hover:text-emerald-400">Stock Out</Link>

          {user ? (
            <button onClick={handleLogout} className="w-full mt-2 bg-red-600 hover:bg-red-700 py-2 rounded-md transition">
              Logout
            </button>
          ) : (
            <Link to="/signin" className="block w-full mt-2  bg-emerald-500 hover:bg-emerald-600 text-center py-2 rounded-md transition">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
