import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// utils
import { fData } from "@/app/(RSAdmin)/admin/utils/format-number";
// routes
import { paths } from "@/app/(RSAdmin)/admin/routes/paths";
import { useRouter } from "@/app/(RSAdmin)/admin/routes/hook";
// components
import Label from "@/app/(RSAdmin)/admin/common/label";
import { useSnackbar } from "@/app/(RSAdmin)/admin/common/snackbar";
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "@/app/(RSAdmin)/admin/common/hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import {
  DRIVER_STATUS_OPTIONS,
  DRIVER_SUBSCRIPTION_OPTIONS,
} from "@/_mock/_drivers";
import { MenuItem } from "@mui/material";
import { endpoints } from "../../../utils/axios";
import axios from "axios";

// ----------------------------------------------------------------------

export default function DriversNewEditForm({ currentUser }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phoneNumber: Yup.string().required("Phone number is required"),
    driverRecognitionNumber: Yup.string().required(
      "Driver Recognition Number is required"
    ),
    nationalInsuranceNumber: Yup.string().required(
      "National Insurance Number is required"
    ),
    selfAssesmentTaxId: Yup.string().required(
      "Self Assessment Tax ID is required"
    ),
    dateOfBirth: Yup.date().max(
      new Date(),
      "Date of Birth cannot be in the future"
    ),
    ratings: Yup.number()
      .min(0)
      .max(5, "Ratings must be between 0 and 5")
      .required("Ratings is required"),
    totalJobComplete: Yup.number()
      .min(0)
      .integer()
      .required("Total Job Complete is required"),
    bio: Yup.string().required("Bio is required"),
    hobby: Yup.string().required("Hobby is required"),
    depositePaid: Yup.boolean().required("Deposit Paid is required"),
    depositeAmount: Yup.number().min(0).required("Deposit Amount is required"),
    commision: Yup.number().min(0).required("Commission is required"),
    currentBalance: Yup.number().min(0).required("Current Balance is required"),
    subcription: Yup.string().required("Subscription is required"),
    status: Yup.string().required("Status is required"),
  });


  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.userInfo?.firstName || "",
      lastName: currentUser?.userInfo?.lastName || "",
      email: currentUser?.userInfo?.email || "",
      phoneNumber: currentUser?.userInfo?.phoneNumber || "",
      driverRecognitionNumber: currentUser?.driverRecognitionNumber || "",
      nationalInsuranceNumber: currentUser?.nationalInsuranceNumber || "",
      selfAssesmentTaxId: currentUser?.selfAssesmentTaxId || "",
      dateOfBirth: currentUser?.dateOfBirth || null,
      profileImage: currentUser?.profileImage || null,
      ratings: currentUser?.ratings || 0,
      totalJobComplete: currentUser?.totalJobComplete || 0,
      bio: currentUser?.bio || "",
      hobby: currentUser?.hobby || "",
      depositePaid: currentUser?.depositePaid || false,
      depositeAmount: currentUser?.depositeAmount || 0,
      commision: currentUser?.commision || 0,
      currentBalance: currentUser?.currentBalance || 0,
      subcription: currentUser?.subcription || "",
      status: currentUser?.status || "",
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === 'dateOfBirth' && data[key]) {
        // Convert the date to ISO-8601 format before appending
        const formattedDate = new Date(data[key]).toISOString();
        formData.append(key, formattedDate);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.put(endpoints.drivers.update(currentUser.id), formData)

      if (response.status === 200) {
        enqueueSnackbar("Update success!");
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      // if (file) {
      //   setValue("profileImage", newFile, { shouldValidate: true });
      // }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === "ACTIVE" && "success") ||
                  (values.status === "SUSPEND" && "error") ||
                  "warning"
                }
                sx={{ position: "absolute", top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}
            {/* 
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profileImage"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.disabled",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box> */}
            <RHFSelect name="status" label="Status" sx={{ mb: 3 }}>
              {DRIVER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="subcription" label="Subcription" sx={{ mb: 3 }}>
              {DRIVER_SUBSCRIPTION_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFSwitch
              name="depositePaid"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Deposite Paid
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField
                name="nationalInsuranceNumber"
                label="National Insurance Number"
              />
              <RHFTextField
                name="driverRecognitionNumber"
                label="Driver Recognition Number"
              />
              <RHFTextField
                name="selfAssesmentTaxId"
                label="Self Assesment Tax Id"
              />
              <RHFTextField
                name="totalJobComplete"
                label="Total Job Complete"
              />
              <RHFTextField name="bio" label="Bio" />
              <RHFTextField name="hobby" label="Hobby" />
              <RHFTextField name="depositeAmount" label="Deposite Amount" />
              <RHFTextField name="commision" label="Commision" />
              <RHFTextField name="currentBalance" label="Current Balance" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentUser ? "Create User" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

DriversNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
