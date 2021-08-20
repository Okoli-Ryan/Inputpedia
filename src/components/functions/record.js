import { recordingSettings } from "../../config";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import firebase, { Storage, Db } from "../../firebase";
import * as ImageManipulator from "expo-image-manipulator";

export const startRecording = async (
  sound,
  setIsRecording,
  setSound,
  setRecording
) => {
  // stop playback
  if (sound !== null) {
    await sound.unloadAsync();
    sound.setOnPlaybackStatusUpdate(null);
    setSound(null);
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: true,
    staysActiveInBackground: true,
  });
  const _recording = new Audio.Recording();
  try {
    await _recording.prepareToRecordAsync(recordingSettings);
    // setRecording(_recording);
    await _recording.startAsync();
    console.log("recording");
    setIsRecording(true);
    setRecording(_recording);
  } catch (error) {
    console.log("error while recording:", error);
  }
};

export const stopRecording = async (recording, setSound, setIsRecording) => {
  try {
    await recording.stopAndUnloadAsync();
  } catch (error) {
    // Do nothing -- we are already unloaded.
  }
  const info = await FileSystem.getInfoAsync(recording.getURI());
  console.log(`FILE INFO: ${JSON.stringify(info)}`);
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    playsInSilentLockedModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
    staysActiveInBackground: true,
  });
  const { sound: _sound, status } = await recording.createNewLoadedSoundAsync({
    isLooping: false,
    isMuted: false,
    volume: 1.0,
    rate: 1.0,
    shouldCorrectPitch: true,
  });
  setSound(_sound);
  setIsRecording(false);
};

export const playSound = async (sound) => {
  try {
    await sound.replayAsync();
  } catch (e) {
    console.log("error playing: " + e);
  }
};

export const pauseSound = async (sound) => {
  try {
    await sound.pauseAsync();
  } catch (e) {
    console.log("error pausing: " + e);
  }
};

export const deleteSound = async (sound, setSound, setRecording) => {
  pauseSound(sound);

  try {
    await sound.unloadAsync();
    sound.setOnPlaybackStatusUpdate(null);
    setSound(null);
    setRecording(null);
  } catch (e) {
    console.log("error deleting: " + e);
  }
};

export const uploadAudio = async (recording, filename) => {
  const uri = recording.getURI();
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        try {
          resolve(xhr.response);
        } catch (error) {
          console.log("error:", error);
        }
      };
      xhr.onerror = (e) => {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    if (blob != null) {
      Storage.ref()
        .child(`audio/${filename}.m4a`)
        .put(blob, {
          contentType: `audio/m4a`,
        })
        .then(() => {
          console.log("Sent!");
        })
        .catch((e) => console.log("error:", e));
    } else {
      console.log("error with blob");
    }
  } catch (error) {
    console.log("error:", error);
  }
};

const setUpLanguageList = async (topic, category) => {
  try {
    await Db.collection("data")
      .doc("topics_Yoruba")
      .set(
        {
          Yoruba: firebase.firestore.FieldValue.arrayUnion(
            `${topic}_${category}`
          ),
        },
        { merge: true }
      )
      .then((_) => console.log(`added ${topic} to Yoruba`))
      .catch((e) => console.log(`couldnt create document Yoruba: ${e}`));
    await Db.collection("data")
      .doc("topics_Igbo")
      .set(
        {
          Igbo: firebase.firestore.FieldValue.arrayUnion(
            `${topic}_${category}`
          ),
        },
        { merge: true }
      )
      .then((_) => console.log(`added ${topic} to Hausa`))
      .catch((e) => console.log(`couldnt create document Yoruba: ${e}`));
    await Db.collection("data")
      .doc("topics_Hausa")
      .set(
        {
          Hausa: firebase.firestore.FieldValue.arrayUnion(
            `${topic}_${category}`
          ),
        },
        { merge: true }
      )
      .then((_) => console.log(`added ${topic} to Igbo`))
      .catch((e) => console.log(`couldnt create document Yoruba: ${e}`));
    return new Promise();
  } catch (e) {}
};

const uploadData = async (params, lang, topic) => {
  if (params.type === "text") {
    await Db.collection("data")
      .doc("documents")
      .set(
        {
          [`${topic.category}`]: {
            [`${topic.name}`]: {
              [`${lang}`]: params.data,
              name: topic.name,
            },
          },
        },
        { merge: true }
      );
  } else if (params.type === "image") {
    const { uri } = await ImageManipulator.manipulateAsync(params.data, [], {
      compress: 0.3,
    });

    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = Storage.ref().child(
      `images/${lang}_${topic.category}_${topic.name}`
    );

    imageRef
      .put(blob)
      .then(() => console.log("saved to storage"))
      .catch((e) => console.log("no save to storage: " + e));
  }
};

const removeFromList = (lang, topic) => {
  if (lang !== "English") {
    Db.collection("data")
      .doc(`topics_${lang}`)
      .update({
        [`${lang}`]: firebase.firestore.FieldValue.arrayRemove(
          `${topic.name}_${topic.category}`
        ),
      })
      .then((_) => console.log(`saved to topic_${lang}`))
      .catch((e) => console.log(`couldnt update topic_${lang}: ` + e));
  }
};

export const upload = async (
  sound,
  params,
  lang,
  topic,
  recording,
  filename,
  cb,
  er
) => {
  try {
    pauseSound(sound);
    if (lang === "English") {
      await setUpLanguageList(topic.name, topic.category);
    }
    await Promise.all([
      uploadAudio(recording, filename),
      uploadData(params, lang, topic),
      removeFromList(lang, topic),
    ]).then(() => cb());
  } catch (e) {
    er();
    console.log(e);
  }
};
