import { Storage } from '@google-cloud/storage'
import path from 'path';

class CloudStorage {
  static instance: Storage

  constructor() {
    throw new Error('Use Singleton.getInstance()')
  }

  static getInstance(): Storage | null {
    if(!CloudStorage.instance) {
      CloudStorage.instance = new Storage({
        keyFilename:  path.join(__dirname, "../the-new-world-376918-fb445d2f1d63.json")
      });
    }
   
    return CloudStorage.instance
  }
}

export default CloudStorage.getInstance();
