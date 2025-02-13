import API from "./baseService";
import { Settings } from "../../config";

export const getPost = (postId) =>
  API.get("/api/feed/" + postId).then((response) => response.data);

export const getFeed = () =>
  API.get("/api/feed/?limit=" + Settings.Home_PostsPerPage).then(
    (response) => response.data
  );

export const getMoreFeed = (publishedBefore) =>
  API.get(
    "/api/feed/?publishedBefore=" +
      publishedBefore +
      "&limit=" +
      Settings.Home_PostsPerPage
  ).then((response) => response.data);

export const getFeedForChannel = (channelId) =>
  API.get(
    "/api/feed/channel/" + channelId + "/?limit=" + Settings.Home_PostsPerPage
  ).then((response) => response.data);

export const getMoreFeedForChannel = (channelId, publishedBefore) =>
  API.get(
    "/api/feed/channel/" +
      channelId +
      "/?publishedBefore=" +
      publishedBefore +
      "&limit=" +
      Settings.Home_PostsPerPage
  ).then((response) => response.data);

export const createPost = async (post, token) => {
  await API.post("/api/feed", post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("feedService.createPost RESPONSE");
      // this works
      console.log(response.data);

      // TODO: response.data is of type ReadableNativeMap, which doesn't convert to a string nicely
      // don't have a solution, but at least this is a clue

      // for some reason, we're getting undefined after return
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      debugger;
    });
};

export const hidePost = (postId, token) =>
  API.delete("/api/feed/" + postId + "/active", {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.data);

export const engageNotification = (postId, pushToken) =>
  API.post("/api/notifications/" + postId + "/engagements", {
    pushToken: pushToken,
    engagedAt: new Date().toISOString(),
  }).then((response) => response.data);

export const getEngagementSummary = (postId) =>
  API.get("/api/notifications/" + postId).then((response) => response.data);
