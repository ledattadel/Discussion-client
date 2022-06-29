import * as constants from "../constants/user";
import Message from "../components/Shared/message";
import Errors from "../components/Shared/error/errors";
import services from "../services/user";
import Swal from "sweetalert2";
import { getHistory } from "../configs/configureStore";
import { socketDisconnect } from "../sockets/rootSocket";

const actions = {
  getCurrentUser: () => async (dispatch) => {
    try {
      dispatch({
        type: constants.USER_GET_CURRENT_START,
      });

      let response = await services.getCurrentUser();

      dispatch({
        type: constants.USER_GET_CURRENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: constants.USER_GET_CURRENT_ERROR,
      });
    }
  },
  list: (filter = {}) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_GET_START });

      let response = await services.listFriend(filter);

      dispatch({
        type: constants.USER_GET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: constants.USER_GET_ERROR });
    }
  },
  doUpdatePassword: (values) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_UPDATE_PASSWORD_START });
      await services.doUpdatePassword(values);

      dispatch({ type: constants.USER_UPDATE_PASSWORD_SUCCESS });

      // Time Logout
      let timerInterval;
      Swal.fire({
        position: "top-end",
        title: "Tự động đăng xuất sau 5s!",
        html: "Thời gian <strong></strong> s.",
        timer: 5000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const strong = content.querySelector("strong");
              if (strong) {
                strong.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
              }
            }
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        window.localStorage.removeItem("asauth");
        socketDisconnect();
        getHistory().push("/signin");
        dispatch({ type: "RESET" });
      });
    } catch (error) {
      Message.error("Change password fail!");
      dispatch({
        type: constants.USER_UPDATE_PASSWORD_ERROR,
      });
    }
  },
  doGetUserUpdate: (id) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_FIND_START });

      const response = await services.getUserUpdate(id);

      dispatch({ type: constants.USER_FIND_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: constants.USER_FIND_ERROR });
    }
  },
  doUpdateInfo: (dataUpdate, userInfoNow) => async (dispatch) => {
    try {
      dispatch({
        type: constants.USER_UPDATE_START,
      });

      await services.updateInfo(dataUpdate);

      dispatch({
        type: constants.USER_UPDATE_SUCCESS,
        payload: userInfoNow,
      });

      Message.success("Update user info success!");
    } catch (error) {
      Message.error("Update user info fail!");
      dispatch({
        type: constants.USER_UPDATE_ERROR,
      });
    }
  },

};

export default actions;
