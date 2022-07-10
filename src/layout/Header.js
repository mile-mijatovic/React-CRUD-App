import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AccountMenu from "../components/Menu";

const Root = styled(Toolbar)({
  justifyContent: "space-between",
  padding: "10px",
});

const Header = () => {
  // Check if user is logged in
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBar position="static">
      <Root>
        <Typography variant="h6" component="h1">
          SQA Consulting Locations
        </Typography>
        {user && <AccountMenu user={user} />}
      </Root>
    </AppBar>
  );
};

export default Header;
