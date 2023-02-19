import axios from "axios";
export default class AuthHandler {
  static clearAllTokens = () => {
    window.localStorage.setItem("refreshToken", JSON.stringify(null));
    window.localStorage.removeItem("refreshToken");
    document.cookie =
      "access_token=null;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  };

  static getRefreshToken = () => {
    if (typeof window !== "undefined")
      return window.localStorage.getItem("refreshToken");
  };

  static getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  static aysncGetAccessToken = async () => {
    const cookie = this.getCookie("access_token");

    if (cookie != null && cookie !== "") return cookie;

    // Access token is null so try to fetch access token
    let access_token = await this.asyncFetchAcessToken();

    // Access token may or may not be null depending on whether access token exists
    return access_token;
  };

  static asyncSetRefreshToken = async (token) => {
    window.localStorage.setItem("refreshToken", JSON.stringify(token));
    let res = await this.aysncGetAccessToken();

    return res;
  };

  static setAccessToken = (token) => {
    if (token != null) {
      let date = new Date();
      date.setTime(date.getTime() + 780000);
      // let expires = "expires=" + date.toUTCString();
      // document.cookie = `access_token=${token};${expires};path=/`;
      window.localStorage.setItem("accessToken", token);
    }
  };

  static asyncFetchAcessToken = async () => {
    let access_token = null;
    const refresh_token = this.getRefreshToken();
    if (refresh_token != null) {
      try {
        let res = await axios.post(
          `${process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL}/auth/refresh`,
          {
            refreshToken: refresh_token,
          }
        );
        if (
          res.status === 200 &&
          res.data.accessToken !== null &&
          res.data.accessToken.length !== 0
        )
          access_token = res.data.accessToken;
        // console.log("acccess: ",access_token)
        this.setAccessToken(access_token);
      } catch (err) {
        //console.log("Failed to fetch access token");
      }
    }

    this.setAccessToken(access_token);
    return access_token;
  };
}
