import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiCreditCard, FiHash, FiGrid } from 'react-icons/fi';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const CustomerID = localStorage.getItem('CustomerID');

      if (!CustomerID) {
        setError('You need to log in first!');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5010/api/v1/customers/get/${CustomerID}`);
        if (response.data.success) {
          setCustomer(response.data.data);
          localStorage.setItem('customerDetails', JSON.stringify(response.data.data));
        } else {
          setError('Failed to fetch customer details');
        }
      } catch (err) {
        setError('Error fetching customer details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 p-4">{error}</div>;
  }

  if (!customer) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">No customer data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-6">
          <FiUser className="text-3xl text-blue-600 mr-4" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Account Details</h1>
            <p className="text-gray-500">Your personal and account information.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <DetailItem icon={<FiHash />} label="Customer ID" value={customer.CustomerID} />
          <DetailItem icon={<FiCreditCard />} label="Account ID" value={customer.AccountID} />
          <DetailItem icon={<FiGrid />} label="Account Type" value={customer.AccountType || 'N/A'} />
          <DetailItem icon={<FiMail />} label="Email" value={customer.Email} />
          <DetailItem icon={<FiPhone />} label="Phone" value={customer.Phone} />

          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4 border-t pt-4">Balance</h3>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-lg text-blue-800 font-medium">Available Balance</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                ${customer.Balance?.toLocaleString() || '0.00'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
    <div className="text-xl text-blue-500 mr-4">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default CustomerDetails;
