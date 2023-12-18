import { Paper } from '@mui/material';
import ApartmentTable from '@/components/ApartmentTable/ApartmentTable';
import BuildingModel from '@/components/BuildingModel/BuildingModel';

import urbanmix from '@/assets/urbanmix.svg';

const Home = () => {
  return (
    <div className="relative w-screen h-screen border-red-500 bg-black">
      <div className="absolute inset-0">
        <img src={urbanmix} alt="alt" className="h-full" />
      </div>
      <div className="absolute inset-40 w-4/5 h-3/5">
        <div className="w-full h-full flex flex-row">
          <div className="w-1/2 h-full">
            <Paper
              elevation={3}
              sx={{ maxHeight: '100%', overflowY: 'scroll' }}
            >
              <ApartmentTable />
              
            </Paper>
          </div>
          <div className="w-1/2 h-full">
            <BuildingModel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
