import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import { config } from "./config";

export class ApiMsal {
  constructor() {
    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority,
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
      },
    });
  }

  async backendJwt(idToken) {
    try {
      console.log(idToken);
      await axios.get(config.apiUrl, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        withCredentials: true,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async login() {
    try {
      await this.publicClientApplication.initialize();
      const response = await this.publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });
      return response.idToken ? this.backendJwt(response.idToken) : false;
    } catch (e) {
      return false;
    }
  }

  logout() {
    this.publicClientApplication.logoutRedirect();
  }
}


