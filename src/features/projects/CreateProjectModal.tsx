import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import Dropdown from "../../components/common/DropDown/DropDown";
import { useForm, Controller } from "react-hook-form";
import { type CreateProjectModalProps } from "./CreateProjectModal.hooks";
import { CREATE_PROJECT_MODAL_CONSTANTS } from "./CreateProjectModal.constants";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";
import { useCreateUpdate } from "../../hooks/CrudHooks";
import { userService, type ApiUser } from "../../services/userService";

interface CreateProjectFormValues {
  name: string;
  project_key: string;
  leadId: string;
  description: string;
  startDate: string;
  teamMembers: string[];
}

export function CreateProjectModal({
  isOpen,
  onClose,
  isLoading,
}: CreateProjectModalProps) {
  const [teamOptions, setTeamOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const { id } = useParams();
  const apiname = "project/create";
  const showAlert = useAlert();
  const { control, register, handleSubmit, reset, watch } =
    useForm<CreateProjectFormValues>({
      defaultValues: {
        name: "",
        project_key: "",
        leadId: "",
        description: "",
        // startDate: "",
        teamMembers: [],
      },
    });
  const { mutateAsync, error, isSuccess, isError } = useCreateUpdate<any>(
    apiname,
    id,
  );

  const extractUsersFromResponse = useCallback((payload: any): ApiUser[] => {
    const data = payload ?? {};
    const result = data?.result ?? {};

    const candidates = [
      Array.isArray(data?.users) ? data.users : null,
      Array.isArray(data?.data) ? data.data : null,
      Array.isArray(result?.users) ? result.users : null,
      Array.isArray(result?.data) ? result.data : null,
      Array.isArray(data?.data?.data) ? data.data.data : null,
    ];

    return (candidates.find((candidate) => Array.isArray(candidate)) ||
      []) as ApiUser[];
  }, []);

  const mapUsersToOptions = useCallback(
    (users: ApiUser[]) =>
      users.map((user, index) => {
        const idCandidate =
          user.id ??
          user._id ??
          user.email ??
          user.name ??
          `user-${Date.now()}-${index}`;

        return {
          id: String(idCandidate),
          name: user.name || user.email || "Unknown User",
        };
      }),
    [],
  );

  const loadTeamOptions = useCallback(async () => {
    try {
      const response = await userService.list({ page: 1, limit: 50 });
      const users = extractUsersFromResponse(response);
      setTeamOptions(mapUsersToOptions(users));
    } catch {
      setTeamOptions([]);
    }
  }, [extractUsersFromResponse, mapUsersToOptions]);

  useEffect(() => {
    loadTeamOptions();
  }, [loadTeamOptions]);

  const onSubmit = async (formData: CreateProjectFormValues) => {
    const payload = {
      name: formData.name,
      // Backend contract appears to expect `key` (not `project_key`) and rejects unknown fields.
      project_key: formData.project_key,
      description: formData.description.trim(),

      startDate: formData.startDate,
      leadId: formData.leadId,
      teamMembers: formData.teamMembers.map((userId) => ({
        userId,
        role: "DEV",
      })),
    };

    await mutateAsync(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert(
        id ? "Updated Successfully" : "Created Successfully",
        "success",
      );
      onClose();
    }
    if (isError) {
      showAlert(
        typeof error === "object" && error !== null && "response" in error
          ? (error as any)?.response?.data?.Message
          : "Something went wrong",
        "error",
      );
    }
  }, [isSuccess, isError]);
  const formValues = watch();

  // const onSubmit = (data: CreateProjectFormValues) => {
  //   onSave(data);
  //   reset();
  // };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Header */}
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
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-4 overflow-auto"
        >
          <div className="space-y-5">
            {/* Project Name */}
            <Input
              label={CREATE_PROJECT_MODAL_CONSTANTS.LABELS.PROJECT_NAME}
              placeholder={
                CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS.PROJECT_NAME
              }
              disabled={isLoading}
              {...register("name", { required: true })}
            />

            {/* Project Key */}
            <div className="relative">
              <Input
                label={CREATE_PROJECT_MODAL_CONSTANTS.LABELS.PROJECT_KEY}
                placeholder={
                  CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS.PROJECT_KEY
                }
                disabled={isLoading}
                {...register("project_key")}
              />
              <span className="absolute right-3 top-[42px] text-xs bg-gray-100 px-2 py-1 rounded border">
                {CREATE_PROJECT_MODAL_CONSTANTS.MESSAGES.AUTO}
              </span>
              <p className="mt-1 text-xs text-gray-500">
                {CREATE_PROJECT_MODAL_CONSTANTS.MESSAGES.KEY_USAGE.replace(
                  "{project_key}",
                  formValues.project_key ||
                    CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS.PROJECT_KEY,
                )}
              </p>
            </div>
            <Input
              label="Description"
              placeholder="Backend services for WhatsApp clone"
              disabled={isLoading}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {/* 
            <Input
              label="Start Date"
              type="date"
              disabled={isLoading}
              {...register("startDate", { required: "Start date is required" })}
            /> */}

            {/* Project Lead */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {CREATE_PROJECT_MODAL_CONSTANTS.LABELS.PROJECT_LEAD}
              </label>
              <Controller
                control={control}
                name="leadId"
                render={({ field }) => (
                  <Dropdown
                    options={teamOptions}
                    labelKey="name"
                    // apiUrl="project/project-assignable"
                    valueKey="id"
                    multiple={false}
                    selectedValues={field.value ? [field.value] : []}
                    onChange={(values) => field.onChange(values[0] || "")}
                    placeholder="Select project lead"
                  />
                )}
              />
            </div>

            {/* Team Members */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {CREATE_PROJECT_MODAL_CONSTANTS.LABELS.TEAM_MEMBERS}
              </label>
              <Controller
                control={control}
                name="teamMembers"
                render={({ field }) => (
                  <Dropdown
                    options={teamOptions}
                    labelKey="name"
                    valueKey="id"
                    multiple
                    selectedValues={field.value ? field.value : []}
                    onChange={(values) => field.onChange(values)}
                    placeholder={
                      CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS
                        .SELECT_TEAM_MEMBERS
                    }
                  />
                )}
              />
              <p className="mt-1 text-xs text-gray-500">
                {CREATE_PROJECT_MODAL_CONSTANTS.MESSAGES.MEMBERS_SELECTED.replace(
                  "{count}",
                  formValues.teamMembers.length.toString(),
                ).replace(
                  "{plural}",
                  formValues.teamMembers.length !== 1 ? "s" : "",
                )}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="text-sm text-gray-700"
            >
              {CREATE_PROJECT_MODAL_CONSTANTS.BUTTONS.CANCEL}
            </button>
            <Button
              type="submit"
              disabled={isLoading || !formValues.name?.trim()}
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
