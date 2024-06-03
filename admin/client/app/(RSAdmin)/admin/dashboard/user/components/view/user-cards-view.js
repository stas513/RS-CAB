'use client';

// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// routes
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
// _mock
import { _userCards } from '@/_mock';
// components
import Iconify from '@/app/(RSAdmin)/admin/common/iconify';
import { RouterLink } from '@/app/(RSAdmin)/admin/routes/components';
import { useSettingsContext } from '@/app/(RSAdmin)/admin/common/settings';
import CustomBreadcrumbs from '@/app/(RSAdmin)/admin/common/custom-breadcrumbs';
//
import UserCardList from '../user-card-list';

// ----------------------------------------------------------------------

export default function UserCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="User Cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Cards' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New User
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList users={_userCards} />
    </Container>
  );
}
