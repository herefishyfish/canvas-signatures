import { platformNativeScript, registerElement, runNativeScriptAngularApp } from '@nativescript/angular';
import { AppModule } from './app/app.module';

import { Canvas } from '@nativescript/canvas';

// Disable GL and use Vulkan/Metal
// For now, preview app only supports GL.
// Canvas.forceGL = false;

registerElement('Canvas', () => Canvas);

import '@nativescript/canvas-polyfill';

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

