import * as React from 'react';
import { Svg, Path, G, Polygon, SvgProps } from 'react-native-svg';

interface IProps extends SvgProps {}

export const svgHeight = 127.09;
export const svgWidth = 247.68;

const Logo: React.SFC<IProps> = props => (
  <Svg
    viewBox="0 0 247.68 127.09"
    width={svgWidth}
    height={svgWidth}
    {...props}
  >
    <G>
      <G>
        <Path d="M44.33,120.08v1.06H40.54V123h3.4v1h-3.4V126h3.91V127H39.37v-7Z" />
        <Path d="M49.76,120.08l2.29,4.62,2.28-4.62h1.39v7H54.63v-5.2l-2.19,4.47h-.77l-2.19-4.47V127H48.36v-7Z" />
        <Path d="M65.56,122.46c0,1.57-1,2.48-2.75,2.48h-1.6V127H60v-7h2.78C64.55,120.08,65.56,121,65.56,122.46Zm-1.12,0c0-.92-.61-1.35-1.68-1.35H61.21v2.75h1.55C63.83,123.89,64.44,123.43,64.44,122.49Z" />
        <Path d="M76,123.56a3.69,3.69,0,1,1-3.69-3.51A3.56,3.56,0,0,1,76,123.56Zm-6.18,0a2.49,2.49,0,0,0,2.5,2.47,2.46,2.46,0,1,0-2.5-2.47Z" />
        <Path d="M80,120.08l1.69,5.66,1.68-5.66h1.15l1.69,5.66,1.68-5.66h1.21l-2.33,7h-1.2l-1.65-5.43L82.26,127H81.05l-2.3-7Z" />
        <Path d="M97.37,120.08v1.06H93.58V123H97v1H93.58V126h3.91V127H92.4v-7Z" />
        <Path d="M105.81,127l-1.27-2.11h-2V127H101.4v-7h2.82c1.78,0,2.81.87,2.81,2.38a2.23,2.23,0,0,1-1.45,2.25l1.56,2.33Zm-1.59-3.15c1.08,0,1.69-.46,1.69-1.4s-.61-1.35-1.69-1.35h-1.64v2.75Z" />
        <Path d="M112.24,120.08v7h-1.17v-7Z" />
        <Path d="M117.7,120.08l3.73,5v-5h1.15v7h-1.15l-3.71-5v5h-1.17v-7Z" />
        <Path d="M131.66,123.62h1v2.56a4.68,4.68,0,0,1-2.7.91,3.52,3.52,0,1,1,.07-7,4.15,4.15,0,0,1,2.67,1l-.66.86a3,3,0,0,0-2-.79,2.47,2.47,0,1,0,0,4.93,3.32,3.32,0,0,0,1.6-.47Z" />
        <Path d="M146.77,125.47h-3.5L142.6,127h-1.22l3.07-7h1.2l3,7h-1.25Zm-.44-1L145,121.33l-1.31,3.09Z" />
        <Path d="M156.16,120.08v1.06H154V127h-1.18v-5.9h-2.19v-1.06Z" />
        <Path d="M160.82,120.08v3h3.68v-3h1.18v7H164.5v-2.88h-3.68V127h-1.17v-7Z" />
        <Path d="M171.16,120.08V126h3V127H170v-7Z" />
        <Path d="M182.74,120.08v1.06H179V123h3.39v1H179V126h3.91V127h-5.09v-7Z" />
        <Path d="M191.52,120.08v1.06h-2.2V127h-1.18v-5.9H186v-1.06Z" />
        <Path d="M200,120.08v1.06h-3.79V123h3.39v1h-3.39V126h3.91V127H195v-7Z" />
        <Path d="M206.2,121.14c-.68,0-1.13.25-1.13.72,0,1.52,3.75.71,3.74,3.21,0,1.24-1.09,2-2.62,2a4.25,4.25,0,0,1-2.84-1.11l.51-1a3.63,3.63,0,0,0,2.35,1c.81,0,1.3-.3,1.3-.84,0-1.55-3.75-.69-3.75-3.16,0-1.19,1-1.94,2.53-1.94a4.49,4.49,0,0,1,2.43.72l-.48,1A4.23,4.23,0,0,0,206.2,121.14Z" />
      </G>
      <Path d="M20.69,99.32H9.4L7,104H0L14.45,77.64h7L29.17,104H21.9Zm-1.37-5.26L16.9,84.67l-4.81,9.39ZM53,77.64l-.69,5.68H44.49L42,104H35.14l2.54-20.66H29.93l.69-5.68Zm10.52,0L62.21,88.39H72.75l1.32-10.75h6.82L77.66,104H70.84l1.24-10.11H61.54L60.3,104H53.48l3.24-26.34Zm30.19,0L91.2,98.12h11.07l-.72,5.86H83.67L86.9,77.64Zm35.7,0-.68,5.49H115l-.6,4.92H126.8l-.67,5.45-12.45,0-.61,5h14.16l-.67,5.49h-21l3.24-26.34Zm25.6,0-.7,5.68H146.5L144,104h-6.82l2.53-20.66h-7.74l.69-5.68Zm10.52,0L162.31,104h-6.82l3.23-26.34Zm17.72,5.64a8.25,8.25,0,0,0-8,7.4c-.52,4.24,2.13,7.48,6.16,7.48a11,11,0,0,0,6.86-3.09l3.45,4.32a17.67,17.67,0,0,1-11.44,4.89c-7.86,0-13-5.79-12-13.53a15.47,15.47,0,0,1,15.6-13.29,13.13,13.13,0,0,1,10,4.5l-4.54,4.77A7.66,7.66,0,0,0,183.26,83.28Zm24.15,15.14c3,0,5.36-2.07,5.78-5.49l1.87-15.29h6.82L220,92.93c-.86,6.95-6,11.35-13.36,11.35s-11.57-4.4-10.71-11.35l1.88-15.29h6.81l-1.87,15.29C202.34,96.31,204.32,98.42,207.41,98.42Zm29-15.48c-1.64,0-2.8.6-2.94,1.8-.54,4.36,13.51,1.88,12.35,11.35-.66,5.37-5.69,8.11-11.5,8.11a17.42,17.42,0,0,1-11.51-4.2l3.3-5.38a14.59,14.59,0,0,0,9,4c2,0,3.37-.76,3.54-2.15.55-4.47-13.53-1.76-12.38-11.08.6-4.92,5.12-8,11.42-8a18,18,0,0,1,10.06,3l-3.24,5.45C241.88,84.18,238.53,82.94,236.37,82.94Z" />
      <Path d="M20.69,99.32H9.4L7,104H0L14.45,77.64h7L29.17,104H21.9Zm-1.37-5.26L16.9,84.67l-4.81,9.39ZM53,77.64l-.69,5.68H44.49L42,104H35.14l2.54-20.66H29.93l.69-5.68Zm10.52,0L62.21,88.39H72.75l1.32-10.75h6.82L77.66,104H70.84l1.24-10.11H61.54L60.3,104H53.48l3.24-26.34Zm30.19,0L91.2,98.12h11.07l-.72,5.86H83.67L86.9,77.64Zm35.7,0-.68,5.49H115l-.6,4.92H126.8l-.67,5.45-12.45,0-.61,5h14.16l-.67,5.49h-21l3.24-26.34Zm25.6,0-.7,5.68H146.5L144,104h-6.82l2.53-20.66h-7.74l.69-5.68Zm10.52,0L162.31,104h-6.82l3.23-26.34Zm17.72,5.64a8.25,8.25,0,0,0-8,7.4c-.52,4.24,2.13,7.48,6.16,7.48a11,11,0,0,0,6.86-3.09l3.45,4.32a17.67,17.67,0,0,1-11.44,4.89c-7.86,0-13-5.79-12-13.53a15.47,15.47,0,0,1,15.6-13.29,13.13,13.13,0,0,1,10,4.5l-4.54,4.77A7.66,7.66,0,0,0,183.26,83.28Zm24.15,15.14c3,0,5.36-2.07,5.78-5.49l1.87-15.29h6.82L220,92.93c-.86,6.95-6,11.35-13.36,11.35s-11.57-4.4-10.71-11.35l1.88-15.29h6.81l-1.87,15.29C202.34,96.31,204.32,98.42,207.41,98.42Zm29-15.48c-1.64,0-2.8.6-2.94,1.8-.54,4.36,13.51,1.88,12.35,11.35-.66,5.37-5.69,8.11-11.5,8.11a17.42,17.42,0,0,1-11.51-4.2l3.3-5.38a14.59,14.59,0,0,0,9,4c2,0,3.37-.76,3.54-2.15.55-4.47-13.53-1.76-12.38-11.08.6-4.92,5.12-8,11.42-8a18,18,0,0,1,10.06,3l-3.24,5.45C241.88,84.18,238.53,82.94,236.37,82.94Z" />
      <Path d="M153.15,2.79l-3,0a26,26,0,0,1,2.41,2.5l.16.2L125.52,37.18l.15.17,2.47,2.86,25.23-26.94V2.79Z" />
      <Path d="M130.24,42.68l2.48,2.89,20.5-19.78a20,20,0,0,0,.15-2.44v-5.5L130.14,42.56Z" />
      <Path d="M134.37,48.59l-.51.49-2.16-2.52-2.54-3-2-2.35-2.56-3L96.43,5.39A23.86,23.86,0,0,1,99,2.7l-3.25,0V13.21l26.29,28L124.59,44l2.11,2.24,2.54,2.71,2.25,2.4,2.22,2.37L134,54l2.37-2,.55-.46.53-.47.74-.65c.47-.38.92-.77,1.38-1.15l.08-.06L140,49a44,44,0,0,0,8.28-9.43c.25-.36.47-.74.68-1.08a34,34,0,0,0,3-6.48l-17,16.08Z" />
      <Path d="M129.27,53.44,127,51.07l-2.45-2.6-2.1-2.25L120,43.6,95.75,17.78v5.53c0,.8.06,1.59.12,2.39v0l21.62,20.84L120,48.93l2.2,2.14,2.44,2.35,2.33,2.23,1.52,1.46.91.89,2.35-2-.59-.62Z" />
      <Path d="M124.59,57.85l-2.33-2.2-2.35-2.21-2.21-2.11-2.37-2.25L97.18,31.91a33,33,0,0,0,3,6.5l.72,1.18a43.09,43.09,0,0,0,7.45,8.66l.07.07,2.5,2.12,0,0c.08.06.13.12.21.17l0,0a.5.5,0,0,0,.11.1l1.5,1.27,2.37,2,2.33,2,2.35,2,2.42,2,1.5,1.27.83.7.84-.7,1.49-1.27-1.23-1.16Z" />
      <Polygon points="138.13 7.97 139.42 10.22 139.72 7.58 142.29 6.98 139.9 5.98 140.23 3.37 138.43 5.38 136.04 4.38 137.36 6.6 135.56 8.62 138.13 7.97" />
      <Polygon points="122.47 6.7 124.55 5.06 126.64 6.59 125.85 4.06 127.95 2.47 125.36 2.52 124.59 0 123.77 2.57 121.18 2.63 123.29 4.12 122.47 6.7" />
      <Polygon points="109.43 7.58 109.72 10.27 110.96 7.93 113.5 8.47 111.74 6.48 113.01 4.18 110.67 5.28 108.94 3.29 109.24 5.97 106.89 7.07 109.43 7.58" />
      <Polygon points="121.54 30.93 122.41 33.54 124.59 36.1 126.77 33.54 127.64 30.93 124.59 30.93 121.54 30.93" />
      <Path d="M125.37,17.77a10.51,10.51,0,0,1,1.13-.86A3.71,3.71,0,0,0,128.1,15a2.83,2.83,0,0,0-.36-2.28,8.88,8.88,0,0,1-.35,1.15,5.8,5.8,0,0,1-2.14,2.2,4.19,4.19,0,0,0-1.39,1.57,2.43,2.43,0,0,0,1,3.13,3.63,3.63,0,0,0,.83.24C125.75,21,123.85,19.28,125.37,17.77Z" />
      <Path d="M128.11,18.05a1.82,1.82,0,0,1,0,.89.69.69,0,0,1-.66.64.64.64,0,0,1-.65-.64.93.93,0,0,1,.31-.62c.42-.57,1.19-1.2,1.06-2.19-.44,1-1,1-1.78,1.71-1.84,1.82.2,2.95,1.21,2.78C129.34,20.17,128.66,18.94,128.11,18.05Z" />
      <Path d="M125,15.6c1.22-.85,2.23-1.83,2-3.51a6.79,6.79,0,0,0-1.1-2.47,7.33,7.33,0,0,1-2.78,5.68c-.31.13.24-.58.24-.58l-1.86,1.15-.25.29a6.58,6.58,0,0,0-.62.45.37.37,0,0,0,0,.23c0,.09,0,.42,0,.42a.86.86,0,0,1,1-.36c.31.05.66,1.11,1.28,2.45a2.91,2.91,0,0,0,.49.57A3.24,3.24,0,0,1,125,15.6Zm-3.24.63-.21.09s.16-.2.16-.2l.26,0Z" />
      <Polygon points="130.02 26.72 132.43 22.74 124.65 22.74 116.87 22.74 119.28 26.72 130.02 26.72" />
      <Polygon points="129.16 28.13 120.14 28.13 120.98 29.51 124.65 29.55 128.32 29.51 129.16 28.13" />
    </G>
  </Svg>
);

export default Logo;
