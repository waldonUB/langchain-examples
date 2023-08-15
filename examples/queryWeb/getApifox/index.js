/**
 * 爬取apifox文档生成代码
 * @author waldon
 * @date 2023-07-19
 * @link https://h861y5qddl.apifox.cn/ 该文档是mock数据，不涉及到隐私安全，可以放心使用
 */
import * as cheerio from 'cheerio';
import { OpenAIChat } from 'langchain/llms/openai';
import puppeteer from 'puppeteer';
import { writeFile, formatHtml } from '../../../src/utils/common.js';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { genApi } from './genApi.js';
import { genTyping } from './genTyping.js';
import prompts from 'prompts';
import { ConversationChain } from 'langchain/chains';
import { defaultConfig } from '../../../src/utils/define.js';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { HumanMessage, AIMessage } from 'langchain/schema';

/**
 * 生成代码开始
 * @author waldon
 * @date 2023-08-10
 */
const genStart = async userInput => {
  const formatContent = await getHtml(userInput);
  // const loader = new TextLoader('mock/announceHtml.txt');
  // const docs = await loader.load();
  // const formatContent = docs[0].pageContent;
  await writeFile('output/logs/genApifox/格式化后的html.txt', formatContent);
  const model = new OpenAIChat(defaultConfig);
  const pastMessages = [];
  const memory = new BufferMemory({
    chatHistory: new ChatMessageHistory(pastMessages),
  });
  const chain = new ConversationChain({
    memory: memory,
    llm: model,
    verbose: true,
  });
  await genTyping(chain, formatContent);
  await genApi(chain);
};

/**
 * 爬取文档并格式化
 * @author waldon
 * @date 2023-08-01
 */
const getHtml = async userInput => {
  let allHtml = '';
  const browser = await puppeteer.launch({
    // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://h861y5qddl.apifox.cn/');
  await page.waitForSelector('.ui-tree-title', { timeout: 5000 }); // 设置超时时间为 5 秒
  await page.tap('.ui-input-borderless');
  await page.type('.ui-input-borderless', userInput);
  const length = await page.$eval('.ui-tree-list-holder-inner', async elements => {
    const childElements = elements.querySelectorAll('.container___3lOB5');
    for (const [index, childElement] of childElements.entries()) {
      childElement.setAttribute('id', `container___3lOB5-child-${index}`);
    }
    return childElements.length;
  });
  for (let i = 0; i < length; i++) {
    await page.tap(`#container___3lOB5-child-${i}`);
    await new Promise(r => setTimeout(r, 500));
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    const _format = formatHtml($(`.content___1wjn-`));
    allHtml += _format;
  }
  await browser.close();
  return allHtml;
};

/**
 * 聊天数据持久化
 * @author waldon
 * @date 2023-07-30
 */
(async () => {
  const interactiveArr = [
    {
      type: 'text',
      name: 'userInput',
      message: `请输入要生成的模块（比如："公告管理"或"字典管理"）:`,
      validate: value => {
        if (!value) {
          return '内容为必填！';
        }
        return true;
      },
    },
  ];
  const response = await prompts(interactiveArr);
  const { userInput } = response;
  if (!userInput) {
    return;
  }
  genStart(userInput);
})();
