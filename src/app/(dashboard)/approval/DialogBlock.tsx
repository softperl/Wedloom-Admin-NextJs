// MUI Imports
import CustomTextField from "@/@core/components/mui/TextField";
import DialogCloseButton from "@/components/dialogs/DialogCloseButton";
import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";

// Component Imports

type FormValues = {
  blockReason: string;
};
const DialogBlock = ({
  open,
  setOpen,
  handleClose,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}) => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { blockReason: "" },
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}>
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className="tabler-x" />
        </DialogCloseButton>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogContent className="overflow-visible pbs-0 px-10 pt-10 sm:pli-10 sm:pbs-10 sm:pbe-10 min-w-[35rem]">
            <CustomTextField
              fullWidth
              multiline
              rows={4}
              label="Block Reason"
              placeholder="Block Reason"
              {...(errors.blockReason && {
                error: true,
                helperText: "This field is required.",
              })}
            />
          </DialogContent>
          <DialogActions className="justify-center pb-6">
            <Button variant="contained" type="submit" onClick={handleClose}>
              Block
            </Button>
            <Button
              variant="tonal"
              type="reset"
              color="secondary"
              onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default DialogBlock;
