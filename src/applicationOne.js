import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { default as commonImages } from 'rootApplication/commonImages';
import { Image } from 'applicationTwo/Image';

const ApplicationOne = () => {
    const imgSrc = commonImages.find(img => img.name === 'Norway').image;

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Application one</h2>
            <h3>Date : {new Date().toLocaleTimeString()}</h3>
            <Image src={imgSrc}/>
        </div>
    );
};

const headerLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ApplicationOne
});

export const bootstrap = headerLifecycles.bootstrap;
export const mount = headerLifecycles.mount;
export const unmount = headerLifecycles.unmount;
