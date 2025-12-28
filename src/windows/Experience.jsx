import React from 'react'
import WindowWrapper from '#components/hoc/WindowWrapper';
import WindowControls from '#components/WindowControls';
import { locations } from '#constants';

const Experience = () => {
  const items = locations.experience?.children ?? [];
  return (
    <>
      <div id="window-header">
        <WindowControls target="experience"/>
        <h2>Experience</h2>
      </div>

      <div className='p-6 space-y-6'>
        {items.map((it)=> (
          <div key={it.id} className='flex items-start gap-4'>
            {it.icon && (
              <img src={it.icon} alt={it.name} className='w-20 h-20 object-cover rounded-md'/>
            )}
            <div>
              <h3 className='font-semibold text-lg'>{it.details?.role} — {it.details?.company}</h3>
              <p className='text-sm text-gray-500'>{it.details?.duration} · {it.details?.type}</p>
              <p className='mt-2 text-sm'>{it.details?.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const ExperienceWindow = WindowWrapper(Experience, 'experience');
export default ExperienceWindow