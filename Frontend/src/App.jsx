import NavBar from './components/Navbar'
import TableList from './components/Tablelist'
import ModalForm from './components/ModalForm'
import './App.css'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  
  const handleOpen = (mode)=>{
    setModalMode(mode);
    setIsOpen(true);

  }

  const handleSubmit = ()=>{
    if(modalMode === 'add'){
      console.log("modal Mode add");
    }else{
      console.log("modal mode edit");
    }
  }


  return (
    <>
      <NavBar onOpen={() => handleOpen('add')}/>
      <TableList handleOpen={handleOpen}/>
     <ModalForm isOpen = {isOpen}
      mode={modalMode}
      onSubmit={handleSubmit}
      onClose = {()=>setIsOpen(false)}
      
      />
    </>
  )
}

export default App
