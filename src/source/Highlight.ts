import { Neovim } from 'neovim';
import { Option } from './Option';
import { readFileSync } from 'fs';
export let setFlag = false;

export const IconLength = 2;

const data = JSON.parse(readFileSync('./Icons.json').toString());

export function ParseHiName(hi_group: string) {
  return `NodeIcon${hi_group}`;
}

export async function CreateHighlight(nvim: Neovim) {
  Option.namespace_id = await nvim.createNamespace('NodeTreeHighlights');
  const hi_queue: Promise<any>[] = [];
  const hi_Icon = (hi_group: string, hi_color: string): Promise<any> => {
    return nvim.command(`highlight ${ParseHiName(hi_group)} guifg=${hi_color}`);
  };
  for (let item in data) {
    hi_queue.push(hi_Icon(item, data[item].color));
  }

  await Promise.all<any>([
    nvim.command('highlight NodeTreeFolder guifg=#c7ecee'),
    ...hi_queue,
  ]);
}
