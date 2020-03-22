import React from 'react';
import { useIntl, defineMessages } from "react-intl";
import {
  HeatMap,
  Marker as MarkerI
} from '../types';

import {
  Map as OpenMap,
  FeatureGroup,
  Marker,
  Popup,
  LayersControl,
  TileLayer
} from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";


type MapProps = {
  heatMap: HeatMap
  markers: MarkerI[]
};

const MUNICH = [48.13743, 11.57549];
const MAX = 0.3;
const INTENSITY_FACTOR = 4;

export const Map = ({heatMap, markers} : MapProps) => {
  const intl = useIntl();
  const messages = defineMessages({
    marker: { id: 'marker', defaultMessage: 'Marker' },
    heatMap: { id: 'heatMap', defaultMessage: 'Heat Map' },
    ecmo: { id: 'ecmo', defaultMessage: 'ECMO' },
    iculc: { id: 'iculc', defaultMessage: 'ICULC' },
    icuhc: { id: 'iculc', defaultMessage: 'ICUHC' }
  });

  return (
    <OpenMap
      center={MUNICH}
      zoom={12}
      animate={true}
    >
      <LayersControl>
        <LayersControl.BaseLayer name="Base" checked>
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name={intl.formatMessage(messages.heatMap) + " " + intl.formatMessage(messages.iculc)} checked>
          <FeatureGroup color="purple">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={heatMap}
              longitudeExtractor={m => m.longitude}
              latitudeExtractor={m => m.latitude}
              intensityExtractor={m => m.icuhcIntensity*INTENSITY_FACTOR}
              max={MAX}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name={intl.formatMessage(messages.heatMap) + " " + intl.formatMessage(messages.icuhc)}>
          <FeatureGroup color="purple">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={heatMap}
              longitudeExtractor={m => m.longitude}
              latitudeExtractor={m => m.latitude}
              intensityExtractor={m => m.icuhcIntensity*INTENSITY_FACTOR}
              max={MAX}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name={intl.formatMessage(messages.heatMap) + " " + intl.formatMessage(messages.ecmo)}>
          <FeatureGroup color="purple">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={heatMap}
              longitudeExtractor={m => m.longitude}
              latitudeExtractor={m => m.latitude}
              intensityExtractor={m => m.ecmoIntensity*INTENSITY_FACTOR}
              max={MAX}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name={intl.formatMessage(messages.marker)} checked>
          <FeatureGroup color="purple">
            {markers.map(({longitude,latitude,name,timestamp},i) => 
              <Marker key={i} position={[latitude,longitude]} >
                <Popup>
                  <span>{name}</span>
                </Popup>
              </Marker>
            )}
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </OpenMap>
  );
}

export default Map;
