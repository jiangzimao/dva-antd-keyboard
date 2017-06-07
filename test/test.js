/**
 * Created by 004811 on 2017/6/6.
 */
const fallbackQueue = new Set();
fallbackQueue.add('aaa');
fallbackQueue.add('bbb');
fallbackQueue.add('ccc');
const otherInfo = 'this is other info';
const state = { fallbackQueue, otherInfo };
const { fallbackQueue: queue } = state;
const fallbackArr = Array.from(queue);
if (fallbackArr.length > 0) {
  const [fallback, ...newFallbackQueue] = fallbackArr;
  console.log(fallback);
  console.log(newFallbackQueue);
}
