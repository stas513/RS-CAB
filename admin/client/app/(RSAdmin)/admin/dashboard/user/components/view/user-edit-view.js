'use client';

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
// _mock
import { _userList } from '@/_mock';
// components
import { useSettingsContext } from '@/app/(RSAdmin)/admin/common/settings';
import CustomBreadcrumbs from '@/app/(RSAdmin)/admin/common/custom-breadcrumbs';
//
import UserNewEditForm from '../user-new-edit-form';
import { LoadingScreen } from '@/app/(RSAdmin)/admin/common/loading-screen';
import axiosInstance, { endpoints } from '@/app/(RSAdmin)/admin/utils/axios';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const [currentUser, setCurrentUser] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    const { data } = await axiosInstance.get(`${endpoints.admin.getAll}/${id}`)
    setCurrentUser(data)
    setLoading(false)

  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {
        loading ? (
          <LoadingScreen />
        ) : (
          <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
              heading="Edit"
              links={[
                {
                  name: 'Dashboard',
                  href: paths.dashboard.root,
                },
                {
                  name: 'User',
                  href: paths.dashboard.user.root,
                },
                { name: `${currentUser?.firstName} ${currentUser.lastName}` },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />

            <UserNewEditForm currentUser={currentUser} />
          </Container>
        )
      }

    </>

  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
