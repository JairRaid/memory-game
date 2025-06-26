export function generateCardGrid(gridSize = "4x4") {
  let pairCount, emptyCount;

  if (gridSize === "6x6") {
    pairCount = 9;
    emptyCount = 18;
  } else {
    // default to 4x4
    pairCount = 5;
    emptyCount = 6;
  }

  // Generate unique numbers
  const numbers = new Set();
  while (numbers.size < pairCount) {
    numbers.add(Math.floor(Math.random() * 9) + 1);
  }
  const uniqueNumbers = Array.from(numbers);

  // Create pairs
  const pairedCards = uniqueNumbers.flatMap((num) => [
    { id: crypto.randomUUID(), value: num, isFlipped: false, isMatched: false },
    { id: crypto.randomUUID(), value: num, isFlipped: false, isMatched: false },
  ]);

  // Create empty cards
  const emptyCards = Array.from({ length: emptyCount }, () => ({
    id: crypto.randomUUID(),
    value: null,
    isFlipped: false,
    isMatched: false,
    isEmpty: true,
  }));

  // Combine and shuffle
  const allCards = [...pairedCards, ...emptyCards];

  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }

  return allCards;
}
