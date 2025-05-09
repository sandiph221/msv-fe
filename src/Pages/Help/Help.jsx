import {
  Grid,
  makeStyles,
  TextField,
  Typography,
  withStyles,
  InputAdornment,
  Avatar,
  ListItem,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardActions,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import styles from "./Styles";
import SearchIcon from "@mui/icons-material/Search";
import HelpSectionList from "../../Components/HelpSectionList/HelpSectionList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as constant from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Components/Sidebar";
import Buttons from "../../Components/Buttons/Buttons";
import CkEditor from "../../Components/CkEditor/CkEditor";
import {
  createArticle,
  getFaqList,
  getHelpVideoList,
  getHowToDocList,
  getSectionList,
  updateArticle,
  setSearchQuery,
  clearSearchArticle,
  deleteArticle,
} from "../../store/actions/HelpPageAction";
import JoditEditor from "jodit-react";
import AddModalForm from "../../Components/AddModalForm/AddModalForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Container } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import Spinner from "../../Components/Spinner";
import InfoIcon from "@mui/icons-material/Info";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { HelpPageArticle } from "../../Components/HelpPageArticle/HelpPageArticle";
import { withRouter } from "react-router-dom";
import { HelpPageBannerSection } from "../../Components/HelpPageBannerSection/HelpPageBannerSection";
import parse from "html-react-parser";
import { CardContent } from "@mui/material";
import { deleteConfirmation } from "../../utils/functions";

/* styled component starts */
const StyledTextField = withStyles({
  root: {
    color: "#000",
    marginTop: constant.SUPER_ADMIN_NAME ? 0 : 20,
    marginBottom: constant.SUPER_ADMIN_NAME ? 0 : 20,
    width: constant.SUPER_ADMIN_NAME ? "100%" : 520,
    height: 65,
    "& .MuiOutlinedInput-root": {
      "& input": {
        zIndex: 9999,
      },
      "& fieldset": {
        borderRadius: 12,
        backgroundColor: (props) =>
          props.backgroundColor ? "#fff" : "transparent",
      },
    },
  },
})(TextField);

const StyledTextFieldForm = withStyles({
  root: {
    width: "100%",
    borderRadius: 15,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 12,
      },
    },
  },
})(TextField);

const StyledAccordion = withStyles({
  root: {
    width: "100%",
  },
})(Accordion);

const useStyles = makeStyles((theme) => styles(theme));

const Help = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [article, setArticle] = useState({
    section: "",
    title: "",
    body: "",
  });
  const [editInfo, setEditInfo] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [errors, setErrors] = React.useState({});
  const { user } = useSelector((state) => state.auth);
  const {
    sectionList,
    faqList,
    faqListLoader,
    howToDocList,
    howToDocListLoader,
    videoList,
    videoListLoader,
    searchQuery,
  } = useSelector((state) => state.helpReducer);

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, []);

  const handleSearch = (event) => {
    if (event.target.value === "") {
      dispatch(clearSearchArticle());
    }
    // searching articles section
    dispatch(setSearchQuery(event.target.value));
  };

  const handleChange = (event) => {
    setArticle((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const getArticles = (article) => {
    // getting article details from child component
    setArticle((prevState) => ({
      ...prevState,
      body: article,
    }));
  };

  const submitArticle = async () => {
    // on submitting articles

    let formErrors = {};

    // Check for empty value

    if (!article.section) {
      formErrors.section = "Field is required";
    }

    if (!article.title) {
      formErrors.title = "Title is required";
    }
    if (!article.title) {
      formErrors.body = "Field is required";
    }
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setFormLoader(true);
      if (Object.keys(editInfo).length === 0) {
        try {
          const response = await dispatch(createArticle(article));
          if (response.data.status_code === 200) {
            setFormLoader(false);
            setErrors({});
            setArticle({
              section: "",
              title: "",
              body: "",
            });
          }
        } catch (error) {
          if (error) {
            setFormLoader(false);
          }
        }
      } else {
        try {
          const response = await dispatch(
            updateArticle({
              ...article,
              id: editInfo.id,
            })
          );
          if (response.data.status_code === 200) {
            setFormLoader(false);
            setErrors({});
            setArticle({
              section: "",
              title: "",
              body: "",
            });
            setEditInfo({});
          }
        } catch (error) {
          if (error) {
            setFormLoader(false);
          }
        }
      }
    }
  };

  const fetchArticlesFromApi = () => {
    if (article.section === "faq") {
      dispatch(getFaqList());
    }
    if (article.section === "documentation") {
      dispatch(getHowToDocList());
    }

    if (article.section === "videos") {
      dispatch(getHelpVideoList());
    }
  };

  useEffect(() => {
    //get articles list
    setErrors({});
    setEditInfo({});
    setArticle((prevState) => ({
      ...prevState,
      title: "",
      body: "",
    }));
    if (user && user.role === constant.SUPER_ADMIN_NAME) {
      fetchArticlesFromApi();
    }
  }, [article.section]);

  const accordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = () => {
    dispatch(deleteArticle({ ...article, ...editInfo }));
    setEditInfo({});
    setArticle({ section: article.section });

    fetchArticlesFromApi();
  };

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    toolbarButtonSize: "big",
    uploader: { insertImageAsBase64URI: true },
  };

  useEffect(() => {
    if (editInfo !== {}) {
      setArticle((prevState) => ({
        ...prevState,
        title: editInfo.title,
        body: editInfo.description,
      }));
    }
  }, [editInfo]);

  const handleCancel = () => {
    // reseting form
    setArticle({
      section: "",
      title: "",
      body: "",
    });
    setEditInfo({});
  };

  const menuProps = {
    borderRadius: "12px",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
      borderRadius: 12,
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  return (
    <Layout>
      <Grid className={classes.row} container>
        {user && user.role !== constant.SUPER_ADMIN_NAME ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <HelpPageBannerSection
              searchQuery={searchQuery}
              handleKeyPress={() => history.push("/help/faq")}
              handleSearch={handleSearch}
            />
            <Container style={{ marginTop: 100, marginBottom: 60 }}>
              {/* <HelpSectionList sectionList={sectionList}/> */}
              <Grid container spacing={2}>
                <Grid item sm={12} md={6} style={{ width: "100%" }}>
                  <div
                    className={classes.helpList}
                    onClick={() => history.push("/help/faq")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className={classes.helpIconList}
                        style={{ backgroundColor: "#ff91571a" }}
                      >
                        <HelpIcon style={{ color: "#ff9157", fontSize: 21 }} />
                      </div>
                      <p> FAQs </p>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={12} md={6} style={{ width: "100%" }}>
                  <div
                    className={classes.helpList}
                    onClick={() => history.push("/help/how-to-document")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className={classes.helpIconList}
                        style={{ backgroundColor: "#19a96e1a" }}
                      >
                        <InfoIcon style={{ color: "#19a96e" }} />
                      </div>
                      <p> How to Documents? </p>
                    </div>
                  </div>
                </Grid>
                <Grid item sm={12} md={6} style={{ width: "100%" }}>
                  <AddModalForm />
                </Grid>
                <Grid item sm={12} md={6} style={{ width: "100%" }}>
                  <div
                    className={classes.helpList}
                    onClick={() => history.push("/help/videos")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className={classes.helpIconList}
                        style={{ backgroundColor: "#ff00001a" }}
                      >
                        <YouTubeIcon style={{ color: "#ff0000" }} />
                      </div>
                      <p> Help videos </p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        ) : (
          <div>
            <Grid container>
              <Grid xl={3} lg={4} md={5} sm={12} xs={12} item>
                <Grid className={classes.sidebar}>
                  <div className={classes.asideTop}>
                    <div className={classes.userContainer}>
                      <Typography className={classes.userType}>
                        <strong>Help Center</strong>
                      </Typography>
                      {/* <AddModalForm /> */}
                    </div>
                    <StyledTextField
                      fullWidth
                      className={classes.textField}
                      hinttext="Search by Name"
                      variant="outlined"
                      placeholder="Search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon style={{ color: "#323132" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <List>
                    {article && article.section === "faq" ? (
                      faqListLoader ? (
                        <Spinner size={24} />
                      ) : faqList ? (
                        faqList.map((item, index) => (
                          <ListItem key={index}>
                            <Card className={classes.articleCard}>
                              <CardContent>
                                <Typography> {item.title} </Typography>
                              </CardContent>
                              <CardActions>
                                <CreateIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setEditInfo(item)}
                                />
                              </CardActions>
                            </Card>
                          </ListItem>
                        ))
                      ) : (
                        ""
                      )
                    ) : article.section === "documentation" ? (
                      howToDocListLoader ? (
                        <Spinner size={24} />
                      ) : howToDocList ? (
                        howToDocList.map((item, index) => (
                          <ListItem key={index}>
                            <Card className={classes.articleCard}>
                              <CardContent>
                                <Typography> {item.title} </Typography>
                              </CardContent>
                              <CardActions>
                                <CreateIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setEditInfo(item)}
                                />
                              </CardActions>
                            </Card>
                          </ListItem>
                        ))
                      ) : (
                        ""
                      )
                    ) : article.section === "videos" ? (
                      videoListLoader ? (
                        <Spinner size={24} />
                      ) : videoList ? (
                        videoList.map((item, index) => (
                          <ListItem key={index}>
                            <Card className={classes.articleCard}>
                              <CardContent>
                                <Typography> {item.title} </Typography>
                              </CardContent>
                              <CardActions>
                                <CreateIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setEditInfo(item)}
                                />
                              </CardActions>
                            </Card>
                          </ListItem>
                        ))
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    <ListItem>
                      {/* getCustomersLoading && <div className={classes.userItem}></div> */}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid
                className={classes.formContainer}
                xl={9}
                lg={8}
                md={7}
                sm={12}
                xs={12}
                item
                spacing={2}
              >
                {Object.keys(editInfo).length === 0 ? (
                  <Typography className={classes.userType}>
                    <strong>New Article</strong>
                  </Typography>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography className={classes.userType}>
                      <strong>Update Article</strong>
                    </Typography>
                    <Buttons
                      onClick={() =>
                        deleteConfirmation(
                          "Are you sure?",
                          "You are about to delete this article."
                        ).then((isConfirm) => {
                          if (isConfirm) {
                            handleDelete();
                          }
                        })
                      }
                      style={{
                        backgroundColor: "#F44336",
                        borderColor: "#F44336",
                        color: "#fff",
                      }}
                    >
                      Delete Article
                    </Buttons>
                    {/* <Alert
                  alert={itemToDelete}
                  icon={
                    <ErrorOutlineIcon
                      style={{
                        fontSize: "5rem",
                        color: "#f50057",
                        paddingBottom: 0,
                      }}
                    />
                  }
                  title="Are you sure?"
                  confirmBtn="DELETE"
                  description="You're about to Delete the profile. This process cannot be undone."
                  open={deleteAlertOpen}
                  setOpen={setDeleteAlertOpen}
                  onConfirm={handleDelete}
                /> */}
                  </div>
                )}

                <form container style={{ marginTop: "20px" }}>
                  {" "}
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl style={{ width: "100%" }} variant="outlined">
                        <Select
                          style={{
                            width: "100%",
                            borderRadius: 12,
                            color: "rgba(0, 0, 0, 0.5)",
                          }}
                          aria-label="role"
                          name="section"
                          value={article.section ? article.section : ""}
                          onChange={handleChange}
                          MenuProps={menuProps}
                          displayEmpty
                          defaultValue="customer-admin"
                        >
                          <MenuItem value="" disabled>
                            Choose section
                          </MenuItem>

                          <MenuItem value="faq">FAQ</MenuItem>
                          <MenuItem value="documentation">
                            Documentation
                          </MenuItem>
                          <MenuItem value="videos">Video</MenuItem>
                        </Select>
                        {/* {errors.role ? 
                          <FormHelperText className={classes.errorHelperText}>User Role is Required</FormHelperText>
                        : ''
                        } */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextFieldForm
                        className={classes.inputField}
                        type="text"
                        id="title"
                        label="Title*"
                        variant="outlined"
                        name="title"
                        title="Title"
                        value={article.title}
                        onChange={handleChange}
                        error={errors.title ? true : false}
                        helperText={errors && errors.title}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <JoditEditor
                        id="text-editor"
                        ref={editor}
                        value={article.body}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) =>
                          setArticle((prevState) => ({
                            ...prevState,
                            body: newContent,
                          }))
                        } // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                      />
                      <Typography className={classes.imgError}>
                        {" "}
                        {errors && errors.body}{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {Object.keys(editInfo).length !== 0 && (
                        <Buttons
                          onClick={handleCancel}
                          style={{
                            backgroundColor: "#49fcea",
                            borderColor: "#49fcea",
                            marginRight: 30,
                          }}
                        >
                          Cancel
                        </Buttons>
                      )}
                      <Buttons onClick={submitArticle} disabled={formLoader}>
                        {formLoader && <Spinner size={24} />}
                        {Object.keys(editInfo).length === 0
                          ? "Save"
                          : "Update"}{" "}
                      </Buttons>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    </Layout>
  );
};
export default withRouter(Help);
