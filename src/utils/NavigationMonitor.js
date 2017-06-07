
// 导航监控上下文
const context = {
  // 默认可选区域
  defaultBlockId: 'all',
  // 区域可选项集合 Map<区域ID, Set<可选项ID>>
  blocks: new Map(),
  // 区域快捷键
  blockShortcutKey: new Map(),
  // esc 返回最终获得焦点ID，未登录时，默认是登录页面中的 tos 机场三字码，登录后为 cmd 命令输入框
  defaultActiveId: 'cmd',
  // 当前获是焦点元素ID，默认是登录页面中的 tos 机场三字码，登录后为 cmd 命令输入框
  currentActiveId: 'cmd',
};

// 解析className为 blockId, itemId
const resolveKey = (key) => {
  const keys = key.split('#');
  let itemId = null;
  let blockId = null;
  if (keys.length === 1) {
    itemId = keys[0];
    blockId = context.defaultBlockId;
  } else {
    itemId = keys[1];
    blockId = keys[0];
  }
  return { blockId, itemId };
};

//  获取导航显示样式
const show = (activeId, key, defaultCls) => {
  const { blockId, itemId } = resolveKey(key);
  let activeClass = 'dcs-active';
  if (itemId.startsWith('tr')) {
    activeClass = 'dcs-table-active';
  }
  const originCls = defaultCls || '';
  const newCls = ` dcs-selectable dcs-item-${blockId}#${itemId} ${originCls} `;
  return activeId === itemId ? ` ${activeClass} ${newCls}` : ` ${newCls} `;
};

// 监听节点变化
const watch = (item, key) => {
  const { blockId, itemId } = resolveKey(key);
  if (item !== null) {
    if (itemId !== null) {
      if (!context.blocks.has(blockId)) {
        context.blocks.set(blockId, new Set());
      }
      if (!context.blocks.get(blockId).has(itemId)) {
        context.blocks.get(blockId).add(itemId);
      }
    } else {
      context.blocks.delete(blockId);
    }
  } else if (context.blocks.has(blockId)) {
    context.blocks.get(blockId).delete(itemId);
  }
};

export { show, watch, resolveKey, context };
