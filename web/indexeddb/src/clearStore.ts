const version = 1;

/**
 * Event db does not exist, calling indexedDB.deleteDatabase will not throw an error.
 */
const deleteOldDb = () => {
  console.log('start delete old db');
  indexedDB.deleteDatabase('test_db');
  console.log('finish delete old db');
};

/**
 * When try to open a db, if the db does not exist, it will be created.
 */
const createNewDb = () => {
  console.log('start create new db');

  const db = indexedDB.open('test_db', version);

  /**
   * createObjectStore can only be called in onupgradeneeded callback (when version is changed).
   */
  db.onupgradeneeded = (event) => {
    console.log(
      'db.onupgradeneeded: Database upgrade needed, create object stores'
    );

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
    console.log('db.onsuccess: Database opened successfully', event);
    console.log('finish create new db');
  };
};

const addDataToDb = () => {
  console.log('start add data to db');

  const db = indexedDB.open('test_db', version);

  // because version no change, so no onupgradeneeded callback
  // db.onupgradeneeded = (event) => {}

  db.onsuccess = (event) => {
    console.log('db.onsuccess: Database opened successfully, add data to db');

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
};

const clearStore = () => {
  console.log('start clear store');

  const db = indexedDB.open('test_db', version);

  db.onsuccess = (event) => {
    console.log('db.onsuccess: Database opened successfully, clear store');

    const db = (event.target as IDBOpenDBRequest).result;

    // clear test_store_1
    const transaction = db.transaction('test_store_1', 'readwrite');
    const store = transaction.objectStore('test_store_1');
    store.clear();
    transaction.oncomplete = () => {
      console.log('transaction.oncomplete: Store cleared');
    };

    // clear test_store_2
    const transaction2 = db.transaction('test_store_2', 'readwrite');
    const store2 = transaction2.objectStore('test_store_2');
    store2.clear();
    transaction2.oncomplete = () => {
      console.log('transaction2.oncomplete: Store cleared');
    };
  };
};

const main = () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p><button class="delete-old-db-btn">Delete old db</button></p>
    <p><button class="create-new-db-btn">Create new db</button></p>
    <p><button class="add-data-to-db-btn">Add data to db</button></p>
    <p><button class="clear-store-btn">Clear store</button></p>
  </div>
`;

  document.querySelector<HTMLButtonElement>('.delete-old-db-btn')!.onclick =
    () => {
      deleteOldDb();
    };

  document.querySelector<HTMLButtonElement>('.create-new-db-btn')!.onclick =
    () => {
      createNewDb();
    };

  document.querySelector<HTMLButtonElement>('.add-data-to-db-btn')!.onclick =
    () => {
      addDataToDb();
    };

  document.querySelector<HTMLButtonElement>('.clear-store-btn')!.onclick =
    () => {
      clearStore();
    };
};

export default main;
