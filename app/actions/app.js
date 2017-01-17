import * as App from '../constants/app';
import { base } from '../config/firebaseApp.js';

const push = (stateName, data) => base.push(stateName, { data });
const post = (stateName, data) => base.post(stateName, { data });
const remove = (endPoint) => base.remove(endPoint);

// sync系
export const postPlayingVideo = (video) => {
  post('playingVideo', video);
  return { type: App.POST_PLAYING_VIDEO };
};
export const pushVideo = (video) => {
  push('que', video);
  return { type: App.PUSH_VIDEO };
};
export const addComment = (comment) => {
  push('comments', comment);
  return { type: App.ADD_COMMENT };
};
export const removeVideo = (index) => {
  remove(`que/${index}`);
  console.log(`que/${index}`);
  return { type: App.REMOVE_VIDEO };
};
export const changePlayed = (played) => {
  post('startTime', played);
  return { type: App.CHANGE_PLAYED, played };
};
export const play = () => {
  const playing = true;
  post('playing', playing);
  return { type: App.PLAY, playing };
};
export const pause = (startTime) => {
  const playing = false;
  post('playing', playing);
  post('startTime', startTime);
  return { type: App.PAUSE, playing, startTime };
};
export const playPause = (isPlaying) => {
  const playing = !isPlaying;
  post('playing', playing);
  return { type: App.PLAY_PAUSE, playing };
};

// local系
export const changeValueWithKey = (key, value) => ({
  type: App.CHANGE_VALUE_WITH_KEY, key, value,
});
export const changeTextWithACtive = (textType, text, flgType) => ({
  type: App.CHANGE_TEXT_WITH_ACTIVE, textType, text, flgType, value: text.length >= 1,
});
export const changeCommentText = (text) => ({
  type: App.CHANGE_COMMENT_TEXT, text, isCommentActive: text.length >= 1,
});
export const setUser = (user, isLogin) => ({ type: App.SET_USER, user, isLogin });
export const setDefaultUser = () => ({ type: App.SET_DEFAULT_USER });
export const changeVolume = (volume) => ({ type: App.CHANGE_VOLUME, volume });
export const setSearchResult = (result) => ({
  type: App.SET_SEARCH_RESULT,
  result: result.items.map((item) => ({
    videoId: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.default,
  })),
});
export const seekDown = () => ({ type: App.SEEK_DOWN });
export const seekUp = (played) => ({ type: App.SEEK_UP, played });
export const progress = (state) => {
  const { played, loaded } = state;
  const playingStatus = (state.loaded) ? { played, loaded } : { played };
  return { type: App.PROGRESS, playingStatus };
};
export const updateSyncState = (key, value) => ({ type: App.UPDATE_SYNC_STATE, key, value });
export const updateQue = (que) => ({ type: App.UPDATE_QUE, que });
export const updateComments = (comments) => ({ type: App.UPDATE_COMMENTS, comments });
export const updatePlayed = (played) => ({ type: App.UPDATE_PLAYED, played });
export const updatePlaying = (playing) => ({ type: App.UPDATE_PLAYING, playing });
export const updatePlayingVideo = (video) => ({ type: App.UPDATE_PLAYING_VIDEO, video });
