
import CircularProgress from "@mui/material/CircularProgress";
import {makeStyles} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  loader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

}));

const Index = (props) => {
  const classes = useStyles();

  return (
   
       <div id="loader-circular"  className={`${classes.loader} ${props.className}`} >
      <CircularProgress style={{color: "#bdbdbd"}} size={props.size} disableShrink />
    </div>

      
  );
};

export default Index;
