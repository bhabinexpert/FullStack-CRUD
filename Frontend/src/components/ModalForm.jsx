import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  job: "",
  rate: "",
  isActive: false,
};

export default function ModalForm({ isOpen, onClose, mode, clientData, onSubmit }) {
  const [formState, setFormState] = useState(emptyForm);

  const defaultValues = useMemo(() => {
    if (!isOpen) {
      return { ...emptyForm };
    }
    return {
      name: clientData?.name ?? "",
      email: clientData?.email ?? "",
      job: clientData?.job ?? "",
      rate: clientData?.rate != null ? String(clientData.rate) : "",
      isActive: Boolean(clientData?.isActive ?? clientData?.isactive),
    };
  }, [isOpen, clientData]);

  useEffect(() => {
    setFormState(defaultValues);
  }, [defaultValues]);

  const handleChange = (field) => (event) => {
    const value = field === "isActive"
      ? event.target.value === "Active"
      : event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...formState,
      rate: formState.rate === "" ? null : Number(formState.rate),
    };

    try {
      await onSubmit?.(payload);
    } catch (error) {
      console.error("Error saving client", error);
    }
  };

  return (
    <>
      <dialog id="client_modal" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? `Edit Client` : `Client Details`}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-10 w-full">
              Name
              <input
                type="text"
                className="grow"
                value={formState.name}
                onChange={handleChange("name")}
                placeholder=""
              />
            </label>
            <label className="input input-bordered flex items-center gap-10 w-full">
              Email
              <input
                type="text"
                className="grow"
                value={formState.email}
                onChange={handleChange("email")}
                placeholder=""
              />
            </label>
            <label className="input input-bordered flex items-center gap-10 w-full">
              Job
              <input
                type="text"
                className="grow"
                value={formState.job}
                onChange={handleChange("job")}
                placeholder=""
              />
            </label>
            <div className="flex gap-4">
              <label className="input input-bordered flex items-center gap-10">
                Rate
                <input
                  type="number"
                  className="grow"
                  value={formState.rate}
                  onChange={handleChange("rate")}
                  placeholder=""
                />
              </label>
              <select
                value={formState.isActive ? "Active" : "Inactive"}
                className="select select-bordered w-full max-w-xs"
                onChange={handleChange("isActive")}
              >
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <button type="submit" className="btn btn-success">
              {mode === "edit" ? `Save Changes` : `Add Client`}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
