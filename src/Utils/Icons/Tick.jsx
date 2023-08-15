import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const Tick = (props) => (
  <Svg
    width="256px"
    height="256px"
    viewBox="-3.15 -3.15 21.30 21.30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#000000"
    strokeWidth={0.00015000000000000001}
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#CCCCCC"
      strokeWidth={1.5}
      {...props}
    >
      <Path
        d="M4 7.5L7 10L11 5M7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5Z"
        stroke="#000000"
        {...props}
      />
    </G>
    <G id="SVGRepo_iconCarrier">
      <Path
        d="M4 7.5L7 10L11 5M7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5Z"
        stroke="#000000"
        {...props}
      />
    </G>
  </Svg>
);
export default Tick;
