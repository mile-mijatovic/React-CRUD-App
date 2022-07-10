import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProgressSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ProgressSpinner;
