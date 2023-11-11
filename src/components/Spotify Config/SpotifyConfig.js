export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3001/";
const clientId = "013136d932f1483dab45471b7f147455";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromURL = () => {
  try {
    const token = window.location.hash.substring(1).split("&")
      .reduce((initial, item) => {
        const parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});

    console.log("Token from URL:", token);
    return token;
  } catch (error) {
    console.error("Error extracting token from URL:", error);
    return null; // or handle the error appropriately
  }
};



// const test =`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//   "%20"
// )}&response_type=token&show_dialog=true`;

// console.log("test", test)

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;