import React from 'react';
import { toast } from 'react-toastify';
import './toast.css';

interface PathwayInputs {
  cellLine: string;
  perturbagen: string;
  substrate: string;
}

toast.configure();

export const playToast = (id: string, content: JSX.Element) => {
  toast(content, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    type: 'dark',
    toastId: id,
  });
};

export const SidebarRouteAddedToast = ({ kinase }: { kinase: string }) => {
  return (
    <div>
      <div>{`${kinase} added to the Sidebar.`}</div>
    </div>
  );
};

export const RedirectedToPathwaysToast = ({ inputs }: { inputs: PathwayInputs }) => {
  const { cellLine, perturbagen, substrate } = inputs;

  return (
    <div className='customToastContainer'>
      <div>
        <strong>Pathway inputs are set as:</strong>
      </div>
      <div>{`${cellLine}, ${perturbagen}, ${substrate}`}</div>
      <div>Click &apos;Get Pathway&apos; to visualise</div>
    </div>
  );
};

export const PathwayGeneratedToast = ({ inputs }: { inputs: PathwayInputs }) => {
  const { cellLine, perturbagen, substrate } = inputs;

  return (
    <div className='customToastContainer'>
      <div>
        <strong>Pathway generated for:</strong>
      </div>
      <div>{`${cellLine}, ${perturbagen}, ${substrate}`}</div>
      <div>Play with the pathway!</div>
      <div>Or explore possible paths below in Paths Table.</div>
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
