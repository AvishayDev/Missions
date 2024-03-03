function getRandomElement<T>(list: T[]): T | undefined {
  if (list.length === 0) {
    return undefined; // Return undefined if the list is empty
  }
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
