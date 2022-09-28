export const config = {
  defaultRevalidateTime: 60 * 30, // 30 min
  logRocketProject: "cegal-as/cegal-blog",
  localStorageKeys: {
    myUserName: "myUserName",
  },
  reCaptchaKey: "6LcY3DgiAAAAAJaQpaFo1vSXaPff-SLxeGBQdHk2",
  metaTags: {
    title: "Curious Programming Blog",
    mainDescription: `A collection of blog post, videos and more for mainly frontend developers, but also so much more. Everything from low level processor architecture to developer rights and more.`,
  },
  apiErrors: {
    tooLowRecaptchaScore: "Too low recaptcha score",
  },
  readSpeedWPM: 200,
  postsPerPage: 3,
} as const;
