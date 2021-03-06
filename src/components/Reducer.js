export const initialState = {
  user: null,
  token: null,
  playlists: [],
  playing: false,
  item: null,
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_SONG":
      return {
        ...state,
        songs: action.songs,
      };
    case "SET_ALBUMS":
      return {
        ...state,
        albums: action.albums,
      };
      case "SET_ALBUM_TRACKS":
      return {
        ...state,
        albumTracks: action.albumTracks,
      };
    default:
      return state;
  }
};

export default reducer;
