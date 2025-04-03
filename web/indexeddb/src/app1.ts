const version = 1;

const main = () => {
  console.log('delete old db');

  // delete old db
  indexedDB.deleteDatabase('test_db');

  const db = indexedDB.open('test_db', version);
  db.onupgradeneeded = (event) => {
    console.log('db.onupgradeneeded: Database upgrade needed');
    const db = (event.target as IDBOpenDBRequest).result;

    // Create an object store with a keyPath 'id'
    /*const store =*/ db.createObjectStore('test_store_1', { keyPath: 'id' });
    // store.createIndex('name', 'name', { unique: false });

    // Create another object store with a keyPath 'code'
    /*const store2 =*/ db.createObjectStore('test_store_2', {
      keyPath: 'code',
    });
    // store2.createIndex('code', 'code', { unique: false });
  };
  db.onsuccess = (event) => {
    console.log('db.onsuccess: Database created');
    const db = (event.target as IDBOpenDBRequest).result;

    // Add data to the test_store_1 object store
    const transaction = db.transaction('test_store_1', 'readwrite');
    const store = transaction.objectStore('test_store_1');
    store.add({ id: 1, name: 'Metadata', createdAt: new Date() });
    transaction.oncomplete = () => {
      console.log('transaction.oncomplete: Data added to store');
    };

    // Add data to the test_store_2 object store
    const transaction2 = db.transaction('test_store_2', 'readwrite');
    const store2 = transaction2.objectStore('test_store_2');
    store2.add({ code: 'A', name: 'Alpha', createdAt: new Date() });
    transaction2.oncomplete = () => {
      console.log('transaction2.oncomplete: Data added to store 2');
    };
  };

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <li>Refresh the page to create a new database 'test_db'.</li>
    <li>Create an object store 'test_store_1' with a keyPath 'id'.</li>
    <li>Create another object store 'test_store_2' with a keyPath 'code'.</li>
  </div>
`;
};

export default main;
