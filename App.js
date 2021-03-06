import React from "react";
import { Icon } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

// Importing style
import GlobalStyles from "./src/GlobalStyles";

var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputString: ""
    };
  }

  
  updateInputString = val => {
    let inputString = this.state.inputString;
    let last_char = inputString.charAt(inputString.length);

    if (inputString == "Invalid Input" || inputString == "Infinity") {
      // to get rid of text in case of invalid string and infinity
      inputString = "";
    }

    if (isNaN(inputString.charAt(inputString.length - 1)) && isNaN(val)) {
      // if the last element in the string is an operator and user clicks another operator the entry is not accepted
      console.log(inputString.charAt(inputString.length - 1) + " " + val);
      if (
        (inputString.charAt(inputString.length - 1) !== "*" || val !== "-") &&
        (inputString.charAt(inputString.length - 1) !== "/" || val !== "-")
      ) {
        console.log(inputString.charAt(inputString.length - 1) + " " + val);
        inputString = inputString.slice(0, inputString.length - 1) + val;
        this.setState({ inputString });
      } else {
        inputString += val;
        this.setState({ inputString });
      }
    } else {
      inputString += val;
      this.setState({ inputString });
    }
  };

  resetDisplay = () => {
    this.setState({ inputString: "" });
  };

  displayAnswer = () => {
    let string = this.state.inputString;
    let answer;
    // console.log(answer);

    try {
      if (string.charAt(0) != "√") {
        answer = eval(string);
      } else {
        answer = string.slice(1, string.length);
        answer = Math.sqrt(eval(answer));
        console.log(answer);
      }

      if (answer != undefined) {
        //  console.log(answer);
        if (answer % 1 > 0) {
          // to check it the number after decimal is greater than zero/check if decimal value is present or not
          answer = answer.toFixed(2);
        }
        this.setState({ inputString: answer.toString() });
      }
    } catch (err) {
      this.setState({ inputString: "Invalid Input" });
      console.log(err);
    }
  };

  backSpace = () => {
    let inputString = this.state.inputString;
    if (inputString == "Invalid Input" || inputString == "Infinity") {
      // to get rid of text in case of invalid string and infinity
      inputString = "";
    } else {
      inputString = inputString.substring(0, inputString.length - 1);
    }
    this.setState({ inputString });
  };

  render() {
    return (
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <View style={styles.container}>
          <View style={styles.displayScreen}>
            <TextInput
              style={styles.displayInput}
              multiline={true}
              editable={false}
              maxlength={15}
              value={this.state.inputString}
              placeholder="0"
              placeholderTextColor="#fff"
              adjustsFontSizeToFit={true}
            />
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#696969",
              width: screenWidth * 0.85,
              marginHorizontal: screenWidth * 0.075
            }}
          ></View>

          <View style={styles.gridContainer}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.resetDisplay();
                }}
                style={styles.button}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>C</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("%");
                }}
                style={styles.button}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>Mod</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.backSpace();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  <Icon name="backspace" style={{ color: "#fff" }}></Icon>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("/");
                }}
                style={styles.specialButton}
              >
                <Text style={[styles.specialText]}>/</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("7");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("8");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("9");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>9</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("*");
                }}
                style={styles.specialButton}
              >
                <Text style={styles.specialText}>x</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("4");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("5");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("6");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>6</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("-");
                }}
                style={styles.specialButton}
              >
                <Text style={[styles.specialText]}>-</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("1");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("2");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("3");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>3</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("+");
                }}
                style={styles.specialButton}
              >
                <Text style={[styles.specialText]}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("√");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>√</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString("0");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.updateInputString(".");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.displayAnswer();
                }}
                style={styles.specialButton}
              >
                <Text
                  style={[
                    styles.specialText,
                    {
                      borderWidth: 1,
                      borderColor: "#ff5d6d",
                      borderRadius: 100,
                      color: "#fff",
                      // padding: 6,
                      paddingHorizontal: 14,
                      paddingVertical: 4.5,
                      marginHorizontal: 3,
                      backgroundColor: "#ff5d6d"
                    }
                  ]}
                >
                  =
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

//#1c1e22
//#1a1e24
//#22262c
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1e22",
    marginTop: 31
  },
  displayScreen: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  displayInput: {
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width * 0.85,
    marginHorizontal: Dimensions.get("window").width * 0.075,
    textAlign: "right",
    color: "#fff",
    fontSize: responsiveFontSize(5),
    fontWeight: "700"
  },
  gridContainer: {
    flex: 1,
    marginBottom: screenHeight * 0.01
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    flex: 1,
    // backgroundColor: '#2b2d2f',
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 3
  },
  specialButton: {
    flex: 1,
    // backgroundColor: '#2b2d2f',
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 3
  },
  buttonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "500",
    color: "#696969"
  },
  specialText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "500",
    color: "#ff5d6d"
  }
});
