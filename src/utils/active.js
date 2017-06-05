/* eslint-disable no-undef */
import * as dcs from '../constant';

const resolveKey = (key) => {
  const keys = key.split('#');
  let itemId = null;
  let blockId = null;
  if (keys.length === 1) {
    itemId = keys[0];
    blockId = dcs.defaultBlockId;
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
  return activeId === itemId ? ` ${activeClass} ${originCls}` : ` dcs-selectable dcs-item-${blockId}#${itemId} ${originCls}`;
};

const deal = (item, key) => {
  const { blockId, itemId } = resolveKey(key);
  if (item !== null) {
    if (itemId !== null) {
      if (!dcs.blocks.has(blockId)) {
        dcs.blocks.set(blockId, new Set());
      }
      if (!dcs.blocks.get(blockId).has(itemId)) {
        dcs.blocks.get(blockId).add(itemId);
      }
      const element = window.document.querySelector('.dcs-active, .dcs-table-active');
      if (element) {
        element.focus();
      }
    } else {
      dcs.blocks.delete(blockId);
    }
  } else if (dcs.blocks.has(blockId)) {
    dcs.blocks.get(blockId).delete(itemId);
  }
};

export { getCls, deal, resolveKey };
