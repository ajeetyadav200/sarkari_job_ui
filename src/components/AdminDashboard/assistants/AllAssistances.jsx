import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, Download, Users } from 'lucide-react';
import AssistanceList from './AssistanceList';
import { setAssistances, setLoading, setError } from '../../../slice/assistanceSlice';
import ApiService from '../../../services/api';

const AllAssistances = () => {
  const dispatch = useDispatch();
  const { list: assistances, loading } = useSelector(store => store.assistants);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const departments = [...new Set(assistances.map(a => a.department))];

  useEffect(() => {
    loadAssistances();
  }, []);

  const loadAssistances = async () => {
    try {
      dispatch(setLoading(true));
      const response = await ApiService.assistants.getAll();
      dispatch(setAssistances(response.data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

const filteredAssistances = assistances.filter(assistant => {
  const first = (assistant.firstName || "").toLowerCase();
  const last = (assistant.lastName || "").toLowerCase();
  const email = (assistant.email || "").toLowerCase();
  const position = (assistant.position || "").toLowerCase();

  const search = searchTerm.toLowerCase();

  const matchesSearch =
    first.includes(search) ||
    last.includes(search) ||
    email.includes(search) ||
    position.includes(search);

  const matchesDepartment = departmentFilter
    ? assistant.department === departmentFilter
    : true;

  return matchesSearch && matchesDepartment;
});


  const handleEdit = (assistant) => {
    // Implementation for edit will be in parent component
    console.log('Edit assistant:', assistant);
  };

  const handleDelete = (assistant) => {
    // Implementation for delete will be in parent component
    console.log('Delete assistant:', assistant);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Assistants</h1>
              <p className="text-gray-600 mt-2">Manage and view all assistant accounts</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {assistances.length} assistants
              </span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search assistants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
              >
                <option value="">All Departments</option>
                {departments.map((dept, index) => (
                  <option key={`${dept}-${index}`} value={dept}>
                    {dept || "Unknown"}
                  </option>
                ))}

              </select>
            </div>

            {/* Export Button */}
            <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Assistants List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Assistant Directory</h2>
          </div>

          <div className="p-6">
            <AssistanceList
              assistances={filteredAssistances}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAssistances;