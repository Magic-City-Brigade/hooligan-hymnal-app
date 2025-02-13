import React from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BigButton } from "./BigButton";
import { RegularText, BoldText } from "./StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DefaultColors, CommonImageCredits } from "../../config";
import i18n from "../i18n";

export default class PostCreateImageWrapper extends React.Component {
  state = {
    metadataModalVisible: false,
    metadata: {
      caption: "",
      credit: "",
    },
  };

  componentDidMount = () => {
    this.setState({ metadata: this.props.metadata });
  };

  renderCommonCreditItem = (item) => {
    return (
      <View style={{ borderBottomColor: "#eee", borderBottomWidth: 1 }}>
        <RegularText
          style={{ fontSize: 16 }}
          onPress={() => this.handlePressCommonCreditItem(item.item)}
          numberOfLines={1}
        >
          {item.item}
        </RegularText>
      </View>
    );
  };

  handlePressCommonCreditItem = (item) => {
    let metadata = this.state.metadata;
    metadata.credit = item;
    this.setState({ metadata });
  };

  onPressMetadata = () => {
    this.setState({ metadataModalVisible: true });
  };

  render() {
    return (
      <View style={{ marginHorizontal: 2 }}>
        <Image
          style={{ width: 150, height: 150, resizeMode: "cover" }}
          source={{ uri: this.props.uri }}
        />
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            if (this.props.onPressDelete)
              this.props.onPressDelete(this.props.uri);
          }}
        >
          <MaterialCommunityIcons
            name="close"
            size={22}
            style={{
              color: DefaultColors.Primary,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.metadata}
          onPress={this.onPressMetadata}
        >
          <MaterialCommunityIcons
            name="code-tags"
            size={22}
            style={{
              color: DefaultColors.Primary,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.metadataModalVisible}
        >
          <View style={{ padding: 10 }}>
            <BoldText style={styles.metadataTitle}>
              {i18n.t("components.postcreateimagewrapper.metadatatitle")}
            </BoldText>
            {CommonImageCredits && CommonImageCredits.length > 0 && (
              <View style={styles.commonCreditContainer}>
                <BoldText style={styles.commonCreditLabel}>
                  {i18n.t("components.postcreateimagewrapper.common")}
                </BoldText>
                <FlatList
                  renderScrollComponent={(props) => <ScrollView {...props} />}
                  data={CommonImageCredits}
                  renderItem={this.renderCommonCreditItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
            <BoldText style={styles.metadataLabel}>
              {i18n.t("components.postcreateimagewrapper.credit")}
            </BoldText>
            <TextInput
              style={styles.metadataTextInput}
              placeholder={i18n.t("components.postcreateimagewrapper.credit")}
              value={this.state.metadata.credit}
              onChangeText={(text) => {
                let metadata = this.state.metadata;
                metadata.credit = text;
                this.setState({ metadata });
              }}
            />
            <BoldText style={styles.metadataLabel}>
              {i18n.t("components.postcreateimagewrapper.caption")}
            </BoldText>
            <TextInput
              style={styles.metadataMultilineTextInput}
              multiline={true}
              placeholder={i18n.t("components.postcreateimagewrapper.caption")}
              value={this.state.metadata.caption}
              onChangeText={(text) => {
                let metadata = this.state.metadata;
                metadata.caption = text;
                this.setState({ metadata });
              }}
            />
          </View>
          <BigButton
            label={i18n.t("components.postcreateimagewrapper.save")}
            iconName="content-save"
            iconPosition="right"
            inModal={true}
            onPress={() => {
              this.setState({ metadataModalVisible: false }, () => {
                if (this.props.onSaveMetadata)
                  this.props.onSaveMetadata(
                    this.props.uri,
                    this.state.metadata
                  );
              });
            }}
          />
          <BigButton
            label={i18n.t("components.postcreateimagewrapper.clear")}
            inModal={true}
            onPress={() => {
              let metadata = {
                caption: "",
                credit: "",
              };
              // chain those callbacks!
              this.setState({ metadata }, () => {
                this.setState({ metadataModalVisible: false }, () => {
                  if (this.props.onSaveMetadata)
                    this.props.onSaveMetadata(
                      this.props.uri,
                      this.state.metadata
                    );
                });
              });
            }}
          />
          <BigButton
            label={i18n.t("components.postcreateimagewrapper.cancel")}
            inModal={true}
            onPress={() => {
              this.setState({ metadataModalVisible: false });
            }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  delete: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: DefaultColors.Secondary,
    width: 25,
    height: 25,
    borderColor: DefaultColors.Primary,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  metadata: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: DefaultColors.Secondary,
    width: 25,
    height: 25,
    borderColor: DefaultColors.Primary,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  metadataTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  commonCreditLabel: {},
  commonCreditContainer: {
    height: 85,
    marginBottom: 5,
  },
  metadataLabel: {},
  metadataTextInput: {
    fontSize: 18,
    height: 50,
  },
  metadataMultilineTextInput: {
    fontSize: 18,
    height: 100,
    textAlignVertical: "top",
  },
});
