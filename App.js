import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  Modal,
  Platform,
  ScrollView,
} from "react-native";

import * as Picker from "expo-image-picker";

import ArrowLeft from "./assets/arrow-left.png";
import Upload from "./assets/upload.png";
import ArrowBottom from "./assets/arrow-bottom.png";

import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

const mainColor = "#008EA5";
const fontColor = "#525451";

export default function App() {
  const catList = [
    "Hospital",
    "Hotel",
    "Restaurant",
    "Laboratory",
    "Technology",
  ];

  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");

  const [permision, setPermision] = useState(null);

  const [facilityName, setFacilityName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      const status = await Picker.requestMediaLibraryPermissionsAsync();
      setPermision(status.granted);
    })();
  }, []);

  const handlePress = async () => {
    const res = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!res.canceled) setImage(res.assets[0].uri);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.header}>
          <View style={[styles.container, styles.headerContainer]}>
            <Image
              source={ArrowLeft}
              style={{ position: "absolute", left: 20 }}
            />
            <Text style={styles.heading}>Add New Facilty</Text>
          </View>
        </View>
        <View style={[styles.section, styles.uploadPhoto]}>
          <View style={styles.container}>
            <Text style={styles.subHeading}>Facility Photo</Text>
            {permision && image ? (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 200 }}
              />
            ) : (
              <Pressable style={styles.box} onPress={() => handlePress()}>
                <Image source={Upload} />
                <Text style={styles.uploadHeading}>Upload Facilty Photo</Text>
                <Text style={styles.uploadParagraph}>
                  Click to upload files from your device
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.container}>
            <Text style={styles.subHeading}>Facility Name</Text>
            <TextInput
              placeholder="Enter Facility Name"
              style={styles.inputName}
              onChangeText={(text) => setFacilityName(text)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.container}>
            <Text style={styles.subHeading}>Facility Category</Text>
            <SelectDropdown
              data={catList}
              defaultButtonText="Select Facility Category"
              buttonStyle={{
                width: "100%",
                backgroundColor: "#fff",
                borderColor: "#E3E3E3",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
              buttonTextStyle={{
                color: "#ccc",
                fontSize: 14,
                textAlign: "left",
              }}
              search={true}
              searchInputStyle={{
                borderRadius: 5,
              }}
              renderDropdownIcon={() => <Image source={ArrowBottom} />}
              dropdownIconPosition="right"
              searchPlaceHolder="Type a word"
              rowStyle={{
                backgroundColor: "#fff",
                backgroundColor: "#ddd",
              }}
              selectedRowStyle={{
                backgroundColor: "#ccc",
              }}
              dropdownStyle={{
                borderRadius: 5,
              }}
              onSelect={(selectedItem) => setCategory(selectedItem)}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.container}>
            <Text style={styles.subHeading}>Description</Text>
            <TextInput
              placeholder="Description"
              style={styles.inputDescription}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.container, { alignItems: "center" }]}>
            <Pressable
              style={styles.saveBtn}
              onPress={() => {
                setModal(true);
              }}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
            </Pressable>
          </View>
        </View>

        <Modal
          visible={modal}
          onRequestClose={() => setModal(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={[styles.container]}>
              <Text style={{ fontSize: 20 }}>
                Facility Name : {facilityName}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Facility Category : {category}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Facility Description : {description}
              </Text>
            </View>
            <Pressable onPress={() => setModal(false)} style={styles.saveBtn}>
              <Text style={{ color: "#fff" }}>Close</Text>
            </Pressable>
          </SafeAreaView>
        </Modal>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? 20 : null,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 12,
    color: fontColor,
    marginBottom: 12,
  },
  section: {
    paddingTop: 15,
    maxWidth: "100%",
  },
  box: {
    paddingVertical: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#969798",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadHeading: {
    fontSize: 20,
    marginTop: 20,
    color: mainColor,
    fontWeight: "bold",
  },
  uploadParagraph: {
    fontSize: 12,
    color: fontColor,
    marginTop: 8,
  },
  inputName: {
    borderColor: "#E3E3E3",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  inputDescription: {
    borderColor: "#E3E3E3",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 100,
  },
  saveBtn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: mainColor,
    width: 300,
    borderRadius: 6,
    alignItems: "center",
  },
});
