import { AppConfig, UserSession } from "@stacks/auth";

export const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });
