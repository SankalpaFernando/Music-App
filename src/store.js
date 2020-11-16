import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";
import { notification } from "antd";
import { useHistory,Redirect } from "react-router-dom";

const {REACT_APP_API,REACT_APP_TOKEN} = process.env


const initialState = { songs: [], loading: false, playingSong: {} };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SONG":
      return { ...state, songs: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PLAYING_SONG":
      return { ...state, playingSong: action.payload };
    case "SET_LOGIN":
      return {...state,login:action.payload}
    default:
      return state;
  }
};
const openNotification = (errMsg) => {
    notification.open({
      message: errMsg
    });
  };
export const addSongs = () => {
  return async (dispatch) => {
    const url = document.getElementById("url-input").value;
    let id;
    if (url) {
      if (url.split(".")[1] === "be") {
        id = url.split("/")[3];
      } else if (url.split("/")[2] === "www.youtube.com") {
        id = url.split("?v=")[1];
      } else {
        openNotification('Unvalid URL')
      }
    } else {
        openNotification('Unvalid URL')
    }
    console.log("Called");
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await axios.post(`${REACT_APP_API}/youtube?token=${REACT_APP_TOKEN}`, {
      url,
      id,
    });
    if (response.valid) {
        openNotification('Song Added')
    } else {
        openNotification('Unvalid URL')
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
export const getSongs = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    console.log("Called Me");
    const response = await axios.get(`${REACT_APP_API}/music?token=${REACT_APP_TOKEN}`);
    dispatch({ type: "ADD_SONG", payload: response.data.songs });
    console.log("addSongs -> songs", response);
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
export const setPlayingSong = (song) => {
  return async (dispatch) => {
    dispatch({ type: "SET_PLAYING_SONG", payload: song });
  };
};

export const Login=(email,password)=>{
  return async dispatch=>{
   const response=await  axios.post(`${REACT_APP_API}/login?token=${REACT_APP_TOKEN}`, { email, password })
   const data = (await response).data;
   if (data.success) {
    dispatch({type:"SET_LOGIN",payload:true})
    return true
  }else{
    openNotification('Error In Sign In Check Your Credential')
    dispatch({type:"SET_LOGIN",payload:false})
    return false
  }
  }
}

export const Sign=(email,password)=>{
  return async dispatch=>{
    const response=await axios.post(`${REACT_APP_API}/sign?token=${REACT_APP_TOKEN}`, { email:email, password:password })
    const data =await response.data
    console.log("Sign -> response", response)
    if (data.success) {
      dispatch({type:"SET_LOGIN",payload:true})
      return true
    }
    else{
      openNotification("Email is Already Exsits")
      return false
    }
  }
}



export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
