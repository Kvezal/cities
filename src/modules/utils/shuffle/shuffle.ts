export const shuffle = <Item>(someArray: Item[]): Item[] => {
  const newArray: Item[] = someArray.slice();
  for (let i: number = newArray.length - 1; i > 0; i--) {
    const randomPosition: number = Math.floor(Math.random() * i);
    [newArray[i], newArray[randomPosition]] = [newArray[randomPosition], newArray[i]];
  }
  return newArray;
};
