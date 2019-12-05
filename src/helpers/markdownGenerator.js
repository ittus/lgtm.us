const getMarkdown = imageURL => {
  const APP_URL = process.env.VUE_APP_URL;
  return `[![${APP_URL}](${imageURL})](${APP_URL})`;
};

export { getMarkdown };
