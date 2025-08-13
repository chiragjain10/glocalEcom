// AdminDashboard.jsx
import React, { useState } from "react";
import {
  BellIcon,
  ChartBarIcon,
  CreditCardIcon,
  UsersIcon,
  ClipboardListIcon,
  DocumentReportIcon,
  PhotographIcon,
  LogoutIcon,
  CashIcon,
  ShoppingBagIcon,
  ChartPieIcon,
} from "@heroicons/react/outline";

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    location: "Jaipur, Rajasthan",
    purchases: [
      { id: "P1001", product: "Clay Pot", amount: 899, date: "2025-07-10", image: "/products/pot.jpg" },
      { id: "P1008", product: "Handmade Vase", amount: 1299, date: "2025-08-01", image: "/products/vase.jpg" },
    ],
  },
  {
    id: 2,
    name: "Sneha Verma",
    email: "sneha@example.com",
    location: "Mumbai, Maharashtra",
    purchases: [
      { id: "P1005", product: "Rugs", amount: 2499, date: "2025-06-21", image: "/products/rug.jpg" },
    ],
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@example.com",
    location: "Ahmedabad, Gujarat",
    purchases: [],
  },
];

const mockPayments = [
  { id: "TXN1001", customer: "Rahul Sharma", amount: 2198, date: "2025-08-01", status: "Completed" },
  { id: "TXN1002", customer: "Sneha Verma", amount: 2499, date: "2025-06-21", status: "Completed" },
  { id: "TXN1003", customer: "Priya Singh", amount: 1599, date: "2025-08-05", status: "Pending" },
];

const mockProducts = [
  { id: "PRD101", name: "Clay Pot", price: 899, stock: 42, category: "Pottery" },
  { id: "PRD102", name: "Handmade Vase", price: 1299, stock: 18, category: "Pottery" },
  { id: "PRD103", name: "Traditional Rug", price: 2499, stock: 7, category: "Textiles" },
];

const UsersList = ({ users, onSelectUser, selectedUserId }) => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">Customers</h3>
      <div className="flex space-x-2 text-sm text-gray-500">
        <span>Sort by Date</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user.id)}
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
            selectedUserId === user.id ? "bg-amber-100 ring-2 ring-amber-300" : "hover:bg-gray-50"
          }`}
        >
          <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 mr-4">
            {user.name.charAt(0)}
          </div>
          <div className="flex-grow">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="text-sm text-gray-500">{user.location}</div>
        </div>
      ))}
    </div>
  </div>
);

const PaymentsList = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">Recent Transactions</h3>
      <button className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
        Export CSV
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mockPayments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{payment.customer}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹{payment.amount}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-800 mb-2">Payment Summary</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold">₹6,296</p>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-bold">₹4,697</p>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-xl font-bold">₹1,599</p>
        </div>
      </div>
    </div>
  </div>
);

const DashboardView = () => {
  const stats = [
    { name: 'Total Sales', value: '₹18,495', change: '+12%', changeType: 'positive' },
    { name: 'Customers', value: '1,243', change: '+8%', changeType: 'positive' },
    { name: 'Orders', value: '247', change: '-2%', changeType: 'negative' },
    { name: 'Conversion', value: '3.2%', change: '+0.5%', changeType: 'positive' },
  ];

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Dashboard Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">{stat.name}</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <span className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
          <h4 className="font-medium mb-4">Sales Overview</h4>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Sales Chart Placeholder
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-4">Top Products</h4>
          <div className="space-y-4">
            {mockProducts.map((product) => (
              <div key={product.id} className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded mr-3"></div>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">₹{product.price} • {product.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-medium mb-4">Recent Orders</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.slice(0, 3).map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="px-4 py-3 text-sm">{payment.id}</td>
                  <td className="px-4 py-3 text-sm">{payment.customer}</td>
                  <td className="px-4 py-3 text-sm">₹{payment.amount}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ReportsView = () => {
  const [selectedReport, setSelectedReport] = useState('sales');

  return (
    <div className="p-6 mb-15">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Reports</h3>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
          Generate Report
        </button>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSelectedReport('sales')}
          className={`px-4 py-2 rounded-md ${selectedReport === 'sales' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}
        >
          Sales
        </button>
        <button
          onClick={() => setSelectedReport('customers')}
          className={`px-4 py-2 rounded-md ${selectedReport === 'customers' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}
        >
          Customers
        </button>
        <button
          onClick={() => setSelectedReport('products')}
          className={`px-4 py-2 rounded-md ${selectedReport === 'products' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}
        >
          Products
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {selectedReport === 'sales' && (
          <div>
            <h4 className="font-medium mb-4">Sales Report</h4>
            <div className="h-80 bg-gray-50 rounded flex items-center justify-center text-gray-400 mb-4">
              Sales Chart Placeholder
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Month</th>
                    <th className="px-4 py-2 text-left">Orders</th>
                    <th className="px-4 py-2 text-left">Revenue</th>
                    <th className="px-4 py-2 text-left">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { month: 'August 2025', orders: 42, revenue: '₹56,420', growth: '+12%' },
                    { month: 'July 2025', orders: 38, revenue: '₹50,310', growth: '+8%' },
                    { month: 'June 2025', orders: 35, revenue: '₹46,590', growth: '+15%' },
                  ].map((row) => (
                    <tr key={row.month} className="border-b">
                      <td className="px-4 py-3">{row.month}</td>
                      <td className="px-4 py-3">{row.orders}</td>
                      <td className="px-4 py-3">{row.revenue}</td>
                      <td className="px-4 py-3 text-green-600">{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'customers' && (
          <div>
            <h4 className="font-medium mb-4">Customer Analytics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
                Customer Growth Chart
              </div>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
                Location Distribution
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Customers</th>
                    <th className="px-4 py-2 text-left">Avg. Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { location: 'Maharashtra', customers: 342, avgOrder: '₹1,245' },
                    { location: 'Rajasthan', customers: 278, avgOrder: '₹1,189' },
                    { location: 'Gujarat', customers: 195, avgOrder: '₹1,320' },
                  ].map((row) => (
                    <tr key={row.location} className="border-b">
                      <td className="px-4 py-3">{row.location}</td>
                      <td className="px-4 py-3">{row.customers}</td>
                      <td className="px-4 py-3">{row.avgOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'products' && (
          <div>
            <h4 className="font-medium mb-4">Product Performance</h4>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400 mb-6">
              Product Sales Chart
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Units Sold</th>
                    <th className="px-4 py-2 text-left">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">{Math.floor(Math.random() * 50) + 10}</td>
                      <td className="px-4 py-3">₹{(Math.floor(Math.random() * 50000) + 10000).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const newImages = files.map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / 1024).toFixed(2) + ' KB'
      }));
      
      setImages(prev => [...prev, ...newImages]);
      setIsUploading(false);
    }, 1500);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Product Image Upload</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Images</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="mb-6 p-4 bg-amber-50 rounded-md flex items-center">
          <div className="animate-spin h-5 w-5 text-amber-600 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <span>Uploading images...</span>
        </div>
      )}

      {images.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Uploaded Images ({images.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border rounded-md overflow-hidden relative group">
                <img 
                  src={image.url} 
                  alt={image.name} 
                  className="w-full h-32 object-cover"
                  onLoad={() => URL.revokeObjectURL(image.url)} // Clean up memory
                />
                <div className="p-2">
                  <p className="text-sm truncate">{image.name}</p>
                  <p className="text-xs text-gray-500">{image.size}</p>
                </div>
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users] = useState(mockUsers);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardView />;
      case "Payments":
        return <PaymentsList />;
      case "Customers":
        return <UsersList users={users} onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />;
      case "Reports":
        return <ReportsView />;
      case "Products":
        return <ImageUploader />;
      default:
        return (
          <div className="p-6 text-center text-gray-500">
            <p>Content for "{activeTab}" coming soon...</p>
          </div>
        );
    }
  };

  const renderDetailsPanel = () => {
    const selectedUser = users.find((u) => u.id === selectedUserId);
    if (!selectedUser) return null;

    return (
      <div className="p-6 bg-gray-50 font-[Inter]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">User Details</h3>
          <button
            onClick={() => setSelectedUserId(null)}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
              {selectedUser.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold">{selectedUser.name}</h4>
              <p className="text-sm text-gray-500">{selectedUser.email}</p>
              <p className="text-sm text-gray-500">{selectedUser.location}</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Purchase History</h4>
          {selectedUser.purchases.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedUser.purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {purchase.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {purchase.image && (
                            <img src={purchase.image} alt={purchase.product} className="w-8 h-8 object-cover rounded mr-2" />
                          )}
                          {purchase.product}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        ₹{purchase.amount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {purchase.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No purchase history available.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <div className="flex items-center space-x-2 mb-8">
          <ClipboardListIcon className="h-8 w-8 text-amber-500" />
          <h1 className="text-xl font-bold">ProfitPulse</h1>
        </div>
        <nav className="flex-grow space-y-2">
          {['Dashboard', 'Payments', 'Customers', 'Reports', 'Products'].map((item) => (
            <button
              key={item}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors duration-200 ${
                activeTab === item ? "bg-amber-500 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => {
                setActiveTab(item);
                setSelectedUserId(null);
              }}
            >
              {item === 'Dashboard' && <ChartBarIcon className="h-5 w-5" />}
              {item === 'Payments' && <CashIcon className="h-5 w-5" />}
              {item === 'Customers' && <UsersIcon className="h-5 w-5" />}
              {item === 'Reports' && <ChartPieIcon className="h-5 w-5" />}
              {item === 'Products' && <ShoppingBagIcon className="h-5 w-5" />}
              <span className="font-medium">{item}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left text-gray-300 hover:bg-red-700 transition-colors duration-200"
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 mt-15">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <button className="text-gray-500 hover:text-gray-800 relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="flex h-full">
            <div className={`bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
              activeTab === 'Customers' && selectedUserId ? 'w-2/3 mr-4' : 'w-full'
            }`}>
              {renderContent()}
            </div>
            {activeTab === 'Customers' && selectedUserId && (
              <div className="w-1/3 bg-white rounded-lg shadow-sm overflow-auto">
                {renderDetailsPanel()}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;