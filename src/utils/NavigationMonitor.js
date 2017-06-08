import key from 'keymaster';

// 导航监控上下文
const context = {
  // 当前选中区域
  currentBlockId: 'all',
  // 默认可选区域
  defaultBlockId: 'all',
  // 区域可选项集合 Map<区域ID, Set<可选项ID>>
  blocks: new Map(),
  // esc 返回最终获得焦点ID，未登录时，默认是登录页面中的 tos 机场三字码，登录后为 cmd 命令输入框
  defaultActiveId: 'cmd',
  // 当前获是焦点元素ID，默认是登录页面中的 tos 机场三字码，登录后为 cmd 命令输入框
  currentActiveId: 'cmd',
};

const updateBlock = (blockId, activeId) => {
  context.currentBlockId = blockId;
  context.currentActiveId = activeId;
};

// 解析className为 blockId, itemId
const resolveKey = (itemKey) => {
  const keys = itemKey.split('#');
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

// 监听选区快捷键
const register = (block, blockId, shortcutKeyMap, dispatch) => {
  if (block !== null && block !== undefined) {
    // 注册快捷键
    for (const [shortcutKey, method] of shortcutKeyMap) {
      key(shortcutKey, blockId, (event) => {
        if (typeof method === 'function') {
          method.call(this, dispatch, event);
        }
      });
    }
  } else {
    // 删除快捷键
    for (const shortcutKey of shortcutKeyMap.keys()) {
      key.unbind(shortcutKey, blockId);
    }
    key.deleteScope(blockId);
  }
};

//  获取导航显示样式
const show = (activeId, itemKey, defaultCls) => {
  const { blockId, itemId } = resolveKey(itemKey);
  let activeClass = 'dcs-active';
  if (itemId.startsWith('tr')) {
    activeClass = 'dcs-table-active';
  }
  const originCls = defaultCls || '';
  const newCls = ` dcs-selectable dcs-item-${blockId}#${itemId} ${originCls} `;
  return context.currentBlockId === blockId && activeId === itemId ? ` ${activeClass} ${newCls}` : ` ${newCls} `;
};

// 监听节点变化
const watch = (item, itemKey) => {
  const { blockId, itemId } = resolveKey(itemKey);
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

export { register, show, watch, resolveKey, updateBlock, context };
