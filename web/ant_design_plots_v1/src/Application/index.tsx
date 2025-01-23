import React from 'react';

import LineExample from './LineExample';
import LineOnReadyExample from './LineOnReadyExample';

const components = {
  LineExample,
  LineOnReadyExample,
};

type ComponentKeys = keyof typeof components;

function isComponentKey(key: string): key is ComponentKeys {
  return key in components;
}

/**
 * Examples:
 * - http://localhost:3000/?path=LineExample
 * - http://localhost:3000/?path=LineOnReadyExample
 */
const Application = () => {
  const path = new URLSearchParams(window.location.search).get('path') || '';

  if (isComponentKey(path)) {
    const Component = components[path];
    return <Component />;
  }

  return (
    <div>
      <h1>Invalid path</h1>
      <p>Valid paths are:</p>
      <ul>
        {Object.keys(components).map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
      <p>How to use:</p>
      <pre>
        <code>{`http://localhost:3000/?path=<ComponentKey>`}</code>
      </pre>
    </div>
  );
};

export default Application;
