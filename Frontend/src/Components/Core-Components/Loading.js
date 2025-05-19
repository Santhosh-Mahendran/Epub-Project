import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Skeleton } from "@mui/material";
import CardComponent from "./Card.js";

export function Loading() {
  return (
    <div
      className="flex justify-content-center"
      style={{
        height: "100%",
        weight: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="3"
        strokeColor="blue"
        animationDuration=".8s"
      />
    </div>
  );
}

export function BookListLoading() {
  return (
    <div className="row g-3 mt-0" style={{ width: "100%", rowGap: "15px" }}>
      {Array.from(new Array(4)).map((index) => (
        <div
          key={index}
          className="col-lg-3 col-md-6 col-sm-12 mt-0"
          sx={{ padding: "5px", width: "240px !important" }}
        >
          <CardComponent>
            <div
              className="d-flex flex-column"
              style={{
                rowGap: "15px",
                width: "auto",
                height: "350px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "130px",
                  height: "200px",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  className="d-block justify-content-center"
                  sx={{ width: "130px", height: "200px" }}
                />
              </div>
              <Skeleton animation="wave" height={20} width="80%" />
              <Skeleton animation="wave" height={20} width="60%" />
              <Skeleton animation="wave" height={20} width="40%" />
              <Skeleton animation="wave" height={20} width="40%" />
            </div>
          </CardComponent>
        </div>
      ))}
    </div>
  );
}

export function BookDetailPubLoading({ role }) {
  return (
    <div className="d-flex mt-4" style={{ columnGap: "35px", height: "70vh" }}>
      <div
        className="row justify-content-center gap-4"
        style={{
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px 0 30px 0",
        }}
      >
        <div
          className="bookDetail row shadow col-9"
          style={{ columnGap: "20px" }}
        >
          <Skeleton
            variant="rectangular"
            width={250}
            height={330}
            className="d-block justify-content-center ms-4"
          />
          <div className="col-6 book-content" style={{ rowGap: "25px" }}>
            <Skeleton animation="wave" height={30} width="80%" />
            <Skeleton animation="wave" height={25} width="60%" />
            <Skeleton animation="wave" height={25} width="45%" />
            <Skeleton animation="wave" height={25} width="40%" />
            <Skeleton animation="wave" height={25} width="35%" />
            <Skeleton animation="wave" height={20} width="30%" />
          </div>
        </div>
        {role ? (
          ""
        ) : (
          <div className="card earning-detail col-3 p-0 shadow">
            <div className="card-header">
              <Skeleton animation="wave" height={40} width="80%" />
            </div>
            <div
              className="card-body d-flex flex-column"
              style={{ rowGap: "20px" }}
            >
              <Skeleton animation="wave" height={20} width="70%" />
              <Skeleton animation="wave" height={20} width="70%" />
              <Skeleton animation="wave" height={20} width="70%" />
              <Skeleton animation="wave" height={20} width="70%" />
              <Skeleton animation="wave" height={20} width="70%" />
              <Skeleton animation="wave" height={20} width="70%" />
              <Skeleton animation="wave" height={20} width="70%" />
              <Skeleton animation="wave" height={20} width="70%" />
            </div>
            <div className="card-footer">
              <Skeleton animation="wave" height={20} width="60%" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function UserLibraryLoading() {
  return (
    <div
      className="d-flex flex-column g-3 align-content-center"
      style={{ rowGap: "25px" }}
    >
      {Array.from(new Array(2)).map(() => (
        <CardComponent>
          <div className="d-flex" style={{ width: "100%" }}>
            <div style={{ width: "25%" }}>
              <Skeleton
                variant="rectangular"
                width={130}
                height={140}
                className="d-block justify-content-center ms-4"
              />
            </div>
            <div
              style={{ width: "100%", rowGap: "10px" }}
              className="d-flex flex-column"
            >
              <Skeleton animation="wave" height={20} width="45%" />
              <Skeleton animation="wave" height={20} width="43%" />
              <Skeleton animation="wave" height={20} width="40%" />
              <Skeleton animation="wave" height={20} width="20%" />
            </div>
          </div>
        </CardComponent>
      ))}
    </div>
  );
}
