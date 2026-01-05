import React, { useState } from 'react'
import { Modal } from '../../components/Modal'
import type { CreateProjectRequest } from './projectApi'

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CreateProjectRequest) => void
  isLoading?: boolean
}

export function CreateProjectModal({ isOpen, onClose, onSave, isLoading }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<CreateProjectRequest>({
    name: '',
    description: '',
    ownerId: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ name: '', description: '', ownerId: '' })
      onClose()
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Create New Project
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Enter project description (optional)"
            />
          </div>

          <div>
            <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
              Owner ID
            </label>
            <input
              type="text"
              id="ownerId"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Enter owner ID (optional)"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.name.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
