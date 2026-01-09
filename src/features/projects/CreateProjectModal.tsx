import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  useCreateProjectModal,
  availableUsers,
} from "./CreateProjectModal.hooks";
import type { CreateProjectModalProps } from "./CreateProjectModal.hooks";
import { CREATE_PROJECT_MODAL_CONSTANTS } from "./CreateProjectModal.constants";

export function CreateProjectModal({
  isOpen,
  onClose,
  onSave,
  isLoading,
}: CreateProjectModalProps) {
  const {
    formData,
    isTeamDropdownOpen,
    dropdownRef,
    handleSubmit,
    handleChange,
    toggleTeamMember,
    handleClose,
    toggleTeamDropdown,
    getLeadInitials,
    getLeadName,
    isLeadCurrentUser,
  } = useCreateProjectModal({ isOpen, onClose, onSave, isLoading });

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {CREATE_PROJECT_MODAL_CONSTANTS.TITLE}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {CREATE_PROJECT_MODAL_CONSTANTS.DESCRIPTION}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 disabled:opacity-50"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-5">
            {/* Project Name */}
            <div>
              <Input
                type="text"
                label={CREATE_PROJECT_MODAL_CONSTANTS.LABELS.PROJECT_NAME}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={
                  CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS.PROJECT_NAME
                }
              />
            </div>

            {/* Key */}
            <div>
              <div className="relative">
                <Input
                  type="text"
                  id="key"
                  label={CREATE_PROJECT_MODAL_CONSTANTS.LABELS.PROJECT_KEY}
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={
                    CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS.PROJECT_KEY
                  }
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="inline-flex items-center px-2 py-1 mt-7 text-xs font-medium text-gray-500 bg-gray-100 rounded border border-gray-200">
                    {CREATE_PROJECT_MODAL_CONSTANTS.MESSAGES.AUTO}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {CREATE_PROJECT_MODAL_CONSTANTS.MESSAGES.KEY_USAGE.replace(
                  "{key}",
                  formData.key ||
                    CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS.PROJECT_KEY
                )}
              </p>
            </div>

            {/* Project Lead */}
            <div>
              <label
                htmlFor="leadId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {CREATE_PROJECT_MODAL_CONSTANTS.LABELS.PROJECT_LEAD}
              </label>
              <div className="relative">
                <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
                  {/* Circular avatar */}
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-white">
                      {getLeadInitials(formData.leadId)}
                    </span>
                  </div>

                  {/* Name and select */}
                  <div className="flex-1 ml-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-900">
                        {getLeadName(formData.leadId)}
                      </span>
                      {isLeadCurrentUser(formData.leadId) && (
                        <span className="ml-2 text-xs text-gray-500">(Me)</span>
                      )}
                    </div>

                    {/* Chevron icon */}
                    <svg
                      className="w-4 h-4 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
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

            {/* Team Members - Multi Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {CREATE_PROJECT_MODAL_CONSTANTS.LABELS.TEAM_MEMBERS}
              </label>

              <div className="relative" ref={dropdownRef}>
                {/* Main Dropdown Button */}
                <button
                  type="button"
                  onClick={toggleTeamDropdown}
                  disabled={isLoading}
                  className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed min-h-[42px]"
                >
                  {/* Selected Members as Chips */}
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    {formData.teamMembers.length === 0 ? (
                      <span className="text-sm text-gray-400">
                        {
                          CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS
                            .SELECT_TEAM_MEMBERS
                        }
                      </span>
                    ) : (
                      formData.teamMembers.map((userId) => {
                        const user = availableUsers.find(
                          (u) => u.id === userId
                        );
                        return (
                          <div
                            key={userId}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                          >
                            <span>{user?.initials}</span>
                            <span>{user?.name.split(" ")[0]}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTeamMember(userId);
                              }}
                              disabled={isLoading}
                              className="hover:text-blue-900 disabled:opacity-50"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
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
                        );
                      })
                    )}
                  </div>

                  {/* Chevron icon */}
                  <svg
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform ${
                      isTeamDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isTeamDropdownOpen && (
                  <div className="mt-2 border rounded-md max-h-52 overflow-y-auto custom-scrollbar">
                    {availableUsers.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => toggleTeamMember(user.id)}
                        disabled={isLoading}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50"
                      >
                        {/* Checkbox */}
                        <div
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                            formData.teamMembers.includes(user.id)
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.teamMembers.includes(user.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Avatar */}
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                          <span className="text-xs font-medium text-white">
                            {user.initials}
                          </span>
                        </div>

                        {/* Name */}
                        <span className="ml-3 text-sm text-gray-900">
                          {user.name}
                          {user.tag && (
                            <span className="ml-2 text-xs text-gray-500">
                              {user.tag}
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-1 text-xs text-gray-500">
                {CREATE_PROJECT_MODAL_CONSTANTS.MESSAGES.MEMBERS_SELECTED.replace(
                  "{count}",
                  formData.teamMembers.length.toString()
                ).replace(
                  "{plural}",
                  formData.teamMembers.length !== 1 ? "s" : ""
                )}
              </p>
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
              {CREATE_PROJECT_MODAL_CONSTANTS.BUTTONS.CANCEL}
            </button>
            <Button
              type="submit"
              disabled={isLoading || !formData.name.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading
                ? CREATE_PROJECT_MODAL_CONSTANTS.BUTTONS.CREATING
                : CREATE_PROJECT_MODAL_CONSTANTS.BUTTONS.CREATE_PROJECT}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
