import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '../Colors';

const ChevronRight = (props) => (
  <Svg
    width="20px"
    height="20px"
    viewBox="-18.75 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M55.757 53.315L17.799 91.272c-1.831 1.831 -4.799 1.831 -6.629 0l-4.427 -4.427c-1.828 -1.828 -1.831 -4.789 -0.008 -6.621L36.817 50 6.735 19.776c-1.823 -1.832 -1.82 -4.794 0.008 -6.621l4.427 -4.427c1.831 -1.831 4.799 -1.831 6.629 0L55.757 46.686c1.831 1.83 1.831 4.798 0 6.629z" />
  </Svg>
);
export default ChevronRight;

export const ChevronLeft = (props) => (
  <Svg
    width="20px"
    height="20px"
    viewBox="-96 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
  </Svg>
);
