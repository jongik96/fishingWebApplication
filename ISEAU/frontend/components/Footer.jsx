import React from "react";

const Footer = () => {
  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-4 gap-y-10 px-12 py-14
    bg-gray-100 text-gray-600"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">ABOUT</h5>
        <p>How we works</p>
        <p>Notice</p>
        <p>SSAFY 5th</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">COMMUNITY</h5>
        <p>Fishing Tips</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">POINTS</h5>
        <p>By Location</p>
        <p>By Fish Species</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">API</h5>
        <p>Map by google</p>
      </div>
    </div>
  );
};

export default Footer;
