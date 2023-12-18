import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { AppContextProvider } from '@/shared/context/AppContextProvider';
import { CircularProgress, MenuItem, Select } from '@mui/material';

export default function BasicTable() {
  const { apartmentData, setApartmentData, updateApartmentsDB } =
    useContext(AppContextProvider);
  if (!apartmentData) return <CircularProgress />;
  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ maxWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Apartment</TableCell>
            <TableCell align="center">Floor</TableCell>
            <TableCell align="center">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apartmentData.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: row.highlighted ? '#eeeeee' : '',
              }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.name.split(' ')[1][0]}</TableCell>
              <TableCell align="center">
                <Select
                  size="small"
                  id="demo-simple-select"
                  value={row.state || 0}
                  label="Age"
                  onChange={(e) => {
                    const newData = apartmentData.map((apartment) => {
                      if (apartment.name === row.name) {
                        return {
                          ...apartment,
                          state: e.target.value as number,
                        };
                      }
                      return apartment;
                    });
                    setApartmentData(newData);
                    updateApartmentsDB(newData);
                  }}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>Inspect</MenuItem>
                  <MenuItem value={2}>Construct</MenuItem>
                  <MenuItem value={3}>Lease</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
