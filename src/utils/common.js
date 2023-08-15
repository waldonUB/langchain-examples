import fs from 'fs';
// 写本地文件
export const writeFile = async (filepath, content) => {
  await fs.writeFile(filepath, content, err => {
    if (err) {
      console.log(err);
    }
  });
};

// 追加本地文件
export const appendFile = async (filepath, content) => {
  await fs.appendFile(filepath, content, err => {
    if (err) {
      console.log(err);
    }
  });
};

/**
 * 递归遍历节点并添加空格
 * @author waldon
 * @date 2023-08-01
 */
export const formatHtml = nodes => {
  let text = '';
  for (const node of nodes) {
    if (node.type === 'text') {
      // 如果是文本节点，将其内容加上空格隔开
      text = `${text} ${node.data.trim()}`;
    } else if (node.children) {
      text = text + formatHtml(node.children);
    }
  }
  text = text.replace(
    /示例代码 Shell JavaScript Java Swift Go PHP Python HTTP C C# Objective-C Ruby OCaml Dart R /g,
    '',
  );
  return text;
};

/**
 * 提取```typescript中的代码
 * @author waldon
 * @date 2023-08-02
 */
export const extractCode = text => {
  const pattern = /```typescript([\s\S]+)```/g;
  const matches = pattern.exec(text);
  return matches?.length ? matches[1] : text;
};
