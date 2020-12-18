import React, { useContext, useState } from 'react';
import fetch from 'node-fetch';
import ProgressBar from '../../components/ProgressBar';
import ItemsManager, { ItemsPack } from '../../managers/ItemsManager';
import Popup, { PopupParams } from '../../components/Popup';
import isLocally from '../../utils/isLocally';
import ItemsPack_runtype from '../../runtypes/items-pack';
import PageContext from '../../contexts/PageContext';
import testItems from '../../test-items-pack.json';
import './styles.css';


const Packs: React.FC = () => {

  const [popup, setPopup] = useState<PopupParams | null>(null);
  const [itemsPack, setItemsPack] = useState<ItemsPack | null>(null);
  const [progress, setProgress] = useState(0);
  const { setPage } = useContext(PageContext);

  const darkstareItems = 'https://raw.githubusercontent.com/Dharkstare/My-items-pack/main/Item%20pack';


  function log (...args: any[]) {
    console.log('[Packs]', ...args);
  }


  async function importFromURL (url: string) {

    if (popup) {
      return;
    }

    setPopup({
      title: 'Awaiting Response...'
    });


    let data;

    try {
      const response = await fetch(url);
      data = await response.json() as ItemsPack;
    } catch(error) {
      setPopup({
        title: 'Error: Failed to import',
        info: `${error.message || 'Unknown Error'}\n\nTip: Try using online JSON validators`,
        options: {
          Ok: () => setPopup(null)
        },
        onOffClick: () => setPopup(null)
      });
      return;
    }

    log('Items Pack:', data);

    try {
      ItemsPack_runtype.check(data);
    } catch (error) {
      setPopup({
        title: 'Error: Invalid items pack',
        info: `${error.message || 'Unknown Issue'}`,
        options: {
          Ok: () => setPopup(null)
        },
        onOffClick: () => setPopup(null)
      });
      return;
    }

    beginImporting(data);
  }

  function beginImporting (data: ItemsPack): void {

    setItemsPack(data);
    setPopup(null);

    ItemsManager.import(data, (total: number, loaded: number) => {

      const progress = loaded / total * 100;
      setProgress(progress);

      if (ItemsManager.loaded) {
        setTimeout(() => setPage('workshop'), 100);
      }

    }, 100);
  }

  function importFromFile (e: React.ChangeEvent<HTMLInputElement>) {

    if (popup) {
      return;
    }

    if (e.target && e.target.files) {
      const file = e.target.files[0];
      if (['application/json', 'text/plain'].includes(file.type)) {
        importFromURL(URL.createObjectURL(file));
      }
      else {
        alert('Invalid file type. Valid file types are JSON or TXT.');
      }
    }
  }

  function Buttons () {
    return (
      <>
        <button
          className="classic-button"
          onClick={ () => importFromURL(darkstareItems) }>
          Use Darkstare's Items
          <span>(Recommended)</span>
        </button>

        <button
          className="classic-button"
          onClick={() => {
          if (popup) {
            return;
          }
          const url = prompt('URL to Items Pack JSON');
          if (url) {
            importFromURL(url);
          }
        }}>
          Import From URL
        </button>

        <button className="classic-button">
          Import From File
          <input type="file" onChange={ importFromFile }/>
        </button>

        {isLocally && (
          <button
            className="classic-button"
            onClick={() => beginImporting(testItems as ItemsPack)}
            style={{ '--color': 'var(--color-on)' }}>
            Dev
          </button>
        )}
      </>
    );
  }


  return (
    <div id="packs-screen">

      {itemsPack ? (
        <Loading itemsPack={itemsPack} progress={progress} />
      ) : (
        <Buttons />
      )}

      {!!ItemsManager.itemsFailed.length && (
        <div className="failed">
          <h3>Failed</h3>
          {ItemsManager.itemsFailed.map(item =>
            <span key={ item.name }>{ item.name }</span>
          )}
        </div>
      )}

      {popup && <Popup {...popup} />}

    </div>
  );
};


interface LoadingParams {
  itemsPack: ItemsPack;
  progress: number;
}

const Loading: React.FC<LoadingParams> = ({ itemsPack, progress }) => {
  return (
    <>
      <div className="classic-box items-pack-info">
        <div className="name">
          {itemsPack.config.name}
          <span>({itemsPack.items.length} items)</span>
        </div>
        <div className="separator"></div>
        <div className="description">
          {itemsPack.config.description}
        </div>
      </div>
      
      <ProgressBar progress={ progress } />
    </>
  );
};


export default Packs;