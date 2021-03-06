import getImgBlob from '../utils/getImgBlob';
import { Item } from './ItemsManager';
import LocalStorageManager from './LocalStorageManager';
import { MechSetup } from './MechSavesManager';


const rawStatsData: RawStatTemplate[] = [{
  key: 'weight',
  name: 'Weight',
  type: 'number',
  buff: null
}, {
  key: 'health',
  name: 'Health',
  type: 'number',
  buff: {
    mode: 'add',
    amount: 350
  }
}, {
  key: 'eneCap',
  name: 'Energy Capacity',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'eneReg',
  name: 'Energy Regeneration',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'heaCap',
  name: 'Heat Capacity',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'heaCol',
  name: 'Cooling',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'bulletsCap',
  name: 'Bullets Capacity',
  type: 'number',
  buff: null
}, {
  key: 'rocketsCap',
  name: 'Rockets Capacity',
  type: 'number',
  buff: null
}, {
  key: 'phyRes',
  name: 'Physical Resistance',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.4
  }
}, {
  key: 'expRes',
  name: 'Explosive Resistance',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.4
  }
}, {
  key: 'eleRes',
  name: 'Electric Resistance',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.4
  }
}, {
  key: 'phyDmg',
  name: 'Physical Damage',
  type: 'range',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'phyResDmg',
  name: 'Physical Resistance Damage',
  type: 'number',
  buff: null
}, {
  key: 'eleDmg',
  name: 'Electric Damage',
  type: 'range',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'eneDmg',
  name: 'Energy Damage',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'eneCapDmg',
  name: 'Energy Capacity Damage',
  type: 'number',
  buff: null
}, {
  key: 'eneRegDmg',
  name: 'Energy Regeneration Damage',
  type: 'number',
  buff: null
}, {
  key: 'eleResDmg',
  name: 'Electric Resistance Damage',
  type: 'number',
  buff: null
}, {
  key: 'expDmg',
  name: 'Explosive Damage',
  type: 'range',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'heaDmg',
  name: 'Heat Damage',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 1.2
  }
}, {
  key: 'heaCapDmg',
  name: 'Heat Capacity Damage',
  type: 'number',
  buff: null
}, {
  key: 'heaColDmg',
  name: 'Cooling Damage',
  type: 'number',
  buff: null
}, {
  key: 'expResDmg',
  name: 'Explosive Resistance Damage',
  type: 'number',
  buff: null
}, {
  key: 'walk',
  name: 'Walking Distance',
  type: 'number',
  buff: null
}, {
  key: 'jump',
  name: 'Jumping Distance',
  type: 'number',
  buff: null
}, {
  key: 'range',
  name: 'Range',
  type: 'range',
  buff: null
}, {
  key: 'push',
  name: 'Knockback',
  type: 'number',
  buff: null
}, {
  key: 'pull',
  name: 'Pull',
  type: 'number',
  buff: null
}, {
  key: 'recoil',
  name: 'Recoil',
  type: 'number',
  buff: null
}, {
  key: 'advance',
  name: 'Advance',
  type: 'number',
  buff: null
}, {
  key: 'retreat',
  name: 'Retreat',
  type: 'number',
  buff: null
}, {
  key: 'uses',
  name: 'Uses',
  type: 'number',
  buff: null
}, {
  key: 'backfire',
  name: 'Backfire',
  type: 'number',
  buff: {
    mode: 'mul',
    amount: 0.8
  }
}, {
  key: 'heaCost',
  name: 'Heat Generation',
  type: 'number',
  buff: null
}, {
  key: 'eneCost',
  name: 'Energy Consumption',
  type: 'number',
  buff: null
}, {
  key: 'bulletsCost',
  name: 'Bullets Usage',
  type: 'number',
  buff: null
}, {
  key: 'rocketsCost',
  name: 'Rockets Usage',
  type: 'number',
  buff: null
}];


interface RawStatTemplate {
  key: ItemStatKey;
  name: string;
  type: string;
  buff: null | {
    mode: 'add' | 'mul';
    amount: number;
  };
}

interface StatTemplate {
  key: ItemStatKey;
  name: string;
  type: string;
  buff: null | {
    mode: 'add' | 'mul';
    amount: number;
  };
  imageURL: string;
}

type MechStatKey =
  'weight' | 'health' | 'eneCap' | 'eneReg' | 'heaCap' | 'heaCol'
  | 'phyRes' | 'expRes' | 'eleRes' | 'bulletsCap' | 'rocketsCap';

// Stats which are number
type ItemNumberStatKey =
  MechStatKey |
  'phyResDmg' | 'expResDmg' | 'heaDmg'  | 'heaCapDmg' |
  'heaColDmg' | 'eleResDmg' | 'eneDmg'  | 'eneCapDmg' |
  'eneRegDmg' | 'walk'      | 'jump'    | 'push'      |
  'pull'      | 'recoil'    | 'advance' | 'retreat'   |
  'uses'      | 'backfire'  | 'heaCost' | 'eneCost'   |
  'bulletsCost' | 'rocketsCost';

// Stats which are [number, number]
type ItemTupleStatKey = 'phyDmg' | 'expDmg' | 'eleDmg' | 'range';

// General stats
export type ItemStatKey = MechStatKey | ItemNumberStatKey | ItemTupleStatKey;

// The "interface"
export type ItemStats = {
  [key in ItemNumberStatKey]?: number;
} & {
  [key in ItemTupleStatKey]?: number[];
};

type MechStats = {
  [key in MechStatKey]?: number;
};


class StatsManager
{
  _stats: { [key in ItemStatKey]?: StatTemplate } = {};

  mechStatsKeys: MechStatKey[] = [
    'weight', 'health', 'eneCap',
    'eneReg', 'heaCap', 'heaCol',
    'phyRes', 'expRes', 'eleRes'
  ];

  async load (callback: () => unknown) {

    let loadedStatsCount = 0;
    const baseURL = 'https://raw.githubusercontent.com/ctrl-raul/workshop-unlimited/master/src/assets/images/stats/';

    const loadItem = (data: RawStatTemplate) => {
      getImgBlob(baseURL + data.key + '.svg', [70])
        .then(image =>
          this._stats[data.key] = {
            ...data,
            imageURL: image[0].url
          }
        ).catch(_err => {
          // TODO: Make the app actually care
          // if some stat image fail to load
        })
        .finally(() => {
          loadedStatsCount++;
          if (loadedStatsCount === rawStatsData.length) {
            callback();
          }
        });
    }

    for (const data of rawStatsData) {
      loadItem(data);
    }
  }

  getMechSummary (items: MechSetup): MechStats {

    const sum: MechStats = {};

    for (const item of items) {

      if (item === null) {
        continue;
      }

      for (const key of this.mechStatsKeys) {

        const value = item.stats[key] || 0;
        const current = sum[key];

        sum[key] = typeof current === 'undefined' ? value : current + value;

      }

    }


    // Do health penalty due to overweight
    if (sum.weight) {

      const maxWeight = 1000;
      const healthPenaltyForWeight = 15;

      if (sum.weight > maxWeight) {
        const penalty = (sum.weight - maxWeight) * healthPenaltyForWeight;
        sum.health = (sum.health || 0) - penalty;
      }
    }


    return sum;
  }

  getStats (source: Item | MechSetup, forceBuffs = false): ItemStats | MechStats {

    let shouldBuffHealth = false;

    const stats: ItemStats = (
      Array.isArray(source)
      ? (shouldBuffHealth = true) && this.getMechSummary(source)
      : Object.assign({}, source.stats)
    );

    const { arena_buffs } = LocalStorageManager.getSettings();

    if (arena_buffs || forceBuffs) {
      
      const buffFunctions = {
        add: (x: number, amount: number) => x + amount,
        mul: (x: number, amount: number) => x * amount
      };

      const keys = Object.keys(stats) as ItemStatKey[];

      for (const key of keys) {

        const value = stats[key];

        if (!value || (key === 'health' && !shouldBuffHealth)) {
          continue;
        }
  
        const statTemplate = rawStatsData.find(data => data.key === key);
  
        if (!statTemplate) {
          console.error(`Unknown stat '${key}'`);
          continue;
        }
  
        if (statTemplate.buff) {

          const { buff } = statTemplate;
          const buffFunction = buffFunctions[buff.mode];
  
          if (Array.isArray(value)) {
            // @ts-ignore
            stats[key] = value.map(x => Math.round(
              buffFunction(x, buff.amount)
            ));
          } else {
            // @ts-ignore
            stats[key] = Math.round(
              buffFunction(value, buff.amount)
            );
          }
        }
      }
    }

    return stats;
  }

  getStatTemplate (key: ItemStatKey): StatTemplate {
    const stat = this._stats[key];
    if (typeof stat !== 'undefined') {
      return stat;
    }
    throw new Error(`Stat '${key}' did not load or doesn't exist.`);
  }
}


export default new StatsManager();
