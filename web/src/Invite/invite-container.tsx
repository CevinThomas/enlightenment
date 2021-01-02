import Axios from "axios";
import { default as React, useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import EnvVariables from "../envVariables";
import InviteView from "./invite-view";

function InviteContainer(props: any) {
  const [emailToInvite, setEmailToInvite] = useState("");

  const handleEmailToInvite = (e: any) => {
    setEmailToInvite(e.target.value);
  };

  const handleInvitePress = async () => {
    const cookie = new Cookies();
    const response = await Axios.post(
      `${EnvVariables.API_ENDPOINTS.INVITEUSER}`,
      { emailToInvite },
      {
        headers: {
          Authorization: cookie.get("token"),
        },
      }
    );
    console.log(response);
  };

  const ComponentToShow = () => {
    const cookie = new Cookies();
    if (cookie.get("token") !== undefined) {
      return (
        <InviteView
          handleInvitePress={handleInvitePress}
          handleEmailToInvite={handleEmailToInvite}
        />
      );
    } else {
      return <Redirect to={"/"} />;
    }
  };

  return <React.Fragment>{ComponentToShow()}</React.Fragment>;
}

export default InviteContainer;
