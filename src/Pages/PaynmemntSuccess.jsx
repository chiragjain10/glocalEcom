import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const PaynmemntSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, paymentId } = location.state || {};

  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <FiCheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Thank you! Your payment has been received and your order is being processed.</p>

        {orderId && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-700 mb-4">
            <div className="flex justify-between"><span className="text-gray-500">Order ID</span><span className="font-medium">#{orderId}</span></div>
            {paymentId && (
              <div className="flex justify-between mt-1"><span className="text-gray-500">Payment ID</span><span className="font-medium">{paymentId}</span></div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/')} className="px-6 py-3 rounded-md bg-amber-500 text-white font-medium hover:bg-amber-600">Continue Shopping</button>
          <button onClick={() => navigate('/account')} className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">View Orders</button>
        </div>
      </div>
    </div>
  );
};

export default PaynmemntSuccess;
