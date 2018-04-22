export const getPlayerImage = function(pictureURL) {
  return pictureURL
    ? `https://avatars.io/${pictureURL}/large`
    : 'https://placehold.it/32x32/bbbbbb/bbbbbb;';
};
