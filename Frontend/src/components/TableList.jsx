export default function TableList({ clients = [], loading, error, onEdit, onDelete }) {
  return (
    <>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
              <th colSpan={2} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="hover">
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center">Loading clients...</td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">No clients found.</td>
              </tr>
            ) : (
              clients.map((client) => {
                const isActive = client.isActive ?? client.isactive ?? false
                return (
                  <tr key={client.id}>
                    <th>{client.id}</th>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.job}</td>
                    <td>{client.rate}</td>
                    <td>
                      <button className={`btn rounded-full w-20 ${isActive ? "btn-primary" : "btn-outline"}`}>
                        {isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => onEdit?.(client)}
                        className="btn btn-secondary"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => onDelete?.(client.id)}
                        className="btn btn-accent"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
