import('./bootstrap').then(
    ({ mount }) => {
      const localRoot = document.getElementById('MFE_actionHistory');
  
      mount({
        mountPoint: localRoot!,
        routingStrategy: 'browser',
      });
    }
  );
  
  export {};