import { Box, Button, Paper } from '@mui/material';
import urbanmix from '@/assets/urbanmix.svg';
import ProjectsTable from '@/components/Projects/ProjectsTable';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ProductForm from '@/components/Projects/ProjectSteps';

const style = {
  position: 'absolute',
  top: { md: '50%', xl: '45%' },
  left: { md: '46%', xl: '38%' },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgba(0, 0, 0, 0.87)',
  border: '8px solid #38384A',
  outline: '1px solid #54EAFF',
  borderRadius: '16px',
  color: 'white',
  boxShadow: 24,
  paddingButtom: { md: 0, lg: 1 },
  minWidth: { md: '600px', lg: '757px' },
  maxHeight: { md: '400px', lg: '676px' },
  overflow: 'hidden',
};

const Projects = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="relative w-screen h-screen border-red-500 bg-black">
      <div className="absolute inset-0">
        <img src={urbanmix} alt="alt" className="h-full" />
      </div>
      <div className="absolute inset-40 w-4/5 h-3/5">
        <div className="w-full h-full flex justify-center flex-row">
          <div className="h-full">
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform:{md:'translate(-50%, -50%)',xl: 'translate(-50%, -45%)'},
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ maxHeight: '100%', display: open ? 'none' : 'block' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <ProjectsTable />

                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    size="medium"
                    sx={{
                      display: open ? 'none' : 'block',
                      backgroundColor: '#f528a9 !important',
                      border: 0,
                      alignSelf: 'center',
                      '&:focus': {
                        border: '0 !important',
                        outline: '0 !important',
                      },
                    }}
                  >
                    Add new building
                  </Button>
                </Box>
              </Box>
            </Box>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ProductForm />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
