import { forwardRef } from "react";
import TextField from "@mui/material/TextField";

const Input = forwardRef((props, ref) => (
  <TextField
    variant="outlined"
    margin="normal"
    ref={ref}
    fullWidth
    InputLabelProps={{
      shrink: true,
    }}
    {...props}
  />
));

export default Input;
