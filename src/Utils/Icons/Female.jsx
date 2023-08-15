import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../Colors";
const Female = (props) => (
  <Svg
    baseProfile="tiny"
    id="Layer_1"
    fill={Colors.primary}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="-63 65 128 128"
    xmlSpace="preserve"
    {...props}
  >
    <Path d="M11.3,89.8c7.2,0,12.4,5.9,13.4,9.2l8.8,29c1.8,6.2-6.2,8.8-8.1,2.7l-8-26.6H13l13.3,47.3H13.6v36.9c0,6.3-9.5,6.3-9.5,0 v-37.2h-4.8v37.1c0,6.4-9.5,6.4-9.5,0v-36.8h-12.7l13.2-47.3h-4.4l-7.9,26.7c-1.9,5.8-9.9,3.4-8.1-2.8l8.8-29 c0.9-3.3,5.1-9.2,12.4-9.2C-8.9,89.8,11.3,89.8,11.3,89.8z" />
    <Path d="M1.7,87.6C7.4,87.6,12,83,12,77.3C12,71.6,7.4,67,1.7,67C-4,67-8.5,71.6-8.5,77.3C-8.5,83-4,87.6,1.7,87.6" />
  </Svg>
);
export default Female;
