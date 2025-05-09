import React from "react";
import MaterialTable, { MTableBody, MTableToolbar } from "material-table";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MuiThemeProvider,
  Paper,
  Radio,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";
import $ from "jquery";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddedProfileList } from "../../store/actions/SocialMediaProfileAction";
import Alert from "../AlertBox/Alert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import * as constant from "../../utils/constant";
import { formatImage, formatNumber } from "utils/functions.js";
import { withRouter } from "react-router";
import { withStyles } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    secondary: {
      main: "#0B6670",
    },
  },
});

const MaterailDataTable = ({
  data,
  getSelectedProfileList,
  history,
  loader,
  selectedLabels,
}) => {
  const dispatch = useDispatch();
  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  let [rightClickCount, setRightClickCount] = React.useState(0);
  let [leftClickCount, setLeftClickCount] = React.useState(0);
  const { selectedProfilesListToComapre } = useSelector(
    (state) => state.socialMediaProfileListReducer
  );

  const { activeSocialMediaType } = useSelector(
    (state) => state.socialMediaProfileListReducer
  );

  let subdomain = user.CustomerSubdomain.subdomain;

  /* deleting added social media profiles dialog opens */
  const deleteAddedprofile = (data) => {
    setDeleteAlertOpen(true);
    setItemToDelete(data);
  };
  /* close modal on clikc */
  const handleClose = () => {
    setDeleteAlertOpen(false);
  };

  /* Deleting social medai profiles list  */
  const handleDelete = () => {
    if (itemToDelete) {
      dispatch(deleteAddedProfileList(itemToDelete.social_page_id));
    }
  };

  React.useEffect(() => {
    getSelectedProfileList(selectedRow);
  }, [selectedRow]);

  //For scrolling horizontally

  // $(".scrollRight").click(function(){
  //   if (rightClickCount === 0){
  //     $("div").scrollLeft(400);
  //     setRightClickCount(rightClickCount ++)
  //   } else  {$("div").scrollLeft(1000); setRightClickCount(0)}
  // });
  let left = 0;

  $(".scrollRight").click(function (event) {
    event.preventDefault();
    left = left + 300;
    $("div").animate(
      {
        scrollLeft: left,
      },
      200
    );
  });

  $(".scrollLeft").click(function (event) {
    event.preventDefault();
    if (left > 0) {
      left = left - 300 < 0 ? 0 : left - 300;
      $("div").animate(
        {
          scrollLeft: left,
        },
        200
      );
    }
  });

  // $(".scrollLeft").click(function(){
  //   if (leftClickCount === 0){
  //     $("div").scrollLeft(-200);
  //     setLeftClickCount(leftClickCount ++)
  //     setRightClickCount(0)
  //   } else  $("div").scrollLeft(-400);
  // });

  return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        isLoading={!loader ? false : true}
        components={{
          OverlayLoading: (props) => (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <CircularProgress style={{ color: "#bdbdbd" }} {...props} />
            </div>
          ),
        }}
        style={{
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
        icons={tableIcons}
        columns={[
          {
            title: "Profile",
            field: "profileName",
            render: (rowData) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    minWidth: "36vw",
                  }}
                >
                  {rowData.is_data_downloading && (
                    <div
                      style={{
                        width: 6,
                        height: 30,
                        backgroundColor: "#FBE281",
                        position: "absolute",
                        left: 5,
                      }}
                    ></div>
                  )}

                  <Avatar
                    src={formatImage(
                      activeSocialMediaType,
                      subdomain,
                      rowData.page_picture
                    )}
                    style={{ marginRight: "16px", border: "1px solid #E0E0E0" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      style={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                        whiteSpace: "break-space",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        history.push("/brand-overview", rowData.id)
                      }
                    >
                      {rowData.page_name}
                    </Typography>
                    <Typography
                      style={{
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                        fontSize: 13,
                        color: "#757575",
                      }}
                    >
                      {rowData.page_username}
                    </Typography>
                  </div>
                </div>
              );
            },
            cellStyle: {
              minwidth: "400px",
              position: "sticky",
              zIndex: "500",
              left: 65,
              backgroundColor: "#fafafa",
            },
            headerStyle: {
              width: "20vw",
              position: "sticky",
              zIndex: "500",
              left: 65,
              backgroundColor: "rgb(245, 245, 245)",
            },
          },
          {
            title: "Total Fans",
            field: "page_fan_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_fan_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find((label) => label === "Total Fans")
              ? false
              : true,
          },
          {
            title: "Comment Count",
            field: "page_comments_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_comments_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find((label) => label === "Comment Count")
              ? false
              : true,
          },

          {
            title: "Shares",
            field: "page_shares_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_shares_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find((label) => label === "Shares")
              ? false
              : true,
          },
          {
            title: "Post Counts",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find((label) => label === "Post Counts")
              ? false
              : true,
          },
          {
            title: "Average Interaction per 1k Fans",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find(
              (label) => label === "Average Interaction per 1k Fans"
            )
              ? false
              : true,
          },
          {
            title: "Sum of Posts",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find((label) => label === "Sum of Posts")
              ? false
              : true,
          },
          {
            title: "Sum of likes",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find((label) => label === "Sum of likes")
              ? false
              : true,
          },
          {
            title: "Average Interaction",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find(
              (label) => label === "Average Interaction"
            )
              ? false
              : true,
          },
          {
            title: "Number of Organic Post",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find(
              (label) => label === "Number of Organic Post"
            )
              ? false
              : true,
          },
          {
            title: "Average response time",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find(
              (label) => label === "Average response time"
            )
              ? false
              : true,
          },
          {
            title: "Sum of Page Post",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find((label) => label === "Sum of Page Post")
              ? false
              : true,
          },
          {
            title: "Paid Efficiency Index",
            field: "page_posts_count",
            render: (rowData) => {
              return <div>{formatNumber(rowData.page_posts_count)}</div>;
            },
            cellStyle: {
              width: "5vw",
            },
            hidden: selectedLabels.find(
              (label) => label === "Paid Efficiency Index"
            )
              ? false
              : true,
          },
          {
            title: "Delete",
            field: "",
            align: "center",
            render: (rowData) => {
              return (
                <div style={{ minWidth: 140 }}>
                  {user.role !== constant.CUSTOMER_VIEWER_NAME ? (
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteAddedprofile(rowData)}
                    >
                      <RemoveCircleOutlineOutlinedIcon color="error" />
                    </IconButton>
                  ) : (
                    ""
                  )}

                  <Alert
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
                  />
                </div>
              );
            },
            cellStyle: {
              width: "5vw",
              position: "sticky",
              right: 0,
              zIndex: "500",
              backgroundColor: "#fafafa",
            },
            headerStyle: {
              position: "sticky",
              right: 0,
              zIndex: "500",
              textAlign: "center",
            },
          },
        ]}
        data={data}
        options={{
          selection: true,
          selectionProps: (rowData) => ({
            disabled: selectedProfilesListToComapre.find(
              (profile) => profile.social_page_id === rowData.social_page_id
            ),
          }),
          search: false,
          paging: false,
          toolbar: false,
          responsive: true,
          rowStyle: (rowData) => ({
            // backgroundColor: "#FAFAFA",
            backgroundColor: selectedRow.find(
              (row) => row.social_page_id === rowData.social_page_id
            )
              ? "#FFF8DE"
              : "" ||
                selectedProfilesListToComapre.find(
                  (profile) => profile.social_page_id === rowData.social_page_id
                )
              ? "#FFF8DE"
              : "",
          }),
          headerStyle: {
            backgroundColor: "#F5F5F5",
            borderRadius: "4px",
          },
          // fixedColumns: {
          //   left: 1,
          //   right: 1
          // },
        }}
        onSelectionChange={(rows) => setSelectedRow(rows)}
        localization={{
          body: {
            emptyDataSourceMessage: "no records found",
          },
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <button className="scrollLeft">Scroll</button>
        <button className="scrollRight">Scroll</button>
      </div>
    </MuiThemeProvider>
  );
};

export default withRouter(MaterailDataTable);
