import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * DynamicContentBuilder Component
 *
 * A reusable component for building dynamic content sections with support for:
 * - Text, HTML, Tables, Lists, Alerts, Links, etc.
 * - Sections with collapsible content
 * - Quick arrays for simple lists
 */
const DynamicContentBuilder = ({
  value = [],
  onChange,
  label = "Dynamic Content",
  placeholder = "Add dynamic content items...",
  showQuickArrays = true,
  quickArrays = {
    selectionProcess: [],
    documentsRequired: [],
    importantInstructions: []
  },
  onQuickArraysChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newItem, setNewItem] = useState({
    type: 'text',
    label: '',
    value: '',
    values: [],
    description: '',
    order: value.length,
    section: 'general',
    metadata: {}
  });

  const contentTypes = [
    { value: 'text', label: 'Text' },
    { value: 'heading', label: 'Heading' },
    { value: 'html', label: 'HTML' },
    { value: 'list', label: 'List' },
    { value: 'table', label: 'Table' },
    { value: 'alert', label: 'Alert/Notice' },
    { value: 'link', label: 'Link' },
    { value: 'file', label: 'File/PDF' },
  ];

  const handleAdd = () => {
    if (!newItem.label.trim()) {
      alert('Please provide a label for the content item');
      return;
    }

    const itemToAdd = {
      ...newItem,
      order: value.length
    };

    onChange([...value, itemToAdd]);
    setNewItem({
      type: 'text',
      label: '',
      value: '',
      values: [],
      description: '',
      order: value.length + 1,
      section: 'general',
      metadata: {}
    });
    setShowAddForm(false);
  };

  const handleDelete = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleUpdate = (index, updatedItem) => {
    const newValue = [...value];
    newValue[index] = updatedItem;
    onChange(newValue);
    setEditingIndex(null);
  };

  // Quick Arrays Handlers
  const handleQuickArrayChange = (arrayName, items) => {
    if (onQuickArraysChange) {
      onQuickArraysChange({
        ...quickArrays,
        [arrayName]: items
      });
    }
  };

  const addQuickArrayItem = (arrayName) => {
    const newItem = prompt(`Add item to ${arrayName}:`);
    if (newItem && newItem.trim()) {
      handleQuickArrayChange(arrayName, [...(quickArrays[arrayName] || []), newItem.trim()]);
    }
  };

  const removeQuickArrayItem = (arrayName, index) => {
    const newItems = quickArrays[arrayName].filter((_, i) => i !== index);
    handleQuickArrayChange(arrayName, newItems);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show ({value.length} items)
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
          {/* Quick Arrays Section */}
          {showQuickArrays && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Selection Process */}
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Selection Process</h4>
                  <button
                    type="button"
                    onClick={() => addQuickArrayItem('selectionProcess')}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <ul className="space-y-1">
                  {quickArrays.selectionProcess?.map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-xs text-gray-600 group">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeQuickArrayItem('selectionProcess', index)}
                        className="opacity-0 group-hover:opacity-100 text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Required */}
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Documents Required</h4>
                  <button
                    type="button"
                    onClick={() => addQuickArrayItem('documentsRequired')}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <ul className="space-y-1">
                  {quickArrays.documentsRequired?.map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-xs text-gray-600 group">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeQuickArrayItem('documentsRequired', index)}
                        className="opacity-0 group-hover:opacity-100 text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Instructions */}
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Important Instructions</h4>
                  <button
                    type="button"
                    onClick={() => addQuickArrayItem('importantInstructions')}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <ul className="space-y-1">
                  {quickArrays.importantInstructions?.map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-xs text-gray-600 group">
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeQuickArrayItem('importantInstructions', index)}
                        className="opacity-0 group-hover:opacity-100 text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Existing Dynamic Content Items */}
          {value.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Advanced Content Items</h4>
              {value.map((item, index) => (
                <div key={index} className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-blue-600 uppercase">
                          {item.type}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {item.label}
                        </span>
                      </div>
                      {item.value && (
                        <p className="text-xs text-gray-600 line-clamp-2">{item.value}</p>
                      )}
                      {item.values && item.values.length > 0 && (
                        <p className="text-xs text-gray-600">
                          {item.values.length} items
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingIndex(index)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Item Button */}
          {!showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Advanced Content Item
            </button>
          )}

          {/* Add Form */}
          {showAddForm && (
            <div className="bg-white p-4 rounded border border-gray-300 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">New Content Item</h4>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  >
                    {contentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Label *</label>
                  <input
                    type="text"
                    value={newItem.label}
                    onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Physical Standards"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newItem.value}
                  onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter content..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  Add Item
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicContentBuilder;
