export const config = {
  defaultRevalidateTime: 60 * 30, // 30 min
  logRocketProject: "cegal-as/cegal-blog",
  localStorageKeys: {
    myUserName: "myUserName",
  },
  reCaptchaKey: "6LcY3DgiAAAAAJaQpaFo1vSXaPff-SLxeGBQdHk2",
  metaTags: {
    title: "Cegal Technical blog",
    mainDescription: `An internal technical blog for Cegal tech enthusiasts.`,
  },
  apiErrors: {
    tooLowRecaptchaScore: "Too low recaptcha score",
  },
  readSpeedWPM: 200,
  postsPerPage: 20,
} as const;
