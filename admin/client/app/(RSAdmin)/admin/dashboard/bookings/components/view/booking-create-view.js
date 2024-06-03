'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
// components
import { useSettingsContext } from '@/app/(RSAdmin)/admin/common/settings';
import CustomBreadcrumbs from '@/app/(RSAdmin)/admin/common/custom-breadcrumbs';
//

import BookingNewEditForm from '../booking-new-edit-form';

// ----------------------------------------------------------------------

export default function BookingCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Booking"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Bookings',
            href: paths.dashboard.bookings.root,
          },
          { name: 'New Booking' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BookingNewEditForm />
    </Container>
  );
}
