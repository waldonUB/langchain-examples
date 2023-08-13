/**
 * 通过向量搜索，再通过提问
 * @author waldon
 * @date 2023-07-11
 */
import { OpenAI } from 'langchain/llms/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
import { OPENAI_API_KEY } from '../../src/utils/define.js';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { LLMChain } from 'langchain/chains';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { HumanMessage, SystemMessage } from 'langchain/schema';

export const run = async () => {
  const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0 });
  const loader = new DocxLoader('docs/mock.docx');
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await loader.loadAndSplit(splitter);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
  );

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    verbose: true,
  });
  const res = await chain.call({
    query: `
    汇总以下信息:
    Tag
    接口路径
    请求参数
    `,
  });
  console.log('第一条链res: ', res);
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `
      你是一个前端工程师, 精通typescript.
      请使用用户输入信息中的接口发送axios请求.
      `,
    ),
    HumanMessagePromptTemplate.fromTemplate('{text}'),
  ]);
  const chainA = new LLMChain({ llm: model, prompt: chatPrompt });
  const resA = await chainA.call({
    text: res.text,
  });
  console.log({ resA });
};
run();
