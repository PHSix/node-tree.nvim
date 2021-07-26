import { Neovim, Window } from 'neovim';
import { Store } from './Store';

export async function setWindowOptions(window: Window): Promise<Window> {
  Promise.all([
    window.setOption('number', false),
    window.setOption('relativenumber', false),
    window.setOption('signcolumn', 'no'),
    window.setOption('cursorline', true),
    window.setOption('wrap', false),
  ]);
  return window;
}

export async function CreateWindow(nvim: Neovim): Promise<Window> {
  const wins = await nvim.windows;
  for (let win of wins) {
    const [, col] = await win.position;
    if (col === 0) {
      nvim.setWindow(win);
    }
  }
  await nvim.setOption("splitright", false);
  await nvim.command(`30vsplit`);
  let window = await nvim.window;
  setWindowOptions(window);
  await window.request(`${window.prefix}set_buf`, [window, Store.buffer]);
  return window;
}
