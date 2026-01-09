import { ChevronDown, Trash2 } from "lucide-react";
import type { Member, MemberRole, MemberStatus } from "./Teams.hooks";

export function StatusBadge({ status }: { status: MemberStatus }) {
  const statusStyles: Record<MemberStatus, string> = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Away: "bg-amber-50 text-amber-600 border-amber-200",
    Pending: "bg-slate-50 text-slate-600 border-slate-200",
  };

  const dotStyles: Record<MemberStatus, string> = {
    Active: "bg-emerald-500",
    Away: "bg-amber-500",
    Pending: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`}></span>
      {status}
    </span>
  );
}

export function RoleSelect({
  value,
  onChange,
  memberId,
}: {
  value: MemberRole;
  memberId: number;
  onChange: (memberId: number, newRole: MemberRole) => void;
}) {
  const roles: MemberRole[] = ["Admin", "Editor", "Viewer"];

  return (
    <div className="relative w-[140px]">
      <select
        value={value}
        onChange={(e) => onChange(memberId, e.target.value as MemberRole)}
        className="
          w-full
          h-10
          appearance-none
          rounded-lg
          border border-slate-200
          bg-white
          px-4 pr-9
          text-sm font-medium text-slate-800
          shadow-sm
          hover:border-slate-300
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          transition
          cursor-pointer
        "
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      {/* Chevron */}
      <ChevronDown
        className="
          pointer-events-none
          absolute right-3 top-1/2
          h-4 w-4
          -translate-y-1/2
          text-slate-400
        "
      />
    </div>
  );
}

export function MemberRow({
  member,
  isAdmin,
  onRoleChange,
  onDelete,
}: {
  member: Member;
  isAdmin: boolean;
  onRoleChange: (memberId: number, newRole: MemberRole) => void;
  onDelete: (memberId: number) => void;
}) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-10 h-10 rounded-full bg-slate-100"
          />
          <div>
            <div className="font-medium text-slate-900">{member.name}</div>
            <div className="text-sm text-slate-500">{member.email}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        {isAdmin ? (
          <RoleSelect
            value={member.role}
            onChange={onRoleChange}
            memberId={member.id}
          />
        ) : (
          <span className="text-sm font-medium text-slate-800">
            {member.role}
          </span>
        )}
      </td>
      <td className="py-4 px-6">
        <StatusBadge status={member.status} />
      </td>
      <td className="py-4 px-6 text-sm text-slate-600">{member.activity}</td>
      <td className="py-4 px-6 text-right">
        <button
          onClick={() => onDelete(member.id)}
          className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
          aria-label="Delete member"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
