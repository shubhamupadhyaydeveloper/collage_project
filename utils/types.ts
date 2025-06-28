import { NavigatorScreenParams } from "@react-navigation/native"

export type GenerateNavigationType = {
  GenerateHome: undefined;
  QuizPage: {data :any};
  ResultPage : {score : number, totalQuestions:number, data :any};
};

export type ProfileNavigationType = {
  Profile : undefined;
  ForgetPassword : undefined
}


export type BottomTabNavigationType = {
  Home: undefined,
  Generate: NavigatorScreenParams<GenerateNavigationType>,
  Profile: NavigatorScreenParams<ProfileNavigationType>,
  Saved : undefined
}

export type RootStackNavigationType = {
  App: NavigatorScreenParams<BottomTabNavigationType>,
  Auth: NavigatorScreenParams<AuthStackNavigationType>,
  Splash: undefined;
  DeepLinking : {id : string}
}

export type AuthStackNavigationType = {
  Login: undefined,
  Register: undefined,
  EmailVerification : undefined
}