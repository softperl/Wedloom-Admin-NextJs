// MUI Imports
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import DialogCloseButton from "./DialogCloseButton";

type PermissionDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: string;
  action?: () => void;
};

type EditProps = {
  handleClose: () => void;
  data: string;
};

const AddContent = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <>
      <DialogContent className="overflow-visible pbs-0 sm:pli-16">
        <CustomTextField
          fullWidth
          label="Permission Name"
          variant="outlined"
          placeholder="Enter Permission Name"
          className="mbe-2"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Set as core permission"
        />
      </DialogContent>
      <DialogActions className="flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16">
        <Button type="submit" variant="contained" onClick={handleClose}>
          Create Permission
        </Button>
        <Button
          onClick={handleClose}
          variant="tonal"
          color="secondary"
          className="max-sm:mis-0">
          Discard
        </Button>
      </DialogActions>
    </>
  );
};

const EditContent = ({ handleClose, data }: EditProps) => {
  return (
    <DialogContent className="overflow-visible pbs-0 sm:pli-16">
      <Alert severity="warning" className="mbe-8">
        <AlertTitle>Warning!</AlertTitle>
        By editing the permission name, you might break the system permissions
        functionality. Please ensure you&#39;re absolutely certain before
        proceeding.
      </Alert>
      <div className="flex items-end gap-4 mbe-2">
        <CustomTextField
          fullWidth
          size="small"
          defaultValue={data}
          variant="outlined"
          label="Permission Name"
          placeholder="Enter Permission Name"
        />
        <Button variant="contained" onClick={handleClose}>
          Update
        </Button>
      </div>
      <FormControlLabel control={<Checkbox />} label="Set as core permission" />
    </DialogContent>
  );
};

const PermissionDialog = ({
  open,
  setOpen,
  data,
  action,
}: PermissionDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle
        variant="h4"
        className="flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
        Are you sure?
        <Typography component="span" className="flex flex-col text-center">
          Do you really want to delete these records? This process cannot be
          undone.
        </Typography>
        <div className="flex gap-2 justify-center">
          <Button onClick={action} variant="contained">
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </DialogTitle>
    </Dialog>
  );
};

export default PermissionDialog;
