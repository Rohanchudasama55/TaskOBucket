import { Plus, Search } from "lucide-react";
import { tabs } from "./Teams.constants";
import type { TeamsPageProps } from "./Teams.hooks";
import { Button } from "../../components/ui/Button";
import { InviteModal } from "./InviteModal";
import { useTeamsPage } from "./Teams.hooks";
import { MemberRow } from "./Teams.component";

const TeamsPage = (props: TeamsPageProps) => {
  const {
    members,
    activeTab,
    searchQuery,
    isInviteModalOpen,
    isAdmin,
    setActiveTab,
    setSearchQuery,
    handleRoleChange,
    handleDelete,
    handleInviteSuccess,
    openInviteModal,
    closeInviteModal,
  } = useTeamsPage(props);

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
            <Button
              onClick={openInviteModal}
              className="flex items-center gap-2  px-5 py-2.5 "
            >
              <Plus className="w-4 h-4" />
              Invite Member
            </Button>
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

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        onSendInvite={handleInviteSuccess}
      />
    </div>
  );
};

export default TeamsPage;
