import { X, Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { Sprint, SprintStatus } from "../types";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useCreateUpdate, useFetchAllID } from "../../../hooks/CrudHooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAlert } from "../../../contexts/AlertContext";
import Dropdown from "../../../components/common/DropDown/DropDown";

interface CreateSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSprint: (sprint: Omit<Sprint, "id" | "order">) => void;
  defaultStatus?: SprintStatus;
}

/** Mock projects – later replace with API */
const projects = [
  { id: "695e53107964464786292e2c", name: "Project Alpha" },
  { id: "p2", name: "Project Beta" },
  { id: "p3", name: "Project Gamma" },
];

const statusOptions = [
  { id: "BACKLOG", name: "BACKLOG" },
  { id: "ongoing", name: "Ongoing" },
  { id: "completed", name: "Completed" },
];

type CreateSprintFormValues = {
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  description?: string;
  status: SprintStatus;
};

export function CreateSprintModal({
  isOpen,
  onClose,
  onCreateSprint,
  defaultStatus = "upcoming",
}: CreateSprintModalProps) {
  const { id } = useParams();
  const apiname = "sprint/create";
  const showAlert = useAlert();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateSprintFormValues>({
    defaultValues: {
      name: "",
      projectId: "",
      startDate: "",
      endDate: "",
      description: "",
      status: defaultStatus,
    },
  });
  const { data, isPending: isFetching } = useFetchAllID<any>(apiname, id);
  const { mutateAsync, error, isSuccess, isError } = useCreateUpdate<any>(
    apiname,
    id
  );

  const onSubmit = async (formData: CreateSprintFormValues) => {
    if (id) {
      (formData as any).Id = id;
    }
    mutateAsync(formData);
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
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold text-slate-900">Create Sprint</h2>
          <Button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
          >
            <X className="h-5 w-5 text-slate-500" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sprint Name *
            </label>
            <Input
              {...register("name", { required: "Sprint name is required" })}
              placeholder="Sprint 1"
              className={`w-full px-4 py-2 rounded-lg ring-1 ${
                errors.name ? "ring-red-300" : "ring-slate-300"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Project */}
          {/* <div>
            <label className="block text-sm font-medium mb-1">Project *</label>
            <select
              {...register("projectId", {
                required: "Project is required",
              })}
              className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
            >
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <p className="text-xs text-red-500 mt-1">
                {errors.projectId.message}
              </p>
            )}
          </div> */}
          <div>
            <label className="block text-sm font-medium mb-1">Project *</label>

            <Controller
              name="projectId"
              control={control}
              rules={{ required: "Project is required" }}
              render={({ field }) => (
                <Dropdown
                  options={projects}
                  labelKey="name"
                  valueKey="id"
                  placeholder="Select project"
                  multiple={false}
                  selectedValues={field.value ? [field.value] : []}
                  onChange={(vals) => field.onChange(vals[0] ?? "")}
                />
              )}
            />

            {errors.projectId && (
              <p className="text-xs text-red-500 mt-1">
                {errors.projectId.message}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date *
              </label>
              <Input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Due Date *
              </label>
              <Input
                type="date"
                {...register("endDate", {
                  required: "Due date is required",
                })}
                className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={3}
              {...register("description")}
              className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
              placeholder="Sprint goals..."
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>

            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Dropdown
                  options={statusOptions}
                  labelKey="name"
                  valueKey="id"
                  placeholder="Select status"
                  multiple={false}
                  selectedValues={field.value ? [field.value] : []}
                  onChange={(vals) => field.onChange(vals[0] ?? "")}
                />
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Sprint
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
