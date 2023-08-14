import { PromptTemplate } from 'langchain/prompts';
import { writeFile } from '../../../src/utils/common.js';

/**
 * 生成接口
 * @author waldon
 * @date 2023-08-01
 */
export const genApi = async chain => {
  const resImport = await genImportPrompt(chain);
  await writeFile('output/logs/genApifox/importType.txt', resImport.response);
  const resApi = await genApiPrompt(chain);
  await writeFile('output/logs/genApifox/api模板生成代码.txt', resApi.response);
  const IMPORT_OUTPUT = `\n// utils \nimport request from '@/utils/request';\n`;
  await writeFile('output/api/index.ts', resImport.response + IMPORT_OUTPUT + resApi.response);
};

/**
 * 根据typing生成对应的import
 * @author waldon
 * @date 2023-08-10
 */
const genImportPrompt = async chain => {
  const importCode = `import type { ListRequest, ListResponse, UpdateRequest, UpdateResponse, [xxx] } from './typing.ts';`;
  const fullPrompt = PromptTemplate.fromTemplate(
    `
    Prompt: Generate typeScript import code.
    Instructions:
    Based on the given context, generate the corresponding code.
    Examples:
    Input: ListRequest, ListResponse, UpdateRequest, UpdateResponse
    Output: {importCode}
    ### Constraints:
    Do not generate any content other than the code.
    ### Task:
    Based on the given context, generate typeScript import with interfaces.
    End of Prompt
    `,
  );
  const formattedPrompt = await fullPrompt.format({
    importCode,
  });
  return chain.call({
    input: formattedPrompt,
  });
};

/**
 * 获取接口的prompt
 * @author waldon
 * @date 2023-08-01
 */
const genApiPrompt = async chain => {
  const listRequest = `/**
  * 获取[xxx]列表
  */
  export async function get_list_api(params: ListRequest): Promise<ListResponse> {
    return request.get('/api/v1/xxx/list', params);
  }`;
  const updateRequest = `/**
  * [xxx]
  */
  export async function [xxx]_api(params: UpdateRequest): Promise<UpdateResponse> {
    return request.post('/api/v1/[xxx]', params);
  }`;
  const fullPrompt = PromptTemplate.fromTemplate(
    `
    Prompt: Generate request code.
    Instructions:
    Based on the given context, generate the corresponding code.
    Examples:
    Input: get /api/v1/[xxx]/list
    Output: {listRequest}
    Input: post /api/v1/[xxx]
    Output: {updateRequest}
    ### Constraints:
    Do not generate any content other than the code.
    ### Task:
    Based on the given context, generate typeScript request with interfaces.
    End of Prompt
    `,
  );
  const formattedPrompt = await fullPrompt.format({
    listRequest,
    updateRequest,
  });
  return chain.call({
    input: formattedPrompt,
  });
};
