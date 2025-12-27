import { WindowControls } from '#components';
import WindowWrapper from '#components/hoc/WindowWrapper';
import React from 'react';
import { Search } from 'lucide-react';  
import useLocationStore from '#store/Location';
import { locations } from '#constants';
import clsx from 'clsx';
import useWindowStore from '#store/window';

const Finder = () => {
    const {openWindow}=useWindowStore()
  const { activeLocation, setActiveLocation } = useLocationStore();
  const openItem = (item)=>{
    if(item.fileType==='pdf'){
      return openWindow("resume");
    }
    if(item.kind==='folder'){
      return setActiveLocation(item);
    }
    if(['fig', 'url'].includes(item.fileType) && item.href)
        return window.open(item.href, '_blank');
  // keys in WINDOW_CONFIG are like 'txtfile' or 'imgfile' (no space), so join without separator
  openWindow(`${item.fileType}${item.kind}`, item)
  };
  const renderList = (name, items) => (
    <div key={name} className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              'flex items-center p-2 cursor-pointer rounded-md',
              item.id === activeLocation?.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            )}
          >
            <img src={item.icon} className="w-4 h-4 mr-2" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header" className="flex justify-between items-center p-2 bg-gray-200 ">
        <WindowControls target="finder" />
        <Search className="w-5 h-5" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar w-64 p-4 overflow-y-auto">
          {renderList('Favourites', Object.values(locations))}
          {renderList('Work', locations.work.children)}
        </div>
        <ul className='content'>
        {activeLocation?.children?.map((item) => (
          <li key={item.id} className={item.position} 
          onClick={()=>openItem(item)}

          >
            <img src={item.icon} alt={item.name} />
            <p>{item.name}</p>
            
          </li>
        ))}
      </ul>
      </div>

      
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;
