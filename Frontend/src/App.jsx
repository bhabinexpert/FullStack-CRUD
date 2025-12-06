import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [searchTerm, setSearchTerm] = useState('')
  const [clientData, setClientData] = useState(null)
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadClients = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get('http://localhost:2025/api/clients')
      setClients(response.data ?? [])
    } catch (err) {
      console.error('Failed to fetch clients', err)
      setError('Failed to fetch clients. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  const handleOpen = (mode, client = null) => {
    setModalMode(mode)
    setClientData(client)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setClientData(null)
  }

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:2025/api/clients', formData)
      } else if (clientData?.id) {
        await axios.put(`http://localhost:2025/api/clients/${clientData.id}`, formData)
      }
      await loadClients()
      handleClose()
    } catch (err) {
      console.error('Failed to save client', err)
      setError('Unable to save client. Please try again.')
    }
  }

  const handleDelete = async (clientId) => {
    if (!clientId) {
      return
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this client?')
    if (!confirmDelete) {
      return
    }
    try {
      await axios.delete(`http://localhost:2025/api/clients/${clientId}`)
      setClients((prev) => prev.filter((client) => client.id !== clientId))
      setError('')
    } catch (err) {
      console.error('Failed to delete client', err)
      setError('Unable to delete client. Please try again.')
    }
  }

  const filteredClients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return clients
    }
    return clients.filter((client) => {
      const name = client.name?.toLowerCase() ?? ''
      const email = client.email?.toLowerCase() ?? ''
      const job = client.job?.toLowerCase() ?? ''
      return name.includes(term) || email.includes(term) || job.includes(term)
    })
  }, [clients, searchTerm])

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList
        clients={filteredClients}
        loading={loading}
        error={error}
        onEdit={(client) => handleOpen('edit', client)}
        onDelete={handleDelete}
      />
      <ModalForm
        isOpen={isOpen}
        mode={modalMode}
        onSubmit={handleSubmit}
        onClose={handleClose}
        clientData={clientData}
      />
    </>
  )
}

export default App
