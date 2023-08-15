import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const Hamburger = (props) => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" />
    </G>
  </Svg>
);

export default Hamburger;
