export const CREATE_PROJECT_MODAL_CONSTANTS = {
  TITLE: "Create Project",
  DESCRIPTION: "Start a new workspace for your team",
  BUTTONS: {
    CANCEL: "Cancel",
    CREATE_PROJECT: "Create Project",
    CREATING: "Creating...",
  },
  LABELS: {
    PROJECT_NAME: "Project Name",
    PROJECT_KEY: "Project Key",
    PROJECT_LEAD: "Project Lead",
    TEAM_MEMBERS: "Team Members",
  },
  PLACEHOLDERS: {
    PROJECT_NAME: "e.g. Q4 Marketing Campaign",
    PROJECT_KEY: "Q4M",
    SELECT_TEAM_MEMBERS: "Select team members",
  },
  MESSAGES: {
    KEY_USAGE: "Used for issue IDs (e.g. {key}-101).",
    MEMBERS_SELECTED: "{count} member{plural} selected",
    AUTO: "AUTO",
  },
} as const;
