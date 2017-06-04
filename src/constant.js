/* eslint-disable import/no-mutable-exports,prefer-const */
// 命令输入框
const cmd = 'cmd';

// 默认可选区域
const defaultBlockId = 'default';

let blocks = new Map();
let defaultActiveId = cmd;
let currentActiveId = cmd;

export { defaultBlockId, blocks, defaultActiveId, currentActiveId };
