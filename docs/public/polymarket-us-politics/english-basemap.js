(() => {
  let ready;
  const script = src => new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = src;
    element.onload = resolve;
    element.onerror = reject;
    document.head.append(element);
  });
  window.createEnglishBasemap = async () => {
    if (!ready) ready = (async () => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/maplibre-gl@5.12.0/dist/maplibre-gl.css';
      document.head.append(css);
      await script('https://unpkg.com/maplibre-gl@5.12.0/dist/maplibre-gl.js');
      await script('https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.0.22/leaflet-maplibre-gl.js');
      const response = await fetch('https://tiles.openfreemap.org/styles/liberty');
      if (!response.ok) throw new Error('English basemap unavailable');
      const style = await response.json();
      for (const layer of style.layers) {
        const field = layer.layout?.['text-field'];
        if (field && JSON.stringify(field).includes('name')) {
          layer.layout['text-field'] = ['coalesce', ['get', 'name:en'], ['get', 'name:latin'], ['get', 'name']];
        }
      }
      return style;
    })();
    const style = await ready;
    return L.maplibreGL({
      style: structuredClone(style),
      interactive: false,
      attribution: '<a href="https://openfreemap.org/">OpenFreeMap</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  };
})();
