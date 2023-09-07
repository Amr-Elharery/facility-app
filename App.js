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
import Checked from "./assets/checked.png";

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
  let [days, setDays] = useState([
    { name: "Sun", selected: false },
    { name: "Mon", selected: false },
    { name: "Tue", selected: false },
    { name: "Wed", selected: false },
    { name: "Thu", selected: false },
    { name: "Fri", selected: false },
    { name: "Sat", selected: false },
  ]);

  const [workingHours] = useState(["All Day", "Custom"]);

  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");

  const [permision, setPermision] = useState(null);

  const [facilityName, setFacilityName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWorkingHours, setSelectedWorkingHours] = useState("");
  const [availableFor, setAvailableFor] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Picker.requestMediaLibraryPermissionsAsync();
      setPermision(status.granted);
    })();
  }, []);

  const handlePick = async () => {
    const res = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const handleDays = (day, i) => {
    days.splice(i, 1, {
      name: day.name,
      selected: !days[i].selected,
    });
    setDays([...days]);
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
              <Pressable onPress={() => handlePick()}>
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 200 }}
                />
              </Pressable>
            ) : (
              <Pressable style={styles.box} onPress={() => handlePick()}>
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
          <View style={styles.container}>
            <Text
              style={[styles.subHeading, { fontWeight: "bold", fontSize: 16 }]}
            >
              Select Working Days
            </Text>

            <View style={styles.daysBox}>
              {days.map((day, i) => (
                <Pressable
                  key={day.name}
                  onPress={() => {
                    handleDays(day, i);
                  }}
                >
                  {days[i].selected ? (
                    <Text style={[styles.day, styles.selectedDay]}>
                      {day.name}
                    </Text>
                  ) : (
                    <Text style={[styles.day]}>{day.name}</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.container}>
            <Text
              style={[styles.subHeading, { fontWeight: "bold", fontSize: 16 }]}
            >
              Set Working Hours
            </Text>

            <View style={styles.workingHours}>
              {workingHours.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setSelectedWorkingHours(item)}
                  style={styles.selectBox}
                >
                  <View style={styles.bullet(selectedWorkingHours === item)}>
                    {selectedWorkingHours === item && (
                      <View style={styles.select}></View>
                    )}
                  </View>
                  <Text style={styles.workingHoursItem}>{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.container, styles.availableContainer]}>
            <Text
              style={[styles.subHeading, { fontWeight: "bold", fontSize: 16 }]}
            >
              Available For
            </Text>

            <Pressable onPress={() => setAvailableFor(!availableFor)}>
              {availableFor ? (
                <View style={styles.checked}>
                  <Image source={Checked} />
                </View>
              ) : (
                <View style={styles.notChecked} />
              )}
            </Pressable>
          </View>
        </View>

        {/* Save Button */}
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
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <View style={[styles.container, { gap: 15 }]}>
              <View style={styles.finishHeading}>
                <Text style={styles.finishData}>Facility Name : </Text>
                <Text style={styles.finishDataValue}>{facilityName}</Text>
              </View>
              <View style={styles.finishHeading}>
                <Text style={styles.finishData}>Facility Category : </Text>
                <Text style={styles.finishDataValue}>{category}</Text>
              </View>
              <View style={styles.finishHeading}>
                <Text style={styles.finishData}>Facility Description : </Text>

                <Text style={styles.finishDataValue}>{description}</Text>
              </View>
              <View style={styles.finishHeading}>
                <Text style={styles.finishData}>Facility Working Days : </Text>
                <Text style={styles.finishDataValue}>
                  {days.map((d) => (d.selected ? `${d.name} ` : ""))}
                </Text>
              </View>

              <View style={styles.finishHeading}>
                <Text style={styles.finishData}>Facility Working Hours : </Text>
                <Text style={styles.finishDataValue}>
                  {selectedWorkingHours}
                </Text>
              </View>
              <View style={styles.finishHeading}>
                <Text style={styles.finishData}>Facility Available For : </Text>
                <Text style={styles.finishDataValue}>
                  {availableFor ? "Yes" : "No"}
                </Text>
              </View>
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

  daysBox: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  day: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    fontWeight: "500",
  },
  selectedDay: {
    backgroundColor: mainColor,
    color: "#fff",
    overflow: "hidden",
  },

  workingHours: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  bullet: (selected) => {
    return {
      width: 20,
      height: 20,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: selected ? mainColor : "#ccc",
      borderRadius: 9,
      justifyContent: "center",
      alignItems: "center",
    };
  },
  select: {
    width: 12,
    height: 12,
    backgroundColor: mainColor,
    borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 6,
    padding: 5,
  },
  workingHoursItem: {
    fontSize: 16,
  },

  availableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  notChecked: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 6,
  },

  checked: {
    width: 20,
    height: 20,
    backgroundColor: mainColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  saveBtn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: mainColor,
    width: 300,
    borderRadius: 6,
    alignItems: "center",
  },

  finishHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
  },
  finishData: {
    fontSize: 20,
  },
  finishDataValue: {
    fontSize: 16,
    color: mainColor,
  },
});
