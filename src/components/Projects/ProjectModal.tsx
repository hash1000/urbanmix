import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductForm from './ProjectSteps';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgba(0, 0, 0, 0.87)',
  border: '8px solid #38384A',
  borderRadius: '16px',
  color: 'white',
  boxShadow: 24,
  p:2,
  minWidth:{md:'610px',lg:'690px'} ,
  minHeight:{md:'610px',lg:'530px '},
  overflow: 'hidden'

};

const ProjectModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="medium"
        sx={{
          backgroundColor: '#f528a9 !important',
          border: 0,
          '&:focus': {
            border: '0 !important',
            outline: '0 !important',
          },
        }}
      >
        Add new building
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <ProductForm />
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectModal;
