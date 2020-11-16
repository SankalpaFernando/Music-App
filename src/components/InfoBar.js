import React, { useState } from "react";
import { Input, Button, Modal,notification } from "antd";
import axios from "axios";
import { LogoutOutlined, FileAddOutlined } from "@ant-design/icons";
import { addSongs,getSongs } from "../store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


function InfoBar(props) {
  console.log("InfoBar -> props", props);
  const [visible, setVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
 
  const Submit =async () => {
    const res=await props.addSongs()
  };
  return (
    <>
      <Modal
        visible={visible}
        title="Title"
        onCancel={() => {
          setVisible(false)
          props.getSongs()
        }}
        footer={[]}
      >
        <div className="flex">
          <Input size="large" id="url-input" placeholder="large size" />
          <Button size="large" onClick={() => Submit()} loading={props.loading} >
            Upload
          </Button>
        </div>
      </Modal>
      <div className="nav-case">
        <div className="nav-icon">
          <LogoutOutlined className="icon" />
        </div>
        <div className="nav-icon">
          <FileAddOutlined className="icon" onClick={() => setVisible(true)} />
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addSongs,getSongs }, dispatch);
};
const mapStateToProps=state=>{
  return {loading:state.loading}
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBar);
