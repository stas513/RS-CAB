import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import { fDate } from "@/app/(RSAdmin)/admin/utils/format-time";

export default function CarDetailsInfo({ carDetail }) {
  const renderCarDetails = (
    <Card>
      <CardHeader title="Details" />
      <Stack spacing={1.5} sx={{ p: 3, typography: "body2" }}>
        <Stack direction="row" alignItems="center">
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
          >
            Color
          </Box>
          {carDetail.color}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
          >
            Engine
          </Box>
          {carDetail.engine}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
          >
            Make
          </Box>

          {carDetail.make}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
          >
            model
          </Box>

          {carDetail.model}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
          >
            Year
          </Box>

          {carDetail.year}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 120, flexShrink: 0 }}
          >
            Number Plate
          </Box>

          {carDetail.numberPlate}
        </Stack>
      </Stack>
    </Card>
  );


  const doc = (
    <Card>
      <CardHeader title="Legal information" />
      <Stack spacing={1.5} sx={{ p: 3, typography: "body2" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            MOT pass date
          </Box>
          {fDate(carDetail?.carDocument?.motPassDate)}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            Insurence expiry date
          </Box>
          {fDate(carDetail?.carDocument?.insurenceExpiryDate)}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            component="span"
            sx={{ color: "text.secondary", width: 150, flexShrink: 0 }}
          >
            PCO Licence expiry date
          </Box>
          {fDate(carDetail?.carDocument?.pcoVehicleLicenceExpiryDate)}
        </Stack>
      </Stack>
    </Card>
  );

  return <Stack spacing={3}>
    {renderCarDetails}
    {doc}
  </Stack>;
}

CarDetailsInfo.propTypes = {
  carDetail: PropTypes.object,
};
