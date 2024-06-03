import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from '@/app/(RSAdmin)/admin/hooks//use-boolean';
// components
import Iconify from '@/app/(RSAdmin)/admin/common/iconify';
import CustomPopover, { usePopover } from '@/app/(RSAdmin)/admin/common/custom-popover';
import { ConfirmDialog } from '@/app/(RSAdmin)/admin/common/custom-dialog';
//

// ----------------------------------------------------------------------

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}) {
  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>

        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={row.firstName} src={row.firstName} sx={{ mr: 2 }} />

          <ListItemText
            primary={`${row.firstName} ${row.lastName}`}
            secondary={row.email}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.email}</TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{row.role}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{(row.createdAt).substring(0, 10)}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>

          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>


      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 200 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete user {row.firstName} {row.lastName}
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />

    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
