import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  Typography,
  Divider,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Select from "react-select";
import Groupbox from "../../components/controls/GroupBox/GroupBox";
import TransferList from "../../components/controls/TransferList/TransferList";
import { Person, ExpandMore } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "darkslateblue",
  },
  paper: {
    margin: theme.spacing(2, 8),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: "fit-content",
    flexWrap: "wrap",
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "darkslateblue",
  },
  image: {
    objectFit: "cover",
    width: "80%",
    maxHeight: "100%",
  },
  imageCard: {
    padding: "0px 10px",
    margin: "0px 20px",
  },
  informationCard: {
    padding: "30px 0px 0px 50px",
  },
  button: {
    margin: "20px 0px 0px 30px",
    height: "60px",
    flewGrow: 1,
  },
  accordion: {
    margin: "22px 20px",
  },
}));
const ThemSanPham = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography component="h1" variant="h5" className={classes.title}>
        Thêm Sản Phẩm
      </Typography>
      <Paper spacing={0} className={classes.paper}>
        <label className={classes.cardHeader}>Thông tin sản phẩm</label>
        <Divider variant="middle" />
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid xs={4} className={classes.imageCard}>
            <img src="/images/1.png" className={classes.image} alt="Image" />
          </Grid>
          <Grid xs={6} className={classes.informationCard}>
            <Groupbox type="TextBox" title="Tên Giày" required={true} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "block", flexGrow: 2, width: "40%" }}>
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  Hãng sản xuất:
                </label>
                <Select />
              </div>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<Person />}
              >
                Quản lý hãng sản xuất
              </Button>
              <div
                style={{
                  display: "block",
                  flexGrow: 2,
                  width: "35%",
                  margin: "15px 0px",
                }}
              >
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  Giới tính:
                </label>
                <Select />
              </div>
              <div
                style={{
                  display: "block",
                  flexGrow: 3,
                  margin: "15px 0px 15px 30px",
                }}
              >
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  Màu sắc:
                </label>
                <Select />
              </div>
            </div>
          </Grid>
          <Grid xs={12}>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <label>Chọn size:</label>
              </AccordionSummary>
              <AccordionDetails>
                <TransferList />
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <label>Mô tả:</label>
              </AccordionSummary>
              <AccordionDetails>
                <h1>Fucking Choose Size</h1>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ThemSanPham;
