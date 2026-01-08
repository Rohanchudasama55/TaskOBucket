import { useState } from "react";
import { ChevronDown, Plus, Search, Trash2 } from "lucide-react";
import { mockMembers, tabs } from "./Teams.constants";
import type {
  Member,
  MemberRole,
  MemberStatus,
  TeamsPageProps,
} from "./Teams.hooks";

const StatusBadge = ({ status }: { status: MemberStatus }) => {
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
};

const RoleSelect = ({
  value,
  onChange,
  memberId,
}: {
  value: MemberRole;
  memberId: number;
  onChange: (memberId: number, newRole: MemberRole) => void;
}) => {
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
};

const MemberRow = ({
  member,
  isAdmin,
  onRoleChange,
  onDelete,
}: {
  member: Member;
  isAdmin: boolean;
  onRoleChange: (memberId: number, newRole: MemberRole) => void;
  onDelete: (memberId: number) => void;
}) => {
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
};

const TeamsPage = ({ currentUserRole = "Admin" }: TeamsPageProps) => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [activeTab, setActiveTab] = useState("All Members");
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = currentUserRole === "Admin";

  const handleRoleChange = (memberId: number, newRole: MemberRole) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleDelete = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Team Members
              </h1>
              <p className="text-slate-600">
                Manage your team members, their roles, and access permissions.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Invite Member
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="relative w-96">
            {" "}
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search members by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative ${
                activeTab === tab.name
                  ? "text-blue-600 bg-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.name} ({tab.count})
              {activeTab === tab.name && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200">
                <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Member
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Activity
                </th>
                <th className="py-4 px-6 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  isAdmin={isAdmin}
                  onRoleChange={handleRoleChange}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
            <div className="text-sm text-slate-600">
              Showing 1 to 5 of 24 members
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                ‹
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 text-white font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                3
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-slate-400">
                ...
              </span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
