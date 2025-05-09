// imports the React Javascript Library
import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@mui/material";
//Card
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

import Fab from "@mui/material/Fab";

import red from "@mui/material/colors/red";
import blue from "@mui/material/colors/blue";

import Icon from "@mui/material/Icon";
import PageviewIcon from "@mui/icons-material/Pageview";
import SearchIcon from "@mui/icons-material/Search";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CollectionsIcon from "@mui/icons-material/Collections";

//Tabs
import { withStyles } from "@mui/material/styles";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: 10,
  },
  uploadImgCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: 250,
    boxShadow: "none",
    backgroundColor: "transparent",
    borderColor: "rgba(0, 0, 0, 0.23)",
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800],
    },
  },
  uploadContainer: {
    width: "100%",
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white",
  },
  input: {
    opacity: 0,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center",
  },
  button: {
    color: "#F8C144",
    margin: 10,
    background: "rgba(248, 193, 68, 0.2) !important",
  },
  secondaryButton: {
    color: "gray",
    margin: 10,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "default",
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  cancleIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    background: "#000",
    color: "#fff",
    borderRadius: "50%",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },

  UploadBtn: {
    display: "flex",
    alignItems: "center",
  },
  uploadedImg: {
    objectFit: "contain",
    maxHeight: "250px",
  },
});

const ImageUploadCard = (props) => {
  const [state, setState] = useState({
    mainState: "initial",
    selectedFile: null,
    imgPreview: "",
    id: props.id,
    defaultImg: null,
  });

  /* handlig default image on  update*/
  useEffect(() => {
    setState({
      ...state,
      imgPreview: props.defaultImg,
      mainState: props.defaultImg ? "uploaded" : "initial",
      defaultImg: props.defaultImg,
    });
  }, [props.defaultImg]);

  /* handling image on creating new customer*/
  useEffect(() => {
    if (props.refresh == true) {
      props.setRefreshImgUploadComponent(false);

      setState({
        ...state,
        imgPreview: "",
        mainState: "initial",
        defaultImg: "",
      });
    }
  }, [props.refresh]);

  const handleUploadClick = (event) => {
    var file = event.target.files[0];

    const reader = new FileReader();

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else return
    reader.onloadend = function (e) {
      setState({
        ...state,
        mainState: "uploaded",
        selectedFile: event.target.files[0],
        imageUploaded: 1,
        imgPreview: [reader.result],
      });
    };

    /* passing file to parent component by calling parent method */
    props.getSelectedData(event.target.files[0]);
  };

  const renderInitialState = () => {
    const { classes, theme } = props;
    const { value } = state;

    return (
      <React.Fragment>
        <CardContent>
          <Grid container justifyContent="center" alignItems="center">
            <input
              id={props.id}
              accept="image/*"
              className={classes.input}
              name={props.name}
              multiple
              type="file"
              onChange={handleUploadClick}
            />

            <label className={classes.UploadBtn} htmlFor={props.id}>
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
              <Typography variant="h6">{props.title}</Typography>
            </label>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  };

  const renderUploadedState = () => {
    const { classes, theme, previewImg, defaultImg } = props;

    return (
      <React.Fragment>
        <CardActionArea style={{ display: "flex", height: "100%" }}>
          <input
            id={props.id}
            accept="image/*"
            className={classes.input}
            name={props.name}
            multiple
            type="file"
            onChange={handleUploadClick}
          />
          <img className={classes.uploadedImg} src={state.imgPreview} alt="" />
          {/* <CloseIcon
            onClick={imageResetHandler}
            fontSize="default"
            className={classes.cancleIcon}
          /> */}
        </CardActionArea>
      </React.Fragment>
    );
  };

  const imageResetHandler = (event) => {
    setState({
      ...state,
      mainState: "initial",
      selectedFile: null,
      imgPreview: "",
      // defaultImg: "",
      imageUploaded: 0,
    });

    /* passing file to parent component by calling parent method */
    props.getSelectedData(null);
  };

  const { classes, theme } = props;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Card className={classes.uploadImgCard}>
          {(state.mainState == "initial" && renderInitialState()) ||
            (state.mainState == "uploaded" && renderUploadedState())}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
