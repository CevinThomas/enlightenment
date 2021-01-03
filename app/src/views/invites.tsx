import { default as React, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EnvVariables from "../../envVariables";
import { makeHttpsRequest } from "../utils/functions";

function invites(props) {
  const [invitesToShow, setInvitesToShow] = useState([]);

  useEffect(() => {
    retrieveInvites();
  }, []);

  function retrieveInvites() {
    makeHttpsRequest(`${EnvVariables.API_ENDPOINTS.GETINVITES}`, "GET")
      .then((response) => {
        if (response.statusCode === 200) {
          setInvitesToShow(response.data.invites);
        }
      })
      .catch((e) => console.log(e));
  }

  async function handleAcceptInvite(emailAccepted: string, accepted: boolean) {
    const dataToSend = {
      invite: emailAccepted,
      accepted: accepted,
    };

    const response = await makeHttpsRequest(
      `${EnvVariables.API_ENDPOINTS.HANDLEINVITES}`,
      "POST",
      dataToSend
    );

    if (response.statusCode === 200) {
      return retrieveInvites();
    }
  }

  return (
    <View style={styles.container}>
      <View>
        {invitesToShow.length !== 0 ? (
          <View>
            <Text>Invites:</Text>
            {invitesToShow.map((invite) => (
              <View>
                <Text>{invite}</Text>
                <Button
                  title="Accept"
                  onPress={() => handleAcceptInvite(invite, true)}
                />
                <Button
                  title="Decline"
                  onPress={() => handleAcceptInvite(invite, false)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text>You have no invites</Text>
            <TouchableOpacity onPress={retrieveInvites}>
              <Text>Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default invites;
