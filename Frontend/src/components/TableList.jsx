export default function TableList({handleOpen}) {
    const clients = [
      {id: "1", name: "Bhabin Dulal", email: "bhabindulal46@gmail.com", job: "Software Engineer", rate: "1000", isActive: true},
      {id: "2", name: "Ram Karki", email: "ram@gmail.com", job: "Software Engineer", rate: "5000", isActive: true},
      {id: "3", name: "Shyam Dhakal", email: "shyam@gmail.com", job: "Software Engineer", rate: "2000", isActive: false},
    ]
  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="hover">
            {/* row 1 */}
            {clients.map((client) => (
            <tr key={client.id}>
              <th>{client.id}</th>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>{client.rate}</td>
              <td>
              <button className={`btn rounded-full w-20 ${client.isActive ? "btn-primary" : "btn-outline"}`}>
                {client.isActive ? "Active" : "Inactive"}
              </button>
              </td>

              <td>
                <button onClick={()=> handleOpen('edit')} className="btn btn-secondary">Update</button>
              </td>
              <td>
                <button className="btn btn-accent">Delete</button>
              </td>
            </tr>
            ))}
           
    
           
          </tbody>
        </table>
      </div>
    </>
  );
}
