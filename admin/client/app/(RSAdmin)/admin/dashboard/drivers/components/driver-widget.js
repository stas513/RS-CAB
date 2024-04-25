import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { fNumber } from "@/app/(RSAdmin)/admin/utils/format-number";
import { Divider } from "@mui/material";


export default function DriverWidget({ title, percent, total, sx, ...other }) {

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3.5,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{title}</Typography>
      <Divider orientation="vertical" flexItem sx={{ borderStyle: "dashed" }} />
      <Typography variant="h3">{fNumber(total)}</Typography>
    </Card>
  );
}

DriverWidget.propTypes = {
  percent: PropTypes.number,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
