'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
// components
import { useSettingsContext } from '@/app/(RSAdmin)/admin/common/settings';
import CustomBreadcrumbs from '@/app/(RSAdmin)/admin/common/custom-breadcrumbs';
//
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: 'New user' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm />
    </Container>
  );
}
