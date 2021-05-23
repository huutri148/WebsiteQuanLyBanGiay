import { Tooltip, withStyles } from "@material-ui/core";

const ValidationTip = withStyles((theme) => ({
    arrow: {
        color: theme.palette.common.white,
      },
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgb(255, 0, 0)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);
export default ValidationTip;

