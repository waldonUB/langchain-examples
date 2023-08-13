import { ConversationChain } from 'langchain/chains';
import { OpenAIChat } from 'langchain/llms/openai';
import { defaultConfig } from '../../src/utils/define.js';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { HumanMessage, AIMessage } from 'langchain/schema';

/**
 * 最基础的memory chat，用于测试memory的基本功能
 * @author waldon
 * @date 2023-08-01
 */
const run = async () => {
  const model = new OpenAIChat(defaultConfig);
  const pastMessages = [
    new HumanMessage('Hi! I am waldon.'),
    new AIMessage('Hello waldon! It is nice to meet you. How can I assist you today?'),
    new HumanMessage('我的职业是程序猿.'),
    new AIMessage('收到'),
  ];
  const memory = new BufferMemory({
    chatHistory: new ChatMessageHistory(pastMessages),
  });
  const chain = new ConversationChain({
    memory: memory,
    llm: model,
    verbose: true,
  });
  await chain.call({ input: '我喜欢打羽毛球' });
  await chain.call({
    input: '我是谁？我的职业是什么？我的兴趣爱好是什么?',
  });
};
run();
