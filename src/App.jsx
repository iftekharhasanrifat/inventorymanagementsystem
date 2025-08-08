import React,{createContext,useState} from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import CreateItems from './pages/CreateItems.jsx'
import EditItems from './pages/EditItems.jsx'
import DeleteItems from './pages/DeleteItems.jsx'
import ShowItem from './pages/ShowItem.jsx'
import CreateCategories from './pages/CreateCategories.jsx'
import ShowAllCategories from './pages/ShowAllCategories.jsx'
import EditCategories from './pages/EditCategories.jsx'
import DeleteCategories from './pages/DeleteCategories.jsx'
import CreateCompanies from './pages/CreateCompanies.jsx'
import ShowAllCompanies from './pages/ShowAllCompanies.jsx'
import EditCompanies from './pages/EditCompanies.jsx'
import DeleteCompanies from './pages/DeleteCompanies.jsx'
import ShowAllItems from './pages/ShowAllItems.jsx'
import ShowAllStockIn from './pages/ShowAllStockIn.jsx'
import CreateStockIn from './pages/CreateStockIn.jsx'
import ShowStockIn from './pages/ShowStockIn.jsx'
import EditStockIn from './pages/EditStockIn.jsx'
import DeleteStockIn from './pages/DeleteStockIn.jsx'
import CreateStockOut from './pages/CreateStockOut.jsx'
import ShowAllStockOut from './pages/ShowAllStockOut.jsx'
import ShowStockOut from './pages/ShowStockOut.jsx'
import EditStockOut from './pages/EditStockOut.jsx'
import DeleteStockOut from './pages/DeleteStockOut.jsx'
import ShowProfit from './pages/ShowProfit.jsx'
import ShowStockInLogReport from './pages/ShowStockInLogReport.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ShowAllClients from './pages/ShowAllClients.jsx'
import EditClients from './pages/EditClients.jsx'
import DeleteClients from './pages/DeleteClients.jsx'
import ClientPayment from './pages/ClientPayment.jsx'
import ClientAdvance from './pages/ClientAdvance.jsx'
import ClientDetails from './pages/ClientDetails.jsx'
import EditClientLedger from './pages/EditClientLedger.jsx'
import DeleteClientLedger from './pages/DeleteClientLedger.jsx'
import CreateClient from './pages/CreateClient.jsx'
import Footer from './components/Footer.jsx'

export const UserContext = createContext();
export const ErrorContext = createContext();
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
    <div  className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path="/signin" element={<LoginPage/>} /> 
        <Route path='items/show' element={<PrivateRoute><ShowAllItems /></PrivateRoute>} />
        <Route path='items/create' element={<PrivateRoute><CreateItems/></PrivateRoute>} />
        <Route path='items/edit/:id' element={<PrivateRoute><EditItems /></PrivateRoute>} />
        <Route path='items/details/:id' element={<PrivateRoute><ShowItem /></PrivateRoute>} />
        <Route path='items/delete/:id' element={<PrivateRoute><DeleteItems /></PrivateRoute>} />
        <Route path='categories/create' element={<PrivateRoute><CreateCategories /></PrivateRoute>} />
        <Route path='categories/show' element={<PrivateRoute><ShowAllCategories /></PrivateRoute>} />
        <Route path='categories/edit/:id' element={<PrivateRoute><EditCategories /></PrivateRoute>} />
        <Route path='categories/delete/:id' element={<PrivateRoute><DeleteCategories /></PrivateRoute>} />
        <Route path='companies/create' element={<PrivateRoute><CreateCompanies /></PrivateRoute>} />
        <Route path='companies/show' element={<PrivateRoute><ShowAllCompanies /></PrivateRoute>} />
        <Route path='companies/edit/:id' element={<PrivateRoute><EditCompanies /></PrivateRoute>} />
        <Route path='companies/delete/:id' element={<PrivateRoute><DeleteCompanies /></PrivateRoute>} />
        <Route path='stockIn/show' element={<PrivateRoute><ShowAllStockIn /></PrivateRoute>} />
        <Route path='stockin/create' element={<PrivateRoute><CreateStockIn /></PrivateRoute>} />
        <Route path='stockin/details/:id' element={<PrivateRoute><ShowStockIn /></PrivateRoute>} />
        <Route path='stockin/edit/:id' element={<PrivateRoute><EditStockIn /></PrivateRoute>} />
        <Route path='stockin/delete/:id' element={<PrivateRoute><DeleteStockIn /></PrivateRoute>} />
        <Route path='stockout/create' element={<PrivateRoute><CreateStockOut /></PrivateRoute>} />
        <Route path='stockout/show' element={<PrivateRoute><ShowAllStockOut /></PrivateRoute>} />
        <Route path='stockout/details/:id' element={<PrivateRoute><ShowStockOut /></PrivateRoute>} />
        <Route path='stockout/edit/:id' element={<PrivateRoute><EditStockOut /></PrivateRoute>} />
        <Route path='stockout/delete/:id' element={<PrivateRoute><DeleteStockOut /></PrivateRoute>} />
        <Route path='profit/show' element={<PrivateRoute><ShowProfit /></PrivateRoute>} />
        <Route path='stockin-log' element={<PrivateRoute><ShowStockInLogReport /></PrivateRoute>} />
        <Route path='clients/show' element={<PrivateRoute><ShowAllClients /></PrivateRoute>} />
        <Route path='client/edit/:id' element={<PrivateRoute><EditClients /></PrivateRoute>} />
        <Route path='client/delete/:id' element={<PrivateRoute><DeleteClients /></PrivateRoute>} />
        <Route path='client/payment/:id' element={<PrivateRoute><ClientPayment /></PrivateRoute>} />
        <Route path='client/advance/:id' element={<PrivateRoute><ClientAdvance /></PrivateRoute>} />
        <Route path='client/details/:id' element={<PrivateRoute><ClientDetails /></PrivateRoute>} />
        <Route path='client/edit-ledger/:id' element={<PrivateRoute><EditClientLedger /></PrivateRoute>} />
        <Route path='client/delete-ledger/:id' element={<PrivateRoute><DeleteClientLedger /></PrivateRoute>} />
        <Route path='client/create' element={<PrivateRoute><CreateClient /></PrivateRoute>} />
        {/* Add more routes as needed */}
        </Routes>
      </div>
      <Footer/>
    </div>
    </ErrorContext.Provider>
    </UserContext.Provider>
    

  )
}

export default App