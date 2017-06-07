/* eslint-disable no-undef */

// 默认获得焦点，未登录时，默认是登录页面中的 tos 机场三字码，登录后为 cmd 命令输入框
const defaultId = 'cmd';

// 默认可选区域
const defaultBlockId = 'all';

// 区域可选项集合 Map<区域ID, Set<可选项ID>>
const blocks = new Map();

// 区域快捷键
const blockShortcutKey = new Map();

const navigationConstant = {
  defaultBlockId,
  blocks,
  blockShortcutKey,
  defaultActiveId: defaultId,
  currentActiveId: defaultId,
};

const resolveKey = (key) => {
  const keys = key.split('#');
  let itemId = null;
  let blockId = null;
  if (keys.length === 1) {
    itemId = keys[0];
    blockId = navigationConstant.defaultBlockId;
  } else {
    itemId = keys[1];
    blockId = keys[0];
  }
  return { blockId, itemId };
};

const getCls = (activeId, key, defaultCls) => {
  const { blockId, itemId } = resolveKey(key);
  let activeClass = 'dcs-active';
  if (itemId.startsWith('tr')) {
    activeClass = 'dcs-table-active';
  }
  const originCls = defaultCls || '';
  const newCls = ` dcs-selectable dcs-item-${blockId}#${itemId} ${originCls} `;
  return activeId === itemId ? ` ${activeClass} ${newCls}` : ` ${newCls} `;
};

const deal = (item, key) => {
  const { blockId, itemId } = resolveKey(key);
  if (item !== null) {
    if (itemId !== null) {
      if (!navigationConstant.blocks.has(blockId)) {
        navigationConstant.blocks.set(blockId, new Set());
      }
      if (!navigationConstant.blocks.get(blockId).has(itemId)) {
        navigationConstant.blocks.get(blockId).add(itemId);
      }
    } else {
      navigationConstant.blocks.delete(blockId);
    }
  } else if (navigationConstant.blocks.has(blockId)) {
    navigationConstant.blocks.get(blockId).delete(itemId);
  }
};

export {
  getCls,
  deal,
  resolveKey,
  navigationConstant,
};
