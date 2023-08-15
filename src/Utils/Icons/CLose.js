import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Close = (props) => (
  <Svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <Path
      stroke="#FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 12 7 7m5 5 5 5m-5-5 5-5m-5 5-5 5"
    />
  </Svg>
);
export default Close;
