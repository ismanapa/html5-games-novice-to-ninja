const cache: { [key: string]: any } = {};
const readyListeners: any[] = [];
const progressListeners: any[] = [];

let completed = false;
let remaining = 0;
let total = 0;

function done() {
  completed = true;
  readyListeners.forEach(cb => cb());
}

// Called when a queued asset is ready to use
function onAssetLoad(e: any) {
  if (completed) {
    console.warn('Warning: asset defined after preload.', e.target);
    return;
  }

  remaining--;
  progressListeners.forEach(cb => cb(total - remaining, total));
  if (remaining === 0) {
    // We're done loading
    done();
  }
}

// Helper function for queuing assets
function load(url: string, maker: (url: string, onLoad: (e: any) => void) => void) {
  let cacheKey = url;
  while (cacheKey.startsWith('../')) {
    cacheKey = url.slice(3);
  }
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  const asset = maker(url, onAssetLoad);
  remaining++;
  total++;

  cache[cacheKey] = asset;
  return asset;
}

export const Assets = {
  get completed() {
    return completed;
  },

  onReady(cb: () => void) {
    if (completed) {
      return cb();
    }

    readyListeners.push(cb);
    // No assets to load
    if (remaining === 0) {
      done();
    }
  },

  onProgress(cb: () => void) {
    progressListeners.push(cb);
  },

  image(url: string) {
    return load(url, (url: string, onAssetLoad: (e: any) => void) => {
      const img = new Image();
      img.src = url;
      img.addEventListener('load', onAssetLoad, false);
      return img;
    });
  },

  sound(url: string) {
    return load(url, (url: string, onAssetLoad: (e: any) => void) => {
      const audio = new Audio();
      audio.src = url;
      const onLoad = e => {
        audio.removeEventListener('canplay', onLoad);
        onAssetLoad(e);
      };
      audio.addEventListener('canplay', onLoad, false);
      return audio;
    }).cloneNode();
  },
};
