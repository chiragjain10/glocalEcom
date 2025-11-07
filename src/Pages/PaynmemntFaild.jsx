import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';

const PaynmemntFaild = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reason, orderId } = location.state || {};

  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <FiXCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">We could not complete your payment. No amount has been charged.</p>

        {orderId && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-700 mb-4">
            <div className="flex justify-between"><span className="text-gray-500">Order ID</span><span className="font-medium">#{orderId}</span></div>
          </div>
        )}

        {reason && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            {String(reason)}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/payment', { replace: true })} className="px-6 py-3 rounded-md bg-amber-500 text-white font-medium hover:bg-amber-600">Try Again</button>
          <button onClick={() => navigate('/checkout')} className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">Back to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default PaynmemntFaild;
