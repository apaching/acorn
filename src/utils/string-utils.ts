export default function capitalizeFirstLetter(word: string): string {
  if (word.length === 0) return "";

  return word.split("")[0].toUpperCase() + word.slice(1);
}
