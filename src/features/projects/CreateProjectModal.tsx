import React, { useState, useEffect } from 'react'
import { Modal } from '../../components/ui/Modal'
import type { CreateProjectRequest } from './projectApi'

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CreateProjectRequest) => void
  isLoading?: boolean
}

interface FormData extends CreateProjectRequest {
  key: string
  leadId: string
}

export function CreateProjectModal({ isOpen, onClose, onSave, isLoading }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    ownerId: '',
    key: '',
    leadId: 'current-user'
  })

  // Auto-generate key from project name
  useEffect(() => {
    if (formData.name) {
      const generatedKey = formData.name
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, '')
        .split(' ')
        .map(word => word.slice(0, 3))
        .join('')
        .slice(0, 6)
      
      setFormData(prev => ({
        ...prev,
        key: generatedKey || 'PROJ'
      }))
    }
  }, [formData.name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { leadId, ...projectData } = formData
    onSave({
      ...projectData,
      ownerId: leadId
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ 
        name: '', 
        description: '', 
        ownerId: '', 
        key: '', 
        leadId: 'current-user' 
      })
      onClose()
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Create Project
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Start a new workspace for your team
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 disabled:opacity-50"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
          
          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-5">
              {/* Project Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="e.g. Q4 Marketing Campaign"
                />
              </div>

              {/* Key */}
              <div>
                <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-2">
                  Key
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="key"
                    name="key"
                    value={formData.key}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Q4M"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border border-gray-200">
                      AUTO
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Used for issue IDs (e.g. {formData.key || 'Q4M'}-101).
                </p>
              </div>

              {/* Project Lead */}
              <div>
                <label htmlFor="leadId" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Lead
                </label>
                <div className="relative">
                  <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
                    {/* Circular avatar */}
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-white">
                        {formData.leadId === 'current-user' ? 'TC' : 
                         formData.leadId === 'user-2' ? 'SJ' : 'MC'}
                      </span>
                    </div>
                    
                    {/* Name and select */}
                    <div className="flex-1 ml-3 flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-900">
                          {formData.leadId === 'current-user' ? 'Tom Cook' : 
                           formData.leadId === 'user-2' ? 'Sarah Johnson' : 'Mike Chen'}
                        </span>
                        {formData.leadId === 'current-user' && (
                          <span className="ml-2 text-xs text-gray-500">(Me)</span>
                        )}
                      </div>
                      
                      {/* Chevron icon */}
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Hidden select for functionality */}
                    <select
                      id="leadId"
                      name="leadId"
                      value={formData.leadId}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <option value="current-user">Tom Cook (Me)</option>
                      <option value="user-2">Sarah Johnson</option>
                      <option value="user-3">Mike Chen</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.name.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
    </Modal>
  )
}
