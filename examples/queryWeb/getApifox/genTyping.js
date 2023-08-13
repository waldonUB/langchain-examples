import { PromptTemplate } from 'langchain/prompts';
import { writeFile } from '../../../src/utils/common.js';

/**
 * 生成类型声明
 * @author waldon
 * @date 2023-08-01
 */
export const genTyping = async (chain, formatContent) => {
  const resA = await genTypingPrompt(chain, formatContent);
  await writeFile('output/logs/genYapi/类型声明模板生成代码.txt', resA.response);
  await writeFile('output/api/typing.ts', resA.response);
};

/**
 * 获取类型声明的的prompt
 * @author waldon
 * @date 2023-08-01
 */
const genTypingPrompt = async (chain, formatContent) => {
  const listRequest = `export interface ListRequest {
    xxx: xxx;
  }`;
  const updateRequest = `export interface UpdateRequest {
    xxx: xxx;
  }`;
  const listResponse = `export interface ListResponse {
    id: number;
    xxx: xxx;
  }`;
  const deleteResponse = `export interface DeleteResponse {
    id: number;
  }`;
  // Context中出现"*"符号会导致prompt解析出现问题，需要去掉或者在prompt中声明ignore
  const fullPrompt = PromptTemplate.fromTemplate(
    `Context:
    <article>{formatContent}</article>
    Prompt: generate ts code by interface
    Instructions:
    You are a skilled front-end engineer, proficient in TypeScript.Based on the given context, generate the corresponding code.
    Ignore the "*" symbol in the context.
    Examples:
    Input: /api/v1/[xxx]
    Output: {listRequest}
    Input: /api/v1/[xxx]
    Output: {updateRequest}
    Input: /api/v1/[xxx]
    Output: {listResponse}
    Input: /api/v1/[xxx]
    Output: {listResponse}
    Input: /api/v1/[xxx]
    Output: {deleteResponse}
    Constraints:
    Do not generate any content other than the code.
    Do not generate duplicate [typescript interface].
    Task:
    Generate TypeScript declarations and corresponding request interfaces.
    End of Prompt
    `,
  );
  const formattedPrompt = await fullPrompt.format({
    formatContent,
    listRequest,
    updateRequest,
    listResponse,
    deleteResponse,
  });
  return chain.call({
    input: formattedPrompt,
  });
};
