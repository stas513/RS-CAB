import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
//
import { HeaderSimple as Header } from '../_common';

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  return (
    <>

        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
    </>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};
