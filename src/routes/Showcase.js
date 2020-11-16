import React,{useEffect,useState} from "react";
import { Row, Col } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import SideBar from '../components/SideBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSongs,setPlayingSong} from '../store'
import "./route.css";
function Showcase(props) {
  console.log("Showcase -> props", props)
 useEffect(()=>{
     props.getSongs();
 },[])
  const SongCards=props.songs.songs && props.songs.songs.map((song)=><SongCard setPlayingSong={()=>props.setPlayingSong(song)} song={song}/>)
  console.log(props)
  return (
    <Row>
      <Col md={18}>
        {SongCards}
      </Col>
      <Col md={6}>
        <SideBar/>
      </Col>
    </Row>
  );
}
const SongCard = ({song,setPlayingSong}) => {
  return (
    <div className="song-card">
      <div className="img" style={{backgroundImage:`url('${song.thumbnail.url}')`}} ></div>
      <div className="description">
        <h1>{song.title}</h1>
  <p style={{ textAlign: "left" }}>{song.name}</p>
        <Row type="flex" align="left">
          <Col>
            <div style={{
                display: "inline-flex",
                justifyContent: "left",
                alignItems: "left",
              }}
            >
              <PlayCircleOutlined className="icon"
                style={{ display: "inline-block",fontSize:'2rem', verticalAlign: "left" }}
                onClick={()=>setPlayingSong()}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps=state=>{
  return {songs:state.songs,loading:state.loading,login:state.login}
}
const mapDispatchToProps=dispatch=>{
  return bindActionCreators({getSongs,setPlayingSong},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Showcase);
