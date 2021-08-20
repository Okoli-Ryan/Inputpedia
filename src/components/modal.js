//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setModal, removeModal } from "../store/actions";
import NetInfo from "@react-native-community/netinfo";

import Button from "./Button";
// create a component

const DeleteRecording = (props) => {
  return (
    <>
      <Text
        style={{
          fontFamily: "Poppins_medium",
          marginBottom: 10,
          alignSelf: "flex-start",
        }}>
        Delete Recording?
      </Text>
      <Text style={{ fontFamily: "Poppins", marginBottom: 10 }}>
        Are you sure you want to delete this recording?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
        }}>
        <TouchableOpacity
          onPress={() => {
            props.delete();
            props.dismiss();
          }}>
          <Text
            style={{
              color: "#02b709",
              fontFamily: "Poppins",
              marginRight: 56,
            }}>
            YES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.dismiss}>
          <Text style={{ color: "#e40000", fontFamily: "Poppins" }}>NO</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const SaveData = (props) => {
  const [loading, setLoading] = useState(false);

  const startSaving = () => {
    NetInfo.fetch().then((state) => {
      if (state.isInternetReachable) {
        setLoading(true);
        props.save();
      } else {
        props.showModal();
      }
    });
  };
  return (
    <View style={{ justifyContent: "center", width: "100%" }}>
      <Text
        style={{
          fontFamily: "Poppins_medium",
          marginBottom: 16,
          textAlign: "center",
        }}>
        Are you sure want to submit?
      </Text>
      <Button
        onPress={startSaving}
        exStyles={{ marginBottom: 16, width: "100%" }}
        text="Yes, I'm sure"
        loading={loading}
      />
      <Button
        onPress={props.dismiss}
        disabled={loading}
        exStyles={{
          marginBottom: 10,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "#264653",
          width: "100%",
        }}
        textStyle={{ color: "#e40000" }}
        text="No, I want to go back"
      />
    </View>
  );
};

const ErrModal = (props) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "Poppins_medium",
          marginBottom: 4,
          color: "#264653",
          alignSelf: "center",
        }}>
        An Error Occurred
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 10,
          fontFamily: "Poppins",
          color: "#264653",
        }}>
        Please make sure you're connected to the internet
      </Text>
      <Button text="Ok" onPress={props.dismiss} />
    </View>
  );
};

const DisplayedModal = (props) => {
  if (props.type === "delete") return <DeleteRecording {...props} />;
  else if (props.type === "save") return <SaveData {...props} />;
  else if (props.type === "error") return <ErrModal {...props} />;
};

const ModalComp = (props) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalReducer);

  const dismissModal = () => {
    dispatch(removeModal());
  };

  const showModal = () => {
    dispatch(setModal({ type: "error", display: true }));
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalState.display}>
      <View
        style={
          modalState.type !== "save"
            ? styles.centeredView
            : styles.centeredViewSave
        }>
        <View
          style={
            modalState.type !== "save" ? styles.modalView : styles.modalViewSave
          }>
          <DisplayedModal
            {...props}
            type={modalState.type}
            dismiss={dismissModal}
            showModal={showModal}
          />
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(194, 194, 194, 0.52)",
  },
  centeredViewSave: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(194, 194, 194, 0.22)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewSave: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    padding: 35,
    width: "100%",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
});

//make this component available to the app
export default ModalComp;
