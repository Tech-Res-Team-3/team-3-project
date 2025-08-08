import { ConfigPlugin, withAppBuildGradle, withProjectBuildGradle } from "@expo/config-plugins";

const addGoogleServicesPlugin = (appBuildGradle: string): string => {
  if (!appBuildGradle.includes('apply plugin: "com.google.gms.google-services"')) {
    appBuildGradle += '\napply plugin: "com.google.gms.google-services"\n';
  }
  return appBuildGradle;
};

const addObjectMaxLine = (appBuildGradle: string): string => {
  const regex = /externalNativeBuild\s*{[^}]*cmake\s*{[^}]*}/s;
  if (regex.test(appBuildGradle) && !appBuildGradle.includes('"-DCMAKE_OBJECT_PATH_MAX=1024"')) {
    appBuildGradle = appBuildGradle.replace(
      /(externalNativeBuild\s*{[^}]*cmake\s*{)([^}]*)(})/s,
      (match, p1, p2, p3) => {
        if (p2.includes('"-DCMAKE_OBJECT_PATH_MAX=1024"')) return match;
        return `${p1}${p2.trim()}\n                arguments "-DCMAKE_OBJECT_PATH_MAX=1024"\n${p3}`;
      }
    );
  }
  return appBuildGradle;
};

const withCustomGradle: ConfigPlugin = (config) => {
  // android/app/build.gradle
  config = withAppBuildGradle(config, (config) => {
    let contents = config.modResults.contents;
    contents = addGoogleServicesPlugin(contents);
    contents = addObjectMaxLine(contents);
    config.modResults.contents = contents;
    return config;
  });

  // android/build.gradle (top-level)
  config = withProjectBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes("com.google.gms:google-services")) {
      config.modResults.contents = config.modResults.contents.replace(
        /dependencies\s*{([\s\S]*?)}/,
        (match, deps) =>
          `dependencies {${deps}\n    classpath('com.google.gms:google-services:4.4.3')\n}`
      );
    }
    return config;
  });

  return config;
};

export default withCustomGradle;