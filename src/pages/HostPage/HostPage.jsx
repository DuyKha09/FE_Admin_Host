import { useState,useEffect } from 'react'
import './App.css'
import Header from '../../components/Host/Header'
import Home from '../../components/Host/Home'
import Sidebar from '../../components/Host/Sidebar'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from '../../utils/LocalStorage'

function App() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
      const role = LocalStorage.getRole();
      if (role !== "host") {
        navigate("/forbidden");
        LocalStorage.clearToken();
      }
    }, [navigate]);
    
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home />
      </div>
    )
  }
  
  export default App