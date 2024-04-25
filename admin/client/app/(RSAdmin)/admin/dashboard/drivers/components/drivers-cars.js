import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from '@/app/(RSAdmin)/admin/common/iconify';
import SearchNotFound from '@/app/(RSAdmin)/admin/common/search-not-found';
import CarCard from './car-card';
import { useCallback } from 'react';
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
import { useRouter } from '@/app/(RSAdmin)/admin/routes/hook';

export default function DriverCars({
  cars,
  searchCars,
  onSearchCars,
}) {
  const dataFiltered = cars ? applyFilter({
    inputData: [cars],
    query: searchCars,
  }) : [];

  const router = useRouter()


  const handleClick = useCallback(
    (driverId, id) => {
      router.push(paths.dashboard.drivers.carDetail(driverId, id));
    },
    [router]
  );

  const notFound = !dataFiltered.length && !!searchCars;

  return (
    <>
      <Stack
        spacing={2}
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 5 }}
      >
        <Typography variant="h4">Cars</Typography>

        <TextField
          value={searchCars}
          onChange={onSearchCars}
          placeholder="Search car..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: 1, sm: 260 } }}
        />
      </Stack>

      {notFound ? (
        <SearchNotFound query={searchCars} sx={{ mt: 10 }} />
      ) : (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          {dataFiltered.map((car) => (
            <CarCard key={car.id} car={car} handleClick={handleClick} />
          ))}
        </Box>
      )}
    </>
  );
}

DriverCars.propTypes = {
  cars: PropTypes.array,
  onSearchCars: PropTypes.func,
  searchCars: PropTypes.string,
};

function applyFilter({ inputData, query }) {
  if (query) {
    return inputData.filter(
      (car) => car.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
