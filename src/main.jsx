import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";
import "./axiosConfig";
import { getSignInUser } from "./store/actions/AuthAction";
import { LoadLogoAndBanner } from "./store/actions/SettingActions";
import { getSubDomain } from "./utils/functions";
import Toast from "./Components/Toast";
import store from "./store"; // Assuming you have a store export

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiOutlinedInputNotchedOutline: {
      defaultProps: {
        notched: true,
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    whiteSpace: "nowrap !important",
  },
  palette: {
    common: {
      darkGreen: "#33918a",
      lightGreen: "red",
      lightBlack: "#323132",
    },
  },
});

// AppWrapper to handle data loading and initialization
const AppWrapper = () => {
  const dispatch = useDispatch();
  const { logoBannerDataLoaded } = useSelector((state) => state.settings);
  const { serverError } = useSelector(
    (state) => state.socialMediaProfileListReducer
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const subDomain = getSubDomain();
    if (subDomain) dispatch(LoadLogoAndBanner(subDomain));
    if (serverError) toast.error("Check your internet connection");
    else console.log("App connected 🚀");
  }, [dispatch, serverError]);

  useEffect(() => {
    if (user) dispatch(getSignInUser(user.id));
  }, [user, dispatch]);

  const shouldLoad = !getSubDomain() || logoBannerDataLoaded;
  if (!shouldLoad) return null;

  return <App />;
};

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <AppWrapper />
            <ToastContainer />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
