import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
        404 - Page not found
      </Typography>
      <Typography variant="body1">
        Back to <Link to="/locations">locations list</Link>.
      </Typography>
    </>
  );
};

export default NotFound;
