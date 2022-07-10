import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import { styled } from "@mui/material/styles";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Main = styled("main")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

export default function MainLayout() {
  return (
    <Root>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Root>
  );
}
