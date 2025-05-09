import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { useDispatch } from "react-redux";
import Spinner from "../../Components/Spinner";

import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  makeStyles,
  useTheme,
  withStyles,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { linkSocialPlatform } from "store/actions/CustomersAction";
import { toast } from "react-toastify";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

const ConnectToSocial = () => {
  const useStyles = makeStyles((theme) => styles(theme));
  const classes = useStyles();
  // const { accessToken } = useSelector((state) => state.social);
  const dispatch = useDispatch();

  const [platformData, setPlatFormData] = useState("");

  // const [platformData, setPlatFormData] = useState({});
  const [account, setAccount] = useState("");
  const [linkingFacebook, setLinkingFacebook] = useState(true);

  /**
   *
   * @param {{access_token: string,
   * name: string,
   * id: string,
   * userID: string,
   * expiresIn: number,
   * accessToken: string,
   * signedRequest: string,
   * graphDomain: string,
   * data_access_expiration_time: number
   * }} authResponse
   */
  const handleLinkSocial = async (authResponse) => {
    try {
      await dispatch(linkSocialPlatform(authResponse.accessToken));
      await getIntegratedData("facebook");
      toast.success("Account linked successfully");
      setLinkingFacebook(false);
    } catch (error) {
      console.log(error);
      toast.error("Error while linking account");
      setLinkingFacebook(false);
    }
  };

  const getIntegratedData = async (platform) => {
    try {
      const data = await axios.get(`/integration/${platform}/details`);
      setPlatFormData(data?.data?.platformDetails);
      // set default instagram account
      setAccount(data?.data?.platformDetails?.instagram?.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlinkSocial = async (platform) => {
    try {
      await axios.delete(`/integration/${platform}/unlink`);
      setPlatFormData(undefined);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? error?.message);
    }
  };

  const selectDefaultSocial = async (platform) => {
    if (!account) return toast.error("Please select an account.");
    await axios.put(`/integration/${platform}/default_account`, {
      accountId: account,
    });
  };

  useEffect(() => {
    (async () => {
      await getIntegratedData("facebook");
      setLinkingFacebook(false);
    })();
  }, []);

  return (
    <Box className={classes.box}>
      <div className={classes.flexRow}>
        <Typography variant="h2" className={classes.heading}>
          Connect Facebook™ & Instagram™
        </Typography>
        <Tooltip title="Open Guide">
          <a href="/help" target="_blank" className={classes.iconContainer}>
            <HelpIcon />
          </a>
        </Tooltip>
      </div>
      <Typography className={classes.text}>
        The Post Automator and Social Listening require a connection to function
        properly.
      </Typography>
      <Typography className={classes.subHeading}>
        1. Link Facebook™ account
      </Typography>
      {!platformData && (
        <Typography className={classes.text}>
          Please connect a valid and active Facebook™ account.
        </Typography>
      )}

      {platformData ? (
        <div className={classes.flexColumn}>
          <StyledButton onClick={() => handleUnlinkSocial("facebook")}>
            Unlink Facebook™
          </StyledButton>
          <Typography className={classes.subHeading}>
            2. Link Instagram™ account
          </Typography>
          <div className={classes.selectContainer}>
            <Select
              className={classes.selectField}
              id="demo-simple-select"
              value={account}
              label="Age"
              onChange={(e) => {
                setAccount(e.target.value);
              }}
            >
              {platformData?.instagram?.other_instagrams.map((p) => (
                <MenuItem value={p.id} key={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <StyledButton onClick={() => selectDefaultSocial("instagram")}>
            Update Instagram™
          </StyledButton>
        </div>
      ) : (
        <FacebookLogin
          autoLoad={false}
          appId={process.env.REACT_APP_ID}
          version={process.env.REACT_APP_VERSION}
          scope="pages_show_list,business_management,instagram_basic,instagram_manage_insights,pages_read_engagement,email"
          render={(renderProps) => (
            <StyledButton
              disabled={linkingFacebook}
              onClick={(e) => {
                setLinkingFacebook(true);
                renderProps.onClick(e);
              }}
            >
              {linkingFacebook && (
                <div className={classes.relative}>
                  <Spinner />
                </div>
              )}
              Connect Facebook™
            </StyledButton>
          )}
          callback={handleLinkSocial}
          onFailure={(error) => {
            console.log({ error });
            toast.error("Failed to connect to Facebook");
            setLinkingFacebook(false);
          }}
        />
      )}
    </Box>
  );
};

export default ConnectToSocial;

const StyledButton = withStyles((theme) => ({
  root: {
    color: "white",
    margin: "1rem 0",
    backgroundColor: "#f8c144",
    fontSize: "0.875rem",
    minWidth: "64px",
    maxWidth: "190px",
    boxSizing: "border-box",
    fontFamily: "Raleway",
    fontWeight: 900,
    lineHeight: "0.875rem",
    borderRadius: "5px",
    letterSpacing: "0.02857em",
    textTransform: "unset",
    padding: "13px 24px",
    boxShadow: "unset",
    "&:hover": {
      backgroundColor: "#f8c144",
      transform: "scale(1.03)",
    },
  },
}))(Button);
