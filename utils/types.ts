import { NavigatorScreenParams } from "@react-navigation/native"

export type GenerateNavigationType = {
  GenerateHome: undefined;
  QuizPage: {data :any};
  ResultPage : {score : number, totalQuestions:number};
};

export type ProfileNavigationType = {
  Profile : undefined;
  ForgetPassword : undefined
}


export type BottomTabNavigationType = {
  Home: undefined,
  Generate: NavigatorScreenParams<GenerateNavigationType>,
  Profile: NavigatorScreenParams<ProfileNavigationType>,
}

export type RootStackNavigationType = {
  App: NavigatorScreenParams<BottomTabNavigationType>,
  Auth: NavigatorScreenParams<AuthStackNavigationType>,
  Splash: undefined
}

export type AuthStackNavigationType = {
  Login: undefined,
  Register: undefined,
  EmailVerification : undefined
}