import React from "react";
import ReactPlayer from "react-player";
import sea from "../../img/sea.mp4";
const WelcomeCard = () => {
  return (
    <div>
      <ReactPlayer playing={true} url={sea} height="100%" width="100%" loop />
    </div>
  );
};

export default WelcomeCard;
