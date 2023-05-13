import {sockjs} from './args';

if (sockjs) {
  import('./sockjs');
} else {
  import('./ws');
}
