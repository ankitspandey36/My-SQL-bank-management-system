import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';
import LandingPage from './LandingPage';
import Home from './Home';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AdminLogin from './AdminLogin';
import CustomerDashboard from './CustomerDashboard';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Loan from './Loan';
import ReportProblem from './ReportProblem';
import DeleteAccount from './DeleteAccount';
import UpdateAccount from './UpdateAccount';
import AdminDashboard from './AdminDashboard';
import AddEmployee from './AddEmp';
import DeleteEmployee from './DelEmp';
import UpdateEmployee from './UpdateEmp';
import ShowEmployees from './ShowEmp';
import PaymentComponent from './PaymentComponent';
import TransactionForm from './TransactionForm';
import AddBranch from './AddBranch';
import DeleteBranch from './DeleteBranch';
import UpdateBranch from './UpdateBranch';
import ShowBranch from './ShowBranch';
import RequestATM from './RequestAtm';

function App() {
  return (
    <Router>
      <NavigationButtons />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Customer Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup/customer" element={<SignupForm />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/request-atm" element={<RequestATM />} />
        <Route path="/report-problem" element={<ReportProblem />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />
        <Route path="/updateAccount" element={<UpdateAccount />} />
        <Route path="/createTransaction" element={<TransactionForm />} />
        <Route path="/payments" element={<PaymentComponent />} />

        {/* Admin Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admindashboard/add" element={<AddEmployee />} />
        <Route path="/admindashboard/delete" element={<DeleteEmployee />} />
        <Route path="/admindashboard/update" element={<UpdateEmployee />} />
        <Route path="/admindashboard/show" element={<ShowEmployees />} />
        <Route path="/admindashboard/addbranch" element={<AddBranch />} />
        <Route path="/admindashboard/deletebranch" element={<DeleteBranch />} />
        <Route path="/admindashboard/updatebranch" element={<UpdateBranch />} />
        <Route path="/admindashboard/showbranch" element={<ShowBranch />} />

      </Routes>
    </Router>
  );
}

export default App;
