export interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite?: (data: {
    name: string;
    email: string;
  }) => void | Promise<void>;
}
