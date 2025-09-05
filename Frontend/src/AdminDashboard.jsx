import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUsers, FiHome, FiCreditCard, FiPlusCircle, FiTrash2, FiEdit, FiEye } from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [branchCount, setBranchCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [branchesRes, employeesRes, transactionsRes] = await Promise.all([
          axios.get("https://my-sql-bank-management-system-01.onrender.com/api/v1/branches/getall"),
          axios.get("https://my-sql-bank-management-system-01.onrender.com/api/v1/employees/getall"),
          axios.get("https://my-sql-bank-management-system-01.onrender.com/api/v1/transactions/getall")
        ]);

        if (branchesRes.data.success) setBranchCount(branchesRes.data.totalBranches);
        if (employeesRes.data.success) setEmployeeCount(employeesRes.data.totalEmployees);
        if (transactionsRes.data.success) setTransactionCount(transactionsRes.data.totalTransactions);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { title: "Total Employees", value: loading ? "..." : employeeCount, icon: <FiUsers className="text-blue-500" /> },
    { title: "Total Branches", value: loading ? "..." : branchCount, icon: <FiHome className="text-green-500" /> },
    { title: "Total Transactions", value: loading ? "..." : transactionCount, icon: <FiCreditCard className="text-indigo-500" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-blue-100 mt-1">Welcome back, Administrator</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex items-center justify-between hover:shadow-xl transition">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl opacity-80">{stat.icon}</div>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 container mx-auto px-6 pb-8">
        <Section title="Employee Management">
          <MenuCard title="Add Employee" icon={<FiPlusCircle />} onClick={() => navigate('/admindashboard/add')} />
          <MenuCard title="Delete Employee" icon={<FiTrash2 />} onClick={() => navigate('/admindashboard/delete')} />
          <MenuCard title="Update Employee" icon={<FiEdit />} onClick={() => navigate('/admindashboard/update')} />
          <MenuCard title="View Employees" icon={<FiEye />} onClick={() => navigate('/admindashboard/show')} />
        </Section>

        <Section title="Branch Management">
          <MenuCard title="Add Branch" icon={<FiPlusCircle />} onClick={() => navigate('/admindashboard/addbranch')} />
          <MenuCard title="Delete Branch" icon={<FiTrash2 />} onClick={() => navigate('/admindashboard/deletebranch')} />
          <MenuCard title="Update Branch" icon={<FiEdit />} onClick={() => navigate('/admindashboard/updatebranch')} />
          <MenuCard title="View Branches" icon={<FiEye />} onClick={() => navigate('/admindashboard/showbranch')} />
        </Section>
      </main>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </div>
);

const MenuCard = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-100 hover:shadow-md border border-gray-200 transition-all duration-200 text-gray-700 hover:text-blue-800 w-full"
  >
    <div className="text-xl mr-3">{icon}</div>
    <span className="font-semibold">{title}</span>
  </button>
);

export default AdminDashboard;
