## 简要说明
- 所有example中的示例可以直接通过node ./examples/xx.js运行
- 如果运行较久没有结果，可能是非海外网络的问题。
- openai的key需要自行申请。


里面的示例都依赖于define.js这个文件，里面包含openai的key等信息，没有上传到git，需要自己在src/utils/define.js下定义：

```js
export const OPENAI_API_KEY = 'sk-xxxx';

// Azure API
export const AZURE_API_KEY = 'xxx';
export const AZURE_ENDPOINT = 'xxx';
export const AZURE_INSTANCE_NAME = 'xxx';
export const AZURE_DEPLOYMENT_NAME = 'xxx';
export const AZURE_DEPLOYMENT_16K_NAME = 'xxx';
export const AZURE_EMBEDDING_DEPLOYMENT_NAME = 'xxx';
export const AZURE_VERSION = 'xxx';

export const defaultConfig = {
  openAIApiKey: OPENAI_API_KEY,
  // azureOpenAIApiKey: AZURE_API_KEY, // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
  // azureOpenAIApiInstanceName: AZURE_INSTANCE_NAME, // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
  // azureOpenAIApiVersion: AZURE_VERSION, // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
  temperature: 0, // 必须是0，保证生成的稳定性
  modelName: 'gpt-3.5-turbo', // 视具体情况使用'text-davinci-003'
  maxTokens: 4096, // -1不限制token数量
};
```