import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FiDollarSign,
  FiTrendingUp,
  FiCreditCard,
  FiAlertCircle,
  FiEdit,
  FiTrash2,
  FiSend,
  FiCheckCircle
} from 'react-icons/fi';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const CustomerID = localStorage.getItem('CustomerID');

  useEffect(() => {
    if (!CustomerID) {
      alert('You need to log in first!');
      navigate('/login');
      return;
    }

    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`https://my-sql-bank-management-system-01.onrender.com/api/v1/customers/get/${CustomerID}`);
        if (response.data.success) {
          setCustomer(response.data.data);
        } else {
          alert('No customer details found! Please log in again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
        alert('Error fetching customer details');
        navigate('/login');
      }
    };

    fetchCustomerData();
  }, [CustomerID, navigate]);

  const navigateToService = (service) => {
    navigate(`/${service}`);
  };

  if (!customer) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold">Welcome, {customer.FirstName} {customer.LastName}</h1>
          <p className="text-blue-100 mt-2">Your personalized financial dashboard</p>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6">
        <CustomerSummary customer={customer} />

        <div className="mt-10">
          <h3 className="text-2xl text-gray-800 font-bold mb-6">What would you like to do?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <MenuCard title="Deposit" icon={<FiDollarSign />} onClick={() => navigateToService('deposit')} />
            <MenuCard title="Withdraw" icon={<FiTrendingUp />} onClick={() => navigateToService('withdraw')} />
            <MenuCard title="Apply for Loan" icon={<FiCheckCircle />} onClick={() => navigateToService('loan')} />
            <MenuCard title="Request Card" icon={<FiCreditCard />} onClick={() => navigateToService('request-atm')} />
            <MenuCard title="Report Problem" icon={<FiAlertCircle />} onClick={() => navigateToService('report-problem')} />
            <MenuCard title="Update Account" icon={<FiEdit />} onClick={() => navigateToService('updateAccount')} />
            <MenuCard title="Delete Account" icon={<FiTrash2 />} onClick={() => navigateToService('deleteAccount')} />
            <MenuCard title="Send Money" icon={<FiSend />} onClick={() => navigateToService('createTransaction')} />
            <MenuCard title="Pay Bills" icon={<FiCheckCircle />} onClick={() => navigateToService('payments')} />
          </div>
        </div>
      </main>
    </div>
  );
};

// ✅ Renamed this to avoid conflict with separate CustomerDetails.jsx
const CustomerSummary = ({ customer }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Your Details</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <p><strong>Customer ID:</strong> {customer.CustomerID}</p>
      <p><strong>Branch ID:</strong> {customer.BranchID}</p>
      <p><strong>Email:</strong> {customer.Email}</p>
      <p><strong>Phone:</strong> {customer.Phone}</p>
      <p className="sm:col-span-2"><strong>Address:</strong> {customer.Address}</p>
    </div>
  </div>
);

const MenuCard = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-6 rounded-lg bg-white hover:bg-blue-50 hover:shadow-md border border-gray-200 transition-all duration-200 cursor-pointer text-gray-700 hover:text-blue-800 w-full text-center"
  >
    <div className="text-3xl mb-3">{icon}</div>
    <span className="font-semibold">{title}</span>
  </button>
);

export default CustomerDashboard;
