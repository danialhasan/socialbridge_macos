import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import dotenv from 'dotenv';
dotenv.config();
const config: ForgeConfig = {
  packagerConfig: {
    osxSign: true,
    icon: 'src/icons/sb_icon',
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'danialhasan',
          name: 'socialbridge_macos',
        },
        prerelease: true,
        draft: false,
        authToken: process.env.GITHUB_TOKEN,
      },
    },
  ],
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      port: 3001,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
