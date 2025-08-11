import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import fs from "fs";
import path from "path";

const withGoogleServicesJson: ConfigPlugin = (config) => {
    return withDangerousMod(config, [
        "android",
        async (config) => {
            const projectRoot = config.modRequest.projectRoot;
            const src = path.join(projectRoot, "google-services.json"); // Place your file here
            const dest = path.join(
                projectRoot,
                "android",
                "app",
                "google-services.json"
            );

            if (fs.existsSync(src)) {
                fs.copyFileSync(src, dest);
                console.log("✅ google-services.json copied to android/app/");
            } else {
                console.warn(
                    "⚠️ google-services.json not found at project root. Skipping copy."
                );
            }
            return config;
        },
    ]);
};

export default withGoogleServicesJson;