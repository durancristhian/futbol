export const getPositionNumberFromName = function(positions, name) {
  let currentIndex = 1;
  let previousPosition = null;

  positions.some((currentPosition, index) => {
    if (previousPosition) {
      if (
        currentPosition.Puntos !== previousPosition.Puntos ||
        currentPosition.Ganados !== previousPosition.Ganados ||
        currentPosition.Jugados !== previousPosition.Jugados
      ) {
        currentIndex = currentIndex + 1;
      }
    }

    previousPosition = currentPosition;

    return currentPosition['Jugador/a'] === name;
  });

  return currentIndex;
};
