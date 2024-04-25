import PropTypes from "prop-types";
import * as Yup from "yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useSnackbar } from "@/app/(RSAdmin)/admin/common/snackbar";
import FormProvider, { RHFSelect, RHFTextField } from "@/app/(RSAdmin)/admin/common/hook-form";
import { CAR_STATUS_OPTIONS } from "@/_mock/_drivers";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";

// ----------------------------------------------------------------------

export default function CarsQuickEditForm({ currentCar, open, onClose, setCurrentCar }) {
  const { enqueueSnackbar } = useSnackbar();

  const CarSchema = Yup.object().shape({
    color: Yup.string(),
    engine: Yup.string(),
    make: Yup.string(),
    model: Yup.string(),
    year: Yup.string(),
    numberPlate: Yup.string().required("Number Plate is required"),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      color: currentCar?.color || "",
      engine: currentCar?.engine || "",
      make: currentCar?.make || "",
      model: currentCar?.model || "",
      year: currentCar?.year || "",
      numberPlate: currentCar?.numberPlate || "",
      status: currentCar?.status || "INACTIVE",
    }),
    [currentCar]
  );

  const methods = useForm({
    resolver: yupResolver(CarSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    try {
      const response = await axios.put(endpoints.cars.update('null', currentCar?.id), formData)

      if (response.status === 200) {
        setCurrentCar(response.data.data)
        enqueueSnackbar("Update success!");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Quick Update</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <RHFSelect name="status" label="Status">
              {CAR_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="color" label="Color" />
            <RHFTextField name="engine" label="Engine" />
            <RHFTextField name="make" label="Make" />
            <RHFTextField name="model" label="Model" />
            <RHFTextField name="year" label="Year" />
            <RHFTextField name="numberPlate" label="Number Plate" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

CarsQuickEditForm.propTypes = {
  currentCar: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  setCurrentCar: PropTypes.func
};
