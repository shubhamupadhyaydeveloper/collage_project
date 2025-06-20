
import { Dimensions } from "react-native";

export const screenHeight = Dimensions.get('screen').height
export const screenWidth = Dimensions.get('screen').width

export enum FONTS {
  heading = "CormorantGaramond-Medium",
  heading2 = "CormorantGaramond-Regular",
}

export enum Colors {
  primary = '#16C47F',
  active = '#1054E8',
  inactive = '#666',
  lightText = "#222",
  background = '#fff',
  text = '#222',
  color1 = "#2A3B2F",
  color2 = "#1A241F",
  color3 = "#38e07b",
  color4 = "#111714"
  // text-gray-400 
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const loginImage = require('../assets/png/login.png')
export const signupImage = require('../assets/png/signup.png')
export const googleIconImage = require('../assets/png/google.png')
export const splashImage = require('../assets/png/splash.png')
