import Button from "@mui/material/Button";

const ContainedButton = ({ children, ...rest }) => {
  return (
    <Button variant="contained" fullWidth sx={{ mt: 1 }} {...rest}>
      {children}
    </Button>
  );
};

export default ContainedButton;
