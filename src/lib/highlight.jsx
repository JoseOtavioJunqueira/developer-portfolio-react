// Tiny JSON syntax highlighter that returns React nodes (no innerHTML).
const TOKEN = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;

export const highlightJson = (text) => {
  const nodes = [];
  let last = 0;
  let match;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [full, str, colon, keyword, num] = match;
    if (str && colon) {
      nodes.push(
        <span key={i++} className="text-accent">
          {str}
        </span>,
        colon
      );
    } else if (str) {
      nodes.push(
        <span key={i++} className="text-primary">
          {str}
        </span>
      );
    } else if (keyword) {
      nodes.push(
        <span key={i++} className="text-warn">
          {keyword}
        </span>
      );
    } else if (num) {
      nodes.push(
        <span key={i++} className="text-danger">
          {num}
        </span>
      );
    }
    last = match.index + full.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};
