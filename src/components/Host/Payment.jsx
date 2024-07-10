import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import Header from '../Host/Header';
import Sidebar from '../Host/Sidebar';
import Footer from '../Host/Footer';  // Assuming you have a Footer component
import payment from "../../assets/payment.jpg"; 
import background from "../../assets/background.jpg"; // Import the background image

const Payment = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />
      <Sidebar />
      <div style={mainStyle}>
        <div style={contentStyle}>
          <Typography variant="h3" component="h1" style={titleStyle}>
            Welcome to Fur Ever Friend Payment
          </Typography>
          <Typography variant="h5" component="h2" style={subtitleStyle}>
            Fast and secure money transfers at your fingertips
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen} style={buttonStyle}>
            Chuyển tiền ngay
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box style={modalStyle}>
            <Typography variant="h6" id="modal-title">
              Scan the QR code
            </Typography>
            <img src={payment} alt="QR Code" style={{ width: '256px', height: '256px', margin: '20px 0' }} />
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              style={{ marginTop: '20px' }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  textAlign: 'center',
  padding: '0 20px',
};

const contentStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  maxWidth: '500px',
  width: '100%',
};

const titleStyle = {
  marginBottom: '20px',
  color: '#333',
  fontWeight: 'bold',
};

const subtitleStyle = {
  marginBottom: '40px',
  color: '#555',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  boxShadow: 24,
  padding: '16px 32px 24px',
  textAlign: 'center',
  borderRadius: '10px',
};

export default Payment;




// function Payment() {
//     return (
//         <>
//             <Header />
//             <Sidebar />
//             <main id="main" className="main" style={{backgroundColor:"#f6f9ff"}}>
//                 <div className="pagetitle">
//                     <h1>Mã QR thanh toán</h1>
//                 </div>
//                 <section className="section dashboard">
//                     <div className="d-flex justify-content-center align-items-center">
//                         <img src="/assets/admin/img/payment.jpg" alt=""/>
//                     </div>
//                 </section>
//             </main>
//             <Footer />
//         </>
//     )
// }

// export default Payment;
