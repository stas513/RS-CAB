import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { RouterLink } from "@/app/(RSAdmin)/admin/routes/components";
import Label from "@/app/(RSAdmin)/admin/common/label";
import Iconify from "@/app/(RSAdmin)/admin/common/iconify";
import CarsQuickEditForm from "./car-quick-edit-form";
import { useBoolean } from "@/app/(RSAdmin)/admin/hooks/use-boolean";

export default function CarDetailsToolbar({ backLink, car, setCurrentCar }) {
  const quickEdit = useBoolean();

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: "column", md: "row" }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={RouterLink} href={backLink}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4">
                {`${car.model?.charAt(0).toUpperCase()}${car.model
                  ?.substr(1)
                  .toLowerCase()}`}
              </Typography>
              <Label
                variant="soft"
                color={
                  (car.status === "ACTIVE" && "success") ||
                  (car.status === "INACTIVE" && "error") ||
                  "default"
                }
              >
                {car.status}
              </Label>
            </Stack>
          </Stack>
        </Stack>

        <CarsQuickEditForm
          currentCar={car}
          open={quickEdit.value}
          onClose={quickEdit.onFalse}
          setCurrentCar={setCurrentCar}
        />

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            color="inherit"
            variant="contained"
            startIcon={
              <Iconify icon="solar:pen-bold" />
            }
            onClick={quickEdit.onTrue}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

CarDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  car: PropTypes.object,
  setCurrentCar: PropTypes.func
};
