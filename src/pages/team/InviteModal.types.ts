export interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite?: (data: {
    name: string;
    email: string;
  }) => void | Promise<void>;
}
export interface Role {
  id: string;
  name: string;
}