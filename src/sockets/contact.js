import getSocket from "./rootSocket";
import message from "../components/Shared/message";
import playBell from "../components/Shared/sound/bell";
import * as constant from "../constants/contact";
import getStore from "../configs/configureStore";

// Config socket contact

export const emitAddContact = (payload) => {
  getSocket().emit("add-contact", payload);
};

export const onAddContact = (payload) => {
  playBell("notification");
  message.info(payload);
  getStore().dispatch({ type: constant.ON_CONTACT_REQUEST_ADD, payload });
};

export const emitAcceptRequestContact = (payload) => {
  getSocket().emit("accept-request-contact-received", payload);
};

export const onAcceptRequestContact = (payload) => {
  playBell("notification");
  getStore().dispatch({ type: constant.ON_ACCEPT_REQUEST_ADD, payload });
  message.info(payload);
};

export const emitRemoveRequestContact = (payload) => {
  getSocket().emit("remove-request-contact-received", payload);
};

export const onRemoveRequestContact = (payload) => {
  getStore().dispatch({ type: constant.ON_REMOVE_REQUEST_ADD, payload });
};

export const emitRemoveRequestSentContact = (payload) => {
  getSocket().emit("remove-request-sent-contact", payload);
};

export const onRemoveRequestSentContact = (payload) => {
  getStore().dispatch({ type: constant.ON_REMOVE_REQUEST_SENT_ADD, payload });
};

export const emitRemoveContact = (payload) => {
  getSocket().emit("remove-contact", payload);
};

export const onRemoveContact = (payload) => {
  getStore().dispatch({ type: constant.ON_REMOVE_CONTACT, payload });
};
