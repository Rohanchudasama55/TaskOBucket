import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import Dropdown from "../../components/common/DropDown/DropDown";
import { useForm, Controller } from "react-hook-form";
import {
  availableUsers,
  type CreateProjectModalProps,
} from "./CreateProjectModal.hooks";
import { CREATE_PROJECT_MODAL_CONSTANTS } from "./CreateProjectModal.constants";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";
import { useCreateUpdate } from "../../hooks/CrudHooks";

interface CreateProjectFormValues {
  name: string;
  project_key: string;
  leadId: string;
  description: string;
  startDate: string;
  // teamMembers: string[];
}

export function CreateProjectModal({
  isOpen,
  onClose,
  onSave,
  isLoading,
}: CreateProjectModalProps) {
  const { id } = useParams();
  const apiname = "project/create";
  const showAlert = useAlert();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    defaultValues: {
      name: "",
      project_key: "",
      leadId: "",
      description: "",
      startDate: "",
      // teamMembers: [],
    },
  });
  const { mutateAsync, error, isSuccess, isError } = useCreateUpdate<any>(
    apiname,
    id
  );

  const onSubmit = async (formData: CreateProjectFormValues) => {
    const payload = {
      name: formData.name,
      project_key: formData.project_key,
      description: formData.description.trim(),
      
      // startDate: formData.startDate,
      // leadId: formData.leadId,
      // teamMembers: formData.teamMembers.map((userId) => ({
      //   userId,
      //   role: "DEV",
      // })),
    };

    await mutateAsync(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert(
        id ? "Updated Successfully" : "Created Successfully",
        "success"
      );
      onClose();
    }
    if (isError) {
      showAlert(
        typeof error === "object" && error !== null && "response" in error
          ? (error as any)?.response?.data?.Message
          : "Something went wrong",
        "error"
      );
    }
  }, [isSuccess, isError]);
  const formValues = watch();

  const teamOptions = availableUsers.map((user) => ({
    id: user.id,
    label: user.name,
    value: user.id,
  }));

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
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 overflow-auto">
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
                    CREATE_PROJECT_MODAL_CONSTANTS.PLACEHOLDERS.PROJECT_KEY
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
                    labelKey="label"
                    // apiUrl="project/project-assignable"
                    valueKey="value"
                    multiple={false}
                    selectedValues={field.value ? [field.value] : []}
                    onChange={(values) => field.onChange(values[0])}
                    placeholder="Select project lead"
                  />
                )}
              />
            </div>

            {/* Team Members */}
            {/* <div>
              <label className="block text-sm font-medium mb-2">
                {CREATE_PROJECT_MODAL_CONSTANTS.LABELS.TEAM_MEMBERS}
              </label>
              <Controller
                control={control}
                name="teamMembers"
                render={({ field }) => (
                  <Dropdown
                    options={teamOptions}
                    // apiUrl="project/project-assignable"
                    labelKey="label"
                    valueKey="value"
                    multiple
                    selectedValues={field.value}
                    onChange={(values) => field.onChange(values.map((v: any) => v.value))}
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
                  formValues.teamMembers.length.toString()
                ).replace(
                  "{plural}",
                  formValues.teamMembers.length !== 1 ? "s" : ""
                )}
              </p>
            </div> */}
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
