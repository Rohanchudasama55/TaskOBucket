import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { INVITE_MODAL_CONSTANTS } from "./InviteModal.constants";
import { useInviteModal } from "./InviteModal.hooks";
import type { InviteModalProps } from "./InviteModal.types";

export function InviteModal({
  isOpen,
  onClose,
  onSendInvite,
}: InviteModalProps) {
  const {
    formData,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleClose,
  } = useInviteModal({ onClose, onSendInvite });

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {INVITE_MODAL_CONSTANTS.TITLE}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {INVITE_MODAL_CONSTANTS.DESCRIPTION}
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
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Name Field */}
            <div>
              <Input
                type="text"
                label={INVITE_MODAL_CONSTANTS.LABELS.NAME}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={INVITE_MODAL_CONSTANTS.PLACEHOLDERS.NAME}
              />
            </div>

            {/* Email Field */}
            <div>
              <Input
                type="email"
                label={INVITE_MODAL_CONSTANTS.LABELS.EMAIL}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={INVITE_MODAL_CONSTANTS.PLACEHOLDERS.EMAIL}
              />
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
              {INVITE_MODAL_CONSTANTS.BUTTONS.CANCEL}
            </button>
            <Button
              type="submit"
              disabled={
                isLoading || !formData.name.trim() || !formData.email.trim()
              }
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading
                ? INVITE_MODAL_CONSTANTS.BUTTONS.SENDING
                : INVITE_MODAL_CONSTANTS.BUTTONS.SEND_INVITE}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
