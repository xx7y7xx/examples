export const POINT_DATASET_ID = 'point-layer-dataset-id';
export const POINT_LAYER_ID = 'point-layer-id';
export const POLYGON_DATASET_ID = 'polygon-layer-dataset-id';
export const POLYGON_LAYER_ID = 'polygon-layer';

export const initMapToLoad = {
  info: {
    title: 'Point and Polygon',
    description: 'Will display points and polygons on the map'
  },
  datasets: [{
    info: { label: 'Point data', id: POINT_DATASET_ID },
    data: {
      fields: [
        { name: 'shop_longitude', format: '', type: 'real' },
        { name: 'shop_latitude', format: '', type: 'real' }
      ],
      rows: [
        // [103.801770, 1.273607],
        // [103.822990, 1.275041],
      ]
    },
  }, {
    info: { label: 'Polygon data', id: POLYGON_DATASET_ID },
    data: {
      fields: [
        { name: 'name', format: '', type: 'string' },
        { name: 'mall_polygon', format: '', type: 'geojson' }
      ],
      rows: [
        // ['VivoCity', '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[103.8198,1.2655],[103.8199,1.2631],[103.8234,1.2631],[103.8235,1.2655],[103.8198,1.2655]]],"type":"Polygon"}}]}'],
      ]
    },
  }],
  options: {
    centerMap: false, // default is true
    readOnly: false,
    keepExistingConfig: false
  },
  config: {
    visState: {
      filters: [],
      layers:[{
        id: POINT_LAYER_ID,
        type: 'point',
        config: {
          dataId: POINT_DATASET_ID,
          label: 'Point Layer',
          color: [255, 0, 0], // #ff0000
          columns: {
            lat: 'shop_latitude',
            lng: 'shop_longitude',
            altitude: null,
          },
          isVisible: true,
          visConfig: {
            radius: 100,
          }
        },
      },{
        id: POLYGON_LAYER_ID,
        type: 'geojson',
        config: {
          dataId: POLYGON_DATASET_ID,
          label: 'Polygon Layer',
          color: [67, 143, 69], // #438F45
          columns: {
            geojson: 'mall_polygon',
          },
          isVisible: true
        },
      }]
    }
  }
};

export const newPoints = [
  [103.82482, 1.26473],
];

export const newPolygons = [
  ['VivoCity', '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[103.8198,1.2655],[103.8199,1.2631],[103.8234,1.2631],[103.8235,1.2655],[103.8198,1.2655]]],"type":"Polygon"}}]}'],
]