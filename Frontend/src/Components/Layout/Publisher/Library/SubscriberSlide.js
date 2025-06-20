import React from "react";
import CustomDrawer from "../../../Core-Components/CustomDrawer";
import { Card, IconButton, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { del_Subsciber_Request } from "../../../../Redux/Action/PublisherAction/SubscriberAction";

function SubscriberSlide({ open, setOpen, selectedCategory }) {
  const { SubScriberData, loading } = useSelector(
    (state) => state?.SubscriberData
  );
  const dispatch = useDispatch();
  const handleDeleteSub = (id) => {
    const payload = { sub_id: id, selectedCategory: selectedCategory };
    dispatch(del_Subsciber_Request(payload));
  };

  return (
    <CustomDrawer
      open={open}
      handleClose={() => setOpen(false)}
      title="Subscribers"
    >
      {loading ? (
        <div>Getting Subscribers...</div>
      ) : (
        <div className="p-2 d-flex flex-column" style={{ rowGap: "10px" }}>
          {SubScriberData.length > 0 ? (
            SubScriberData?.map((sub) => (
              <>
                <Card key={sub.id} className="px-3 py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Typography>{sub?.reader_email}</Typography>
                    <Tooltip title="delete">
                      <IconButton onClick={() => handleDeleteSub(sub?.sub_id)}>
                        <MdDelete size="14" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Card>
              </>
            ))
          ) : (
            <div>
              <p>No Subscribers</p>
            </div>
          )}
        </div>
      )}
    </CustomDrawer>
  );
}

export default SubscriberSlide;
