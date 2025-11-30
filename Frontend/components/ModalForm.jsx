import { useState } from "react";

export default function ModalForm({ isOpen, onClose, mode,}) {
    const [rate, setRate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [status, setStatus] = useState(false);

    const handleStatusChange = (e)=>{
        setStatus(e.target.value === 'Active');
        

    }
    
    const handelSubmit = (e)=>{
        e.preventDefault();
        onClose();
    }

  return (
    <>
      <dialog id="client_modal" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? `Edit Client` : `Client Details`}
          </h3>
          <form method="dialog" onSubmit={handelSubmit} className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-10 w-full">
              Name
              <input type="text" className="grow" value={name} onChange={(e)=> setName(e.target.value)}  placeholder="" />
            </label>
            <label className="input input-bordered flex items-center gap-10 w-full">
              Email
              <input type="text" className="grow" value={email} onChange={(e)=> setEmail(e.target.value)}placeholder="" />
            </label>
            <label className="input input-bordered flex items-center gap-10 w-full">
              Job
              <input type="text" className="grow" value={job} onChange={(e)=> setJob(e.target.value)}placeholder="" />
            </label>
            <div className="flex gap-4">
              <label className="input input-bordered flex items-center gap-10">
                Rate
                <input type="number" className="grow" value={rate} onChange={(e)=> setRate(e.target.value)}placeholder="" />
              </label>
              <select value={status? 'Active': 'Inactive'} className="select select-bordered w-full max-w-xs"onChange={handleStatusChange}>
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
