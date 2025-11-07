import React, { useState, useEffect } from "react";
import {
  LogoutIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  CreditCardIcon,
  LightningBoltIcon,
  UserIcon
} from "@heroicons/react/outline";
import ProductManagement from "./ProductManagement";
import CloudinaryTest from "./CloudinaryTest";

/**
 * IMPORTANT:
 * - Replace API_BASE with your real backend base URL.
 * - Adjust headers: if your API expects 'Authorization: Bearer <token>' use that,
 *   if it expects 'x-api-key' use that instead.
 */
const API_BASE = "https://your-api-endpoint.com"; // <-- change this

const AdminDashboard = ({ onLogout }) => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    productsPurchased: 0,
    totalRevenue: 0,
    paymentMethods: { creditCard: 0, upi: 0, wallet: 0 },
    users: []
  });
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [activeTab, setActiveTab] = useState("products"); // products | users | transactions | analytics

  // helper to build headers
  const buildHeaders = () => {
    const token = localStorage.getItem("token"); // if you use JWT
    return {
      "Content-Type": "application/json",
      // Example: backend expects Bearer token
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // or if your backend uses api key header:
      // "x-api-key": "AIzaSyB2djrMz6xOYv_p3QCDxafnke2BzqydmW4"
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrMsg("");
      try {
        // fetch users and sales in parallel
        const [usersRes, salesRes] = await Promise.all([
          fetch(`${API_BASE}/users`, { headers: buildHeaders() }),
          fetch(`${API_BASE}/sales`, { headers: buildHeaders() })
        ]);

        if (!usersRes.ok) {
          const text = await usersRes.text().catch(() => "");
          throw new Error(`Users fetch failed: ${usersRes.status} ${text}`);
        }
        if (!salesRes.ok) {
          const text = await salesRes.text().catch(() => "");
          throw new Error(`Sales fetch failed: ${salesRes.status} ${text}`);
        }

        const usersData = await usersRes.json();
        const salesData = await salesRes.json();

        // adjust these keys to match your API response
        const usersList = usersData.users ?? usersData.data ?? usersData; 
        const totalUsers = usersData.total ?? (Array.isArray(usersList) ? usersList.length : 0);

        setAnalyticsData({
          totalUsers,
          activeUsers: usersData.active ?? 0,
          productsPurchased: salesData.productsPurchased ?? 0,
          totalRevenue: salesData.totalRevenue ?? 0,
          paymentMethods: salesData.paymentMethods ?? {
            creditCard: 65,
            upi: 25,
            wallet: 10
          },
          users: usersList || []
        });
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setErrMsg(err.message || "Failed to load admin data.");
        // fallback mock data (optional)
        setAnalyticsData(prev => ({
          ...prev,
          totalUsers: prev.totalUsers || 1245,
          activeUsers: prev.activeUsers || 892,
          productsPurchased: prev.productsPurchased || 5678,
          totalRevenue: prev.totalRevenue || 1256000,
          paymentMethods: prev.paymentMethods || { creditCard: 65, upi: 25, wallet: 10 },
          users: prev.users.length ? prev.users : [
            { id: 1, name: "John Doe", email: "john@example.com", lastActive: "2023-05-15" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", lastActive: "2023-05-14" }
          ]
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // run once

  // Delete user handler
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: "DELETE",
        headers: buildHeaders()
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Delete failed: ${res.status} ${txt}`);
      }
      // remove locally
      setAnalyticsData(prev => ({
        ...prev,
        users: prev.users.filter(u => String(u.id) !== String(userId))
      }));
    } catch (err) {
      console.error("Delete user error:", err);
      alert("Failed to delete user: " + (err.message || "Unknown error"));
    }
  };

  // View user (you can open modal or navigate to details route)
  const handleViewUser = (user) => {
    // for now simple alert — replace with modal or route navigation
    alert(`User: ${user.name}\nEmail: ${user.email}\nLast active: ${user.lastActive}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-sm md:text-base">
      {/* Sidebar */}
      <aside className="w-56 md:w-64 bg-gray-800 text-white flex flex-col p-4">
        <div className="flex items-center space-x-2 mb-8 pt-4">
          <ShoppingBagIcon className="h-6 w-6 md:h-8 md:w-8 text-amber-400" />
          <h1 className="text-lg md:text-xl font-bold">Admin Dashboard</h1>
        </div>

        <nav className="flex-grow space-y-1">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              activeTab === "products" ? "bg-gray-700 text-amber-400" : "text-gray-300 hover:bg-gray-700"
            } transition-colors duration-200`}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <span className="font-medium">Products</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              activeTab === "users" ? "bg-gray-700 text-amber-400" : "text-gray-300 hover:bg-gray-700"
            } transition-colors duration-200`}
          >
            <UsersIcon className="h-5 w-5" />
            <span className="font-medium">Users</span>
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              activeTab === "transactions" ? "bg-gray-700 text-amber-400" : "text-gray-300 hover:bg-gray-700"
            } transition-colors duration-200`}
          >
            <CreditCardIcon className="h-5 w-5" />
            <span className="font-medium">Transactions</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              activeTab === "analytics" ? "bg-gray-700 text-amber-400" : "text-gray-300 hover:bg-gray-700"
            } transition-colors duration-200`}
          >
            <ChartBarIcon className="h-5 w-5" />
            <span className="font-medium">Analytics</span>
          </button>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left text-gray-300 hover:bg-red-700 transition-colors duration-200"
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Dashboard Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Admin User</div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-medium">A</div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {/* show error if exists */}
          {errMsg && <div className="mb-4 text-red-600">Error: {errMsg}</div>}

          {/* show analytics cards only on analytics/products tab */}
          {(activeTab === "products" || activeTab === "analytics") && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* same cards as before (Total Users, Active Users, etc.) */}
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold mt-1">{analyticsData.totalUsers.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <UsersIcon className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-xs text-green-500 mt-2">
                  <span className="font-medium">+12.5%</span> from last month
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <h3 className="text-2xl font-bold mt-1">{analyticsData.activeUsers.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <LightningBoltIcon className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <p className="text-xs text-green-500 mt-2">
                  <span className="font-medium">+8.3%</span> from last month
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-amber-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Products Purchased</p>
                    <h3 className="text-2xl font-bold mt-1">{analyticsData.productsPurchased.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <ShoppingBagIcon className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
                <p className="text-xs text-green-500 mt-2">
                  <span className="font-medium">+15.2%</span> from last month
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">₹{(analyticsData.totalRevenue/100).toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <CreditCardIcon className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <p className="text-xs text-green-500 mt-2">
                  <span className="font-medium">+22.7%</span> from last month
                </p>
              </div>
            </div>
          )}

          {/* Users Table - shown when users tab is active (or also show recent in products) */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Users</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {analyticsData.users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name || "—"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email || "—"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActive || "—"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button onClick={() => handleViewUser(user)} className="text-amber-600 hover:text-amber-900 mr-3">View</button>
                          <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {analyticsData.users.length === 0 && (
                      <tr><td colSpan={4} className="p-6 text-center text-gray-500">No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Media Upload and Product management can be shown always or per tab */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Media Upload</h3>
              <CloudinaryTest />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Management</h3>
              <ProductManagement />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
