// DiscountsPage.jsx
import { useState, useEffect } from 'react';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { app } from '../firebase/config';

const DiscountsPage = () => {
  const [discounts, setDiscounts] = useState([]);
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [formData, setFormData] = useState({
    discountName: '',
    appliesToService: '',
    discountValue: '',
    validUntil: ''
  });
  const db = getFirestore(app);

  // Fetch discounts and services on component mount
  useEffect(() => {
    // Fetch discounts
    const discountsQuery = query(collection(db, 'discounts'), orderBy('createdAt', 'desc'));
    const unsubscribeDiscounts = onSnapshot(discountsQuery, (querySnapshot) => {
      const discountsData = [];
      querySnapshot.forEach((doc) => {
        discountsData.push({ id: doc.id, ...doc.data() });
      });
      setDiscounts(discountsData);
    });
    
    // Fetch services (for the dropdown)
    const servicesQuery = query(collection(db, 'services'), orderBy('name'));
    const unsubscribeServices = onSnapshot(servicesQuery, (querySnapshot) => {
      const servicesData = [];
      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() });
      });
      setServices(servicesData);
    });
    
    return () => {
      unsubscribeDiscounts();
      unsubscribeServices();
    };
  }, [db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const discountData = {
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        validUntil: new Date(formData.validUntil),
        createdAt: editingDiscount ? editingDiscount.createdAt : serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: new Date(formData.validUntil) > new Date() ? 'active' : 'expired'
      };
      
      if (editingDiscount) {
        // Update existing discount
        await updateDoc(doc(db, 'discounts', editingDiscount.id), discountData);
      } else {
        // Create new discount
        await addDoc(collection(db, 'discounts'), discountData);
      }
      
      // Reset form and close
      setFormData({
        discountName: '',
        appliesToService: '',
        discountValue: '',
        validUntil: ''
      });
      setEditingDiscount(null);
      setShowForm(false);
      
      alert(`Discount ${editingDiscount ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Error saving discount:', error);
      alert('Error saving discount. Please try again.');
    }
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setFormData({
      discountName: discount.discountName,
      appliesToService: discount.appliesToService,
      discountValue: discount.discountValue.toString(),
      validUntil: discount.validUntil.toDate().toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (discountId) => {
    if (!window.confirm('Are you sure you want to delete this discount?')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'discounts', discountId));
      alert('Discount deleted successfully!');
    } catch (error) {
      console.error('Error deleting discount:', error);
      alert('Error deleting discount. Please try again.');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingDiscount(null);
    setFormData({
      discountName: '',
      appliesToService: '',
      discountValue: '',
      validUntil: ''
    });
  };

  const isDiscountActive = (validUntil) => {
    return new Date(validUntil) > new Date();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Discounts Management</h1>
        <p className="text-gray-600 mt-2">
          Create and manage special offers that the AI will proactively suggest to clients.
        </p>
      </div>
      
      {/* Create Discount Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create Discount
        </button>
      </div>
      
      {/* Discount Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingDiscount ? 'Edit Discount' : 'Create New Discount'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="discountName" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Name
                </label>
                <input
                  type="text"
                  id="discountName"
                  name="discountName"
                  value={formData.discountName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="appliesToService" className="block text-sm font-medium text-gray-700 mb-1">
                  Applies to Service
                </label>
                <select
                  id="appliesToService"
                  name="appliesToService"
                  value={formData.appliesToService}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Value (% or $)
                </label>
                <input
                  type="text"
                  id="discountValue"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 15 or $20"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700 mb-1">
                  Valid Until
                </label>
                <input
                  type="date"
                  id="validUntil"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingDiscount ? 'Update Discount' : 'Create Discount'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Discounts List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active & Inactive Discounts</h2>
        
        {discounts.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No discounts</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first discount offer.</p>
          </div>
        ) : (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Discount Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Applies To
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Value
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Valid Until
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {discounts.map((discount) => {
                  const service = services.find(s => s.id === discount.appliesToService);
                  const isActive = isDiscountActive(discount.validUntil);
                  
                  return (
                    <tr key={discount.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {discount.discountName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {service ? service.name : 'Unknown Service'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {discount.discountValue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {discount.validUntil.toDate().toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {isActive ? 'Active' : 'Expired'}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEdit(discount)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(discount.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountsPage;