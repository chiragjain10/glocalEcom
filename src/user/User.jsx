import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBoxOpen, FaHeart, FaMapMarkerAlt, FaSignOutAlt, FaEdit, FaPlus, FaArrowRight } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const UserDashboard = () => {
    const navigate = useNavigate();
    const { user, loading, logout } = useAuth();
    // State for active tab
    const [activeTab, setActiveTab] = useState("profile");

    // Address management state
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            name: "Arpit Kumar",
            street: "123, Main Street",
            city: "Pirawa, Jhalawar",
            state: "Rajasthan, India - 326022",
            phone: "+91-9876543210",
            isDefault: true
        },
        {
            id: 2,
            type: "Work",
            name: "Arpit Kumar",
            street: "456, Tech Park",
            city: "Jaipur",
            state: "Rajasthan, India - 302017",
            phone: "+91-9876543210",
            isDefault: false
        }
    ]);

    // Payment methods state
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: "VISA",
            last4: "4242",
            expiry: "04/2025",
            isDefault: true
        },
        {
            id: 2,
            type: "Mastercard",
            last4: "5555",
            expiry: "08/2024",
            isDefault: false
        }
    ]);

    // Profile state - will be populated from Firebase user data
    const [profile, setProfile] = useState({
        name: user?.displayName || "User",
        email: user?.email || "",
        phone: "+91-9876543210",
        dob: "January 15, 1990"
    });

    // New address form state
    const [newAddress, setNewAddress] = useState({
        type: "",
        name: "",
        street: "",
        city: "",
        state: "",
        phone: "",
        isDefault: false
    });

    // UI state
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    // Tabs configuration
    const tabs = [
        { id: "profile", label: "My Profile", icon: <FaUser className="text-lg" /> },
        { id: "orders", label: "My Orders", icon: <FaBoxOpen className="text-lg" /> },
        { id: "wishlist", label: "Wishlist", icon: <FaHeart className="text-lg" /> },
        { id: "address", label: "Saved Addresses", icon: <FaMapMarkerAlt className="text-lg" /> },
        { id: "payment", label: "Payment Methods", icon: <MdPayment className="text-lg" /> },
        { id: "logout", label: "Logout", icon: <FaSignOutAlt className="text-lg" /> },
    ];

    // Update profile when user changes
    React.useEffect(() => {
        if (user) {
            setProfile(prev => ({
                ...prev,
                name: user.displayName || "User",
                email: user.email || ""
            }));
        }
    }, [user]);

    // Address management functions
    const handleAddAddress = () => {
        setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
        setNewAddress({
            type: "",
            name: "",
            street: "",
            city: "",
            state: "",
            phone: "",
            isDefault: false
        });
        setShowAddressForm(false);
    };

    const handleRemoveAddress = (id) => {
        setAddresses(addresses.filter(address => address.id !== id));
    };

    const handleSetDefaultAddress = (id) => {
        setAddresses(addresses.map(address => ({
            ...address,
            isDefault: address.id === id
        })));
    };

    // Payment methods functions
    const handleRemovePayment = (id) => {
        setPaymentMethods(paymentMethods.filter(payment => payment.id !== id));
    };

    const handleSetDefaultPayment = (id) => {
        setPaymentMethods(paymentMethods.map(payment => ({
            ...payment,
            isDefault: payment.id === id
        })));
    };

    // Profile functions
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setShowProfileEdit(false);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setShowPasswordChange(false);
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/LogInPage");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Render tab content
    const renderTabContent = () => {
        if (!user && activeTab !== "logout") {
            return (
                <div className="flex flex-col items-center justify-center py-20 space-y-6 mt-15">
                    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                        <FaSignOutAlt className="text-3xl text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Please Login</h2>
                    <p className="text-gray-600 mb-6">You need to be logged in to view this page.</p>
                    <button
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all shadow-md"
                        onClick={() => navigate("/login")}
                    >
                        Login <FaArrowRight className="ml-1" />
                    </button>
                </div>
            );
        }

        switch (activeTab) {
            case "profile":
                return (
                    <div className="space-y-6 mt-15">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                                <FaUser className="text-3xl text-amber-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                            <p className="text-gray-600">{profile.email}</p>
                            <button
                                className="mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all shadow-md"
                                onClick={() => setShowProfileEdit(true)}
                            >
                                <FaEdit /> Edit Profile <FaArrowRight className="ml-1" />
                            </button>
                        </div>

                        {showProfileEdit ? (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Edit Profile</h3>
                                <form onSubmit={handleProfileUpdate}>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                disabled
                                                className="w-full p-2 border rounded bg-gray-100"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Date of Birth</label>
                                            <input
                                                type="text"
                                                value={profile.dob}
                                                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                                            onClick={() => setShowProfileEdit(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Personal Information</h3>
                                    <div className="space-y-3">
                                        <p><strong className="text-gray-700">Full Name:</strong> {profile.name}</p>
                                        <p><strong className="text-gray-700">Email:</strong> {profile.email}</p>
                                        <p><strong className="text-gray-700">Phone:</strong> {profile.phone}</p>
                                        <p><strong className="text-gray-700">Date of Birth:</strong> {profile.dob}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Account Security</h3>
                                    <div className="space-y-3">
                                        <p><strong className="text-gray-700">Password:</strong> ********</p>
                                        <p><strong className="text-gray-700">2FA:</strong> Disabled</p>
                                        <p><strong className="text-gray-700">Last Login:</strong> Today, 10:30 AM</p>
                                    </div>
                                    <button
                                        className="mt-4 flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 transition"
                                        onClick={() => setShowPasswordChange(true)}
                                    >
                                        Change Password <FaArrowRight className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {showPasswordChange && (
                            <div className="bg-gray-50 p-6 rounded-lg mt-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Change Password</h3>
                                <form onSubmit={handlePasswordChange}>
                                    <div className="space-y-4 mb-4">
                                        <div>
                                            <label className="block text-gray-700 mb-1">Current Password</label>
                                            <input
                                                type="password"
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">New Password</label>
                                            <input
                                                type="password"
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Confirm New Password</label>
                                            <input
                                                type="password"
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                                        >
                                            Change Password
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                                            onClick={() => setShowPasswordChange(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                );

            case "orders":
                return (
                    <div className="space-y-6 mt-15">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex flex-col items-center justify-center py-12">
                                <FaBoxOpen className="text-5xl text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
                                <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                                <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all shadow-md">
                                    Start Shopping <FaArrowRight className="ml-1" />
                                </button>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Order History</h3>
                            <p className="text-gray-500">When you place orders, they'll appear here.</p>
                        </div>
                    </div>
                );

            case "wishlist":
                return (
                    <div className="space-y-6 mt-15">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex flex-col items-center justify-center py-12">
                                <FaHeart className="text-5xl text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
                                <p className="text-gray-500 mb-4">Save items you love to buy them later.</p>
                                <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all shadow-md">
                                    Browse Products <FaArrowRight className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case "address":
                return (
                    <div className="space-y-6 mt-15">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all shadow-md"
                                onClick={() => setShowAddressForm(true)}
                            >
                                <FaPlus /> Add New Address <FaArrowRight className="ml-1" />
                            </button>
                        </div>

                        {showAddressForm && (
                            <div className="border rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-gray-700 mb-1">Address Type</label>
                                        <input
                                            type="text"
                                            placeholder="Home/Work/Other"
                                            value={newAddress.type}
                                            onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={newAddress.name}
                                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            value={newAddress.street}
                                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            value={newAddress.city}
                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-1">State/Zip</label>
                                        <input
                                            type="text"
                                            value={newAddress.state}
                                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={newAddress.phone}
                                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="defaultAddress"
                                        checked={newAddress.isDefault}
                                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <label htmlFor="defaultAddress">Set as default address</label>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                                        onClick={handleAddAddress}
                                    >
                                        Save Address
                                    </button>
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                                        onClick={() => setShowAddressForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {addresses.map((address) => (
                                <div key={address.id} className="border rounded-lg p-6 hover:border-amber-500 transition">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-lg text-gray-800">{address.type} Address</h3>
                                        {address.isDefault && (
                                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Default</span>
                                        )}
                                    </div>
                                    <p className="text-gray-700 mb-2">{address.name}</p>
                                    <p className="text-gray-600 mb-1">{address.street}</p>
                                    <p className="text-gray-600 mb-1">{address.city}</p>
                                    <p className="text-gray-600 mb-1">{address.state}</p>
                                    <p className="text-gray-600 mb-4">Phone: {address.phone}</p>
                                    <div className="flex gap-3">
                                        <button className="flex items-center text-amber-600 hover:text-amber-700">
                                            Edit <FaArrowRight className="ml-1" />
                                        </button>
                                        <button
                                            className="flex items-center text-red-600 hover:text-red-700"
                                            onClick={() => handleRemoveAddress(address.id)}
                                        >
                                            Remove <FaArrowRight className="ml-1" />
                                        </button>
                                        {!address.isDefault && (
                                            <button
                                                className="flex items-center text-amber-600 hover:text-amber-700"
                                                onClick={() => handleSetDefaultAddress(address.id)}
                                            >
                                                Set as Default <FaArrowRight className="ml-1" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "payment":
                return (
                    <div className="space-y-6 mt-15">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all shadow-md">
                                <FaPlus /> Add Payment Method <FaArrowRight className="ml-1" />
                            </button>
                        </div>

                        {paymentMethods.map((payment) => (
                            <div key={payment.id} className="border rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-6 rounded-sm flex items-center justify-center text-white font-bold ${payment.type === "VISA" ? "bg-blue-500" : "bg-gray-200 text-gray-600"
                                            }`}>
                                            {payment.type === "VISA" ? "VISA" : "MC"}
                                        </div>
                                        <span className="font-medium">
                                            {payment.type} ending in {payment.last4}
                                        </span>
                                    </div>
                                    {payment.isDefault && (
                                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Default</span>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-4">Expires {payment.expiry}</p>
                                <div className="flex gap-3">
                                    <button className="flex items-center text-amber-600 hover:text-amber-700">
                                        Edit <FaArrowRight className="ml-1" />
                                    </button>
                                    <button
                                        className="flex items-center text-red-600 hover:text-red-700"
                                        onClick={() => handleRemovePayment(payment.id)}
                                    >
                                        Remove <FaArrowRight className="ml-1" />
                                    </button>
                                    {!payment.isDefault && (
                                        <button
                                            className="flex items-center text-amber-600 hover:text-amber-700"
                                            onClick={() => handleSetDefaultPayment(payment.id)}
                                        >
                                            Set as Default <FaArrowRight className="ml-1" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case "logout":
                return (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6 mt-15">
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                            <FaSignOutAlt className="text-3xl text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Logged Out Successfully</h2>
                        <p className="text-gray-600 mb-6">You have been securely logged out of your account.</p>
                        <button
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all shadow-md"
                            onClick={() => navigate("/login")}
                        >
                            Login Again <FaArrowRight className="ml-1" />
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-12 pb-8 flex items-center justify-center">
                <LoadingSpinner size="large" text="Loading..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-12 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                                    <FaUser className="text-xl text-amber-600" />
                                </div>
                                <div className="leading-tight m-0">
                                    {user ? (
                                        <>
                                            <h2 className="font-bold text-gray-800 leading-snug ">{profile.name}</h2>
                                            <p className="text-sm text-gray-500 leading-snug pb-4">Premium Member</p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="font-bold text-gray-800  leading-snug">Guest User</h2>
                                            <p className="text-sm text-gray-500  leading-snug">Please login</p>
                                        </>
                                    )}
                                </div>
                            </div>


                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Account Menu</h3>
                            <ul className="space-y-2">
                                {tabs.map((tab) => (
                                    <li key={tab.id}>
                                        <button
                                            onClick={() => tab.id === "logout" ? handleLogout() : setActiveTab(tab.id)}
                                            className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg transition 
                                                ${activeTab === tab.id
                                                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white"
                                                    : "hover:bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {tab.icon}
                                                <span>{tab.label}</span>
                                            </div>
                                            <FaArrowRight className="text-sm" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                            {renderTabContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;