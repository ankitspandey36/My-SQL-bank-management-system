import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { FiCreditCard, FiClock } from 'react-icons/fi'

const PaymentComponent = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const customerID = localStorage.getItem('CustomerID')

  const fetchPayments = async () => {
    if (!customerID) return
    setLoading(true)
    try {
      const response = await axios.get(`https://my-sql-bank-management-system-01.onrender.com/api/v1/payments/get/${customerID}`)
      setPayments(response.data.payments || [])
    } catch (error) {
      console.error('Error fetching payments:', error)
      setError(error.response?.data?.message || 'Could not fetch payment history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [customerID])

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      await axios.post('https://my-sql-bank-management-system-01.onrender.com/api/v1/payments/create', data)
      alert('Payment Successful!')
      reset()
      fetchPayments()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Payment processing failed.'
      setError(errorMessage)
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Create Payment Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <FiCreditCard className="mx-auto text-4xl text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800 mt-4">Make a Payment</h1>
              <p className="text-gray-500">Complete your loan payment below.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Loan ID</label>
                <input
                  type="number"
                  placeholder="Enter Loan ID"
                  {...register('LoanID', { required: 'Loan ID is required' })}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                />
                {errors.LoanID && <p className="text-red-500 text-xs mt-1">{errors.LoanID.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  {...register('Amount', {
                    required: 'Amount is required',
                    min: { value: 1, message: 'Amount must be positive' }
                  })}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                />
                {errors.Amount && <p className="text-red-500 text-xs mt-1">{errors.Amount.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Method</label>
                <select {...register('PaymentMethod')} className="mt-1 p-3 w-full border border-gray-300 rounded-lg bg-white">
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {loading ? 'Processing...' : 'Submit Payment'}
              </button>
            </form>
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          </div>
        </div>

        {/* Right Side: Payment History */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <FiClock className="text-3xl text-gray-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
                <p className="text-gray-500">Your recent loan payments.</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-600">Payment ID</th>
                    <th className="px-6 py-3 font-medium text-gray-600">Loan ID</th>
                    <th className="px-6 py-3 font-medium text-gray-600">Amount</th>
                    <th className="px-6 py-3 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="4" className="text-center p-6">Loading history...</td></tr>
                  ) : payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment.PaymentID}>
                        <td className="px-6 py-4 font-mono text-gray-700">{payment.PaymentID}</td>
                        <td className="px-6 py-4 text-gray-800">{payment.LoanID}</td>
                        <td className="px-6 py-4 text-gray-800">${payment.Amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-gray-600">{new Date(payment.PaymentDate).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="text-center p-6 text-gray-500">No payments found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentComponent
