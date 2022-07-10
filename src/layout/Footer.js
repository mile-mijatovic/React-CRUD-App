import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledFooter = styled("footer")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderTop: "1px solid #e0e0e0",
  padding: "20px 25px",
});

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" color="textSecondary">
        SQA Consulting Locations &copy; {new Date().getFullYear()}
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
