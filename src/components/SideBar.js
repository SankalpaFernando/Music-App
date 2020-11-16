import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import AudioPlayer from "./InfoBar";
import axios from 'axios';
import { connect } from "react-redux";
import "./component.css";
import {
  PlayCircleOutlined,
  PauseOutlined,
  LogoutOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import { Progress } from "antd";
import InfoBar from './InfoBar';
import _ from 'lodash';

function SideBar({playingSong}) {
  const [play, setPlay] = useState(false);
  const [song,setSong] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [audio, setAudio] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  if(song!==playingSong){
    audio !== null&& audio.pause();
    setAudio(null)
    setSong(playingSong)
    setPlay(false)
    setDataLoaded(false)
    setPlayTime(0)
  }
  if (!audio && playingSong) {
    setAudio(
      new Audio(
        playingSong.location
      )
    );
    audio &&
      audio.addEventListener("loadeddata", (data) => {
        setDataLoaded(true);
      });
  }

  const playAudio = async () => {
    if (audio) {
      if (play) {
        audio.pause();
      } else {
        audio.play();
        audio &&
          audio.addEventListener("timeupdate", () => {
            TimeUpdate();
          });
        audio &&
          audio.addEventListener("end", () => {
            console.log("End");
          });
      }
      setPlay(!play);
    }
  };
  const TimeUpdate = () => {
    const time = Math.round((audio.currentTime / audio.duration) * 100);
    setPlayTime(time);
  };
  console.log(song)
  return (
    <div className="side-bar">
     <InfoBar key="1"/>
     {
      !_.isEmpty(song) ? (
     <>
      <div className="side-bar-case">
        <div className="art-work" style={{backgroundImage:`url('${song && song.thumbnail && song.thumbnail.url}')`}}></div>
  <h2>{song && song.title}</h2>
  {console.log("SideBar -> song", song)}
        <div>
          <Progress strokeColor="#00bfa6" percent={playTime} />
        </div>
        <div className="icon-holder">
          
          {play ? (
            <PauseOutlined className="icon" onClick={() => playAudio()} />
          ) : (
            <PlayCircleOutlined className="icon" onClick={() => playAudio()} />
          )}
          
        </div>
      </div>
      </>
      ):null}
    </div>
  );
}

const mapStateToProps=state=>{
  return {playingSong:state.playingSong}
}
export default connect(mapStateToProps,null)(SideBar);
