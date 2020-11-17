import React from 'react';
import { toast } from 'react-toastify';
import './toast.css';

toast.configure();

export const playToast = (content: JSX.Element) => {
  toast(content, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    delay: 0,
    progress: undefined,
    type: 'dark',
  });
};

export const PathwayGeneratedToast = () => {
  return (
    <div>
      <div>Pathway generated.</div>
      <div style={{ marginTop: '0.2rem' }}>Play with the pathway!</div>
      <div style={{ marginTop: '0.2rem' }}>Or explore possible paths below in Paths Table.</div>
    </div>
  );
};

export const PathAddedToInspectListToast = ({ item }: { item: string }) => {
  return (
    <div>
      <div>{`${item} added to Inspect List.`}</div>
    </div>
  );
};
