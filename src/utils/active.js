import * as dcs from '../constant';

const getCls = (activeId, itemId, defaultCls) => {
  const originCls = defaultCls || '';
  return activeId === itemId ? ` dcs-active ${originCls}` : ` dcs-selectable ${originCls}`;
};

const deal = (blockId, itemId, item) => {
  if (item !== null) {
    if (itemId !== null) {
      if (!dcs.blocks.has(blockId)) {
        dcs.blocks.set(blockId, new Set());
      }
      if (!dcs.blocks.get(blockId).has(itemId)) {
        dcs.blocks.get(blockId).add(itemId);
      }
    } else {
      dcs.blocks.delete(blockId);
    }
  } else if (dcs.blocks.has(blockId)) {
    dcs.blocks.get(blockId).delete(itemId);
  }
};

export { getCls, deal };
