import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
import { useRouter } from '@/app/(RSAdmin)/admin/routes/hook';
import { useSnackbar } from '@/app/(RSAdmin)/admin/common/snackbar';
import FormProvider from '@/app/(RSAdmin)/admin/common/hook-form';
import axiosInstance, { endpoints } from '@/app/(RSAdmin)/admin/utils/axios';
import { Grid } from '@mui/material';
import { RHFAutocomplete, RHFTextField } from '@/app/(RSAdmin)/admin/common/hook-form';

const roles = ["ADMIN", "STAFF", "ACCOUNTANT"]
export default function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string(),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: !currentUser ? Yup.string().required('Password is required') : Yup.string(),
    role: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      role: currentUser?.role || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      password: currentUser?.password || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    console.log('triggered')
    if (!currentUser) {
      try {
        const response = await axiosInstance.post(endpoints.admin.register, data)
        if (response.status === 201) {
          enqueueSnackbar('Create success!');
          reset();
          router.push(paths.dashboard.user.list);
        }
      }
      catch (error) {
        console.log(error)
        enqueueSnackbar(error.message, { variant: "error" });
      }

    }
    else {
      try {
        delete data.password
        const response = await axiosInstance.put(`${endpoints.admin.getAll}/${currentUser.id}`, data)
        if (response.status === 200) {
          enqueueSnackbar('Updated success!');
          router.push(paths.dashboard.user.list);
        }
      }
      catch (error) {
        console.log(error)
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }

  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent={'center'}>

        <Grid xs={12} md={10}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="firstName" label="First Name" />
                <RHFTextField name="lastName" label="Last Name" />
              </Box>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="email" label="Email Address" disabled={currentUser ? true : false} />
                <RHFTextField name="phoneNumber" label="Phone Number" />
              </Box>

              {
                !currentUser ? (
                  <RHFTextField name="password" label="Password" disabled={currentUser ? true : false} />
                ) : null
              }
              <RHFAutocomplete
                name="role"
                label="Role"
                options={roles}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {

                  if (!option) {
                    return null;
                  }

                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
