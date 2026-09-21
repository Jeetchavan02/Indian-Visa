import React, { memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

// TopoJSON for world map (110m resolution)
const geoUrl =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  onCountrySelect: (countryId: string, countryName: string) => void;
  selectedCountryId: string | null;
}

const WorldMap: React.FC<WorldMapProps> = ({ onCountrySelect, selectedCountryId }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F8F9FA', borderRadius: '12px' }}>
      <ComposableMap
        projectionConfig={{
          scale: 140,
          center: [20, 0] // Slightly shift to give India breathing room
        }}
        width={800}
        height={400}
        style={{ width: '100%', height: 'auto' }}
      >
        <Graticule stroke="#E9ECEF" />
        <Geographies geography={geoUrl}>
          {({ geographies, projection }) => {
            let indiaGeo: any = null;
            let selectedGeo: any = null;

            const renderedGeographies = geographies.map((geo) => {
              if (geo.id === '356') indiaGeo = geo;
              if (geo.id === selectedCountryId) selectedGeo = geo;

              const isSelected = selectedCountryId === geo.id;
              const isIndia = geo.id === '356';

              let className = 'geo-default';
              if (isSelected) className = 'geo-selected';
              else if (isIndia) className = 'geo-india';

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className={className}
                  onClick={() => {
                    onCountrySelect(geo.id, geo.properties.name);
                  }}
                />
              );
            });

            let routePath = null;
            let indiaMarker = null;
            let originMarker = null;

            if (indiaGeo && projection) {
              const indiaCoords = geoCentroid(indiaGeo);
              const end = projection(indiaCoords);

              if (end) {
                indiaMarker = (
                  <g transform={`translate(${end[0]}, ${end[1]})`}>
                    <circle r={3} fill="#E87722" stroke="#FFFFFF" strokeWidth={1} />
                    <text
                      textAnchor="middle"
                      y={-8}
                      style={{ fontFamily: 'system-ui', fontSize: '10px', fill: '#1a2744', fontWeight: 'bold' }}
                    >
                      INDIA
                    </text>
                  </g>
                );
              }

              if (selectedGeo && selectedCountryId !== '356') {
                const selectedCoords = geoCentroid(selectedGeo);
                const start = projection(selectedCoords);

                if (start && end) {
                  // Calculate bezier control point
                  const dx = end[0] - start[0];
                  const dy = end[1] - start[1];
                  const cx = start[0] + dx / 2;
                  const cy = start[1] + dy / 2 - 40; // Curve upward

                  routePath = (
                    <path
                      d={`M ${start[0]} ${start[1]} Q ${cx} ${cy} ${end[0]} ${end[1]}`}
                      className="map-route-line"
                    />
                  );

                  originMarker = (
                    <g transform={`translate(${start[0]}, ${start[1]})`}>
                      <circle r={4} fill="#1a2744" stroke="#FFFFFF" strokeWidth={1.5} />
                    </g>
                  );
                }
              }
            }

            return (
              <>
                {renderedGeographies}
                {routePath}
                {originMarker}
                {indiaMarker}
              </>
            );
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(WorldMap);
