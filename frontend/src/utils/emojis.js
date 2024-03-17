export const funEmojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "😗",
  "😙",
  "😛",
  "😜",
  "😝",
  "🤓",
  "😎",
  "😶",
  "😐",
  "😑",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "😳",
];

const getRandomEmoji = () => {
  return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};

export default getRandomEmoji; // returns