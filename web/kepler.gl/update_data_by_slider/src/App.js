import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeplerGl from 'kepler.gl';
import { addDataToMap, updateMap } from 'kepler.gl/actions';
import KeplerGlSchema from 'kepler.gl/schemas';

import { POINT_DATASET_ID, newPoints, POLYGON_DATASET_ID, newPolygons } from './constants';
import { initMapToLoad } from './constants';
import { genNewPoints } from './app/helpers';

import './App.css';

const keplerglMapId = 'foo';

function App() {
  const dispatch = useDispatch();
  const fooState = useSelector(state => state.keplerGl[keplerglMapId]);
  const [sliderVal, setSliderVal] = React.useState(50);
  
  useEffect(() => {
    dispatch(addDataToMap(
      initMapToLoad
    ));
    dispatch(
      updateMap({ latitude: 1.305886, longitude: 103.82108, zoom: 10 }),
    );
  }, [dispatch]);

  const handleLoadPointData = () => {
    // save current map data and config
    const { datasets, config } = KeplerGlSchema.save(fooState);
    console.debug('Before loading point data', datasets, config)

    const newDatasets = datasets.map(dataset => {
      if (dataset.data.id !== POINT_DATASET_ID) {
        return dataset;
      }
      return ({
        version: dataset.version,
        data: {
          ...dataset.data,
          allData: [
            ...dataset.data.allData,
            ...newPoints,
          ],
        }
      });
    });

    // load config with new datasets
    const mapToLoad = KeplerGlSchema.load(newDatasets, config);

    dispatch(addDataToMap({
      ...mapToLoad,
      options: { centerMap: false }
    }));
  }

  const handleLoadPolygonData = () => {
    // save current map data and config
    const { datasets, config } = KeplerGlSchema.save(fooState);
    console.debug('Before loading polygon data', datasets, config)

    const newDatasets = datasets.map(dataset => {
      if (dataset.data.id !== POLYGON_DATASET_ID) {
        return dataset;
      }
      return ({
        version: dataset.version,
        data: {
          ...dataset.data,
          allData: [
            ...dataset.data.allData,
            ...newPolygons,
          ],
        }
      });
    });

    // load config with new datasets
    const mapToLoad = KeplerGlSchema.load(newDatasets, config);

    dispatch(addDataToMap({
      ...mapToLoad,
      options: { centerMap: false }
    }));
  }

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setSliderVal(String(value));

    // save current map data and config
    const { datasets, config } = KeplerGlSchema.save(fooState);
    console.debug('Before loading point data', datasets, config)

    const newDatasets = datasets.map(dataset => {
      if (dataset.data.id !== POINT_DATASET_ID) {
        return dataset;
      }
      return ({
        version: dataset.version,
        data: {
          ...dataset.data,
          allData: [
            // ...dataset.data.allData,
            ...genNewPoints(value / 500),
          ],
        }
      });
    });

    // load config with new datasets
    const mapToLoad = KeplerGlSchema.load(newDatasets, config);

    dispatch(addDataToMap({
      ...mapToLoad,
      options: { centerMap: false }
    }));
  }

  return (
    <div className="App">
      <button onClick={handleLoadPointData}>Load point data</button>
      <button onClick={handleLoadPolygonData}>Load polygon data</button>
      <input type="range" min="1" max="100" value={sliderVal} onChange={handleSliderChange}></input>
      <div className='keplergl-wrapper'>
        <KeplerGl
          id={keplerglMapId}
          mapboxApiAccessToken="pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg"
          width={1200}
          height={800}
        />
      </div>
      <div>{(fooState?.visState?.layers || []).map(l => (
        <div key={l.id}>{l.id} | {l.config.dataId} | {l.type}</div>
      ))}</div>
    </div>
  );
}

export default App;
