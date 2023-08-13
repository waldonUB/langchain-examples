import axios from 'axios';
/**
 * copy from langchainjs
 * @date 2023-07-20
 * @link https://github1s.com/hwchase17/langchainjs/blob/HEAD/langchain/src/tools/webbrowser.ts#L79
 */
export const getHtml = async (baseUrl, h, config) => {
  const domain = new URL(baseUrl).hostname;

  const headers = { ...h };
  // these appear to be positional, which means they have to exist in the headers passed in
  headers.Host = domain;
  headers["Alt-Used"] = domain;

  let htmlResponse;
  try {
    htmlResponse = await axios.get(baseUrl, {
      ...config,
      headers,
    });
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status) {
      throw new Error(`http response ${e.response.status}`);
    }
    throw e;
  }

  const allowedContentTypes = [
    "text/html",
    "application/json",
    "application/xml",
    "application/javascript",
    "text/plain",
  ];

  const contentType = htmlResponse.headers["content-type"];
  const contentTypeArray = contentType.split(";");
  if (
    contentTypeArray[0] &&
    !allowedContentTypes.includes(contentTypeArray[0])
  ) {
    throw new Error("returned page was not utf8");
  }
  return htmlResponse.data;
};