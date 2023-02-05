type TextPhrases = {
  success: string;
  loading: string;
};

export const printFrameLoading = async (
  cur: () => number,
  max: number,
  text: TextPhrases
) => {
  console.clear();

  const percentage = Math.floor((cur() / max) * 100) / 10;
  if (percentage >= 10) {
    console.log(text?.success);
    return;
  }

  const completed = "🟩".repeat(percentage);
  const missing = "⬜".repeat(10 - Math.floor(percentage));

  console.log(`
    \r${text?.loading} (${percentage * 10}%)
    \r${completed + missing}
  `);

  setTimeout(() => {
    printFrameLoading(cur, max, text);
  }, 300);
};
