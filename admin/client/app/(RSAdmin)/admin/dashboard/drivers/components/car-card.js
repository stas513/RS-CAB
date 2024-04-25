import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import Image from '@/app/(RSAdmin)/admin/common/image';

export default function CarCard({ car, handleClick }) {
  const theme = useTheme();

  const {
    name,
    coverUrl,
    model,
    driverId,
    id
  } = car;



  return (
    <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleClick(driverId, id)}>
      <Box sx={{ position: 'relative' }}>

        <Image
          src={coverUrl}
          alt={coverUrl}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>

      <ListItemText
        sx={{ my: 3 }}
        primary={name}
        secondary={`Model: ${model}`}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />


    </Card>
  );
}

CarCard.propTypes = {
  car: PropTypes.object,
  handleClick: PropTypes.func
};
