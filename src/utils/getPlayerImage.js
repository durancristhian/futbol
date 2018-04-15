export const getPlayerImage = function(pictureURL, size = 'small') {
  return pictureURL
    ? `https://avatars.io/${pictureURL}/${size}`
    : 'https://placehold.it/32x32/bbbbbb/bbbbbb;';
};
