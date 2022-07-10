import { Controller } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

export default function FormSelect({
  name,
  control,
  options,
  label,
  error,
  helperText,
}) {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl margin="normal" variant="outlined" fullWidth error={error}>
          <InputLabel shrink>{label}</InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            input={<OutlinedInput notched label={label} />}
            onChange={onChange}
            value={value}
          >
            {generateSelectOptions()}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
