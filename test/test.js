/**
 * Created by 004811 on 2017/6/6.
 */

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const uui = 10;
const p = list.find(v => v === uui);
console.log(p === null);

const a = { s: 's' };
Object.assign(a, { b: 'b' });
Object.assign(a, { b: 'b_1' });
console.log(a);

const fallbackQueue = new Set();
fallbackQueue.add('01');
fallbackQueue.add('02');
fallbackQueue.add('05');
fallbackQueue.add('08');
fallbackQueue.add('08');
fallbackQueue.add('08');


const otherInfo = 'this is other info';
const state = { fallbackQueue, otherInfo };
const { fallbackQueue: queue } = state;
const fallbackArr = Array.from(queue);
if (fallbackArr.length > 0) {
  const [fallback, ...newFallbackQueue] = fallbackArr;
  console.log(fallback);
  console.log(newFallbackQueue);
}

const cmd = '/OPR0012';
switch (cmd.toLowerCase()) {
  case 'otherCmd':
    console.log('***********');
    break;
  case cmd.toLowerCase().startsWith('/opr') ? cmd.toLowerCase() : null:
    console.log('==================');
    break;
  default:
    console.log('default');
}

