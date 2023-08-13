import { PromptTemplate } from "langchain/prompts";
const fullPrompt = PromptTemplate.fromTemplate(`
你是一个前端工程师.
你精通ant design vue框架, 并且很擅长写vue3的代码.
请问 {question} ?
`);

const formattedPrompt = await fullPrompt.format({
  question: "如何实现一个form表单",
});

console.log(`formattedPrompt: `, formattedPrompt);
