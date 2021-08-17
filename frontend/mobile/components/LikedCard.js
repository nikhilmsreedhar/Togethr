import React, { useContext } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
import { defaultInterests } from "./Tags";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const LikedCard = ({
  eventId,
  maker,
  image,
  title,
  description,
  location,
  startDate,
  endDate,
  attendees,
  category,
  removeCard,
}) => {
  const { userData } = useContext(AuthContext);

  const formatDate = new Date(startDate).toDateString();
  const formatStartTime = new Date(startDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formatEndTime = new Date(endDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card>
      <Card.Title
        title={title}
        right={() => (
          <Chip
            icon={defaultInterests.find((tag) => tag.value == category).icon}
          >
            {category}
          </Chip>
        )}
      />
      {image ? null : (
        // <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Loading />
      )}

      <Card.Content>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text>Attending:</Text>
            {attendees.map((user, index) => (
              <Text key={index}>• {user}</Text>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <Paragraph>{description}</Paragraph>

            <Text style={{ color: "gray" }}>@ {location}</Text>
            <Text>When:</Text>
            <Text>{formatDate}</Text>
            {formatStartTime == formatEndTime ? (
              <Text>{formatStartTime}</Text>
            ) : (
              <Text>
                {formatStartTime} - {formatEndTime}
              </Text>
            )}
          </View>
        </View>
      </Card.Content>

      <Card.Actions style={{ justifyContent: "flex-end" }}>
        <IconButton icon="pencil" onPress={() => {}} />
        <IconButton
          color="red"
          icon="delete"
          onPress={() => {
            removeAttend(eventId);
            removeCard(eventId);
          }}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    height: SCREEN_HEIGHT - 160,
    width: SCREEN_WIDTH - 30,
    paddingVertical: 50,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
  description: {
    fontSize: 20,
    margin: 10,
  },
  info: {
    margin: 10,
  },
  chipWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default LikedCard;
