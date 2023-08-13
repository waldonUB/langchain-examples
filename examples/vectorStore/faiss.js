import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OPENAI_API_KEY } from '../../src/utils/define.js'

// Create a vector store through any method, here from texts as an example
const vectorStore = await FaissStore.fromTexts(
  ["Hello world", "Bye bye", "hello nice world"],
  [{ id: 2 }, { id: 1 }, { id: 3 }],
  new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
);

// Save the vector store to a directory
const directory = "src/vectorStore";

await vectorStore.save(directory);

// Load the vector store from the same directory
const loadedVectorStore = await FaissStore.load(
  directory,
  new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
);

// vectorStore and loadedVectorStore are identical
const result = await loadedVectorStore.similaritySearch("hello world", 1);
console.log(result);