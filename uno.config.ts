import { defineConfig, presetAttributify, presetUno, transformerVariantGroup } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
// import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetRemToPx({
      baseFontSize: 4
    })
    // presetIcons()
  ],
  // ...UnoCSS options
  rules: [
    [/^bg-(.*)$/, ([_, color]) => ({ 'background-color': `#${color}` })],
    [/^c-(.*)$/, ([_, color]) => ({ color: `#${color}` })]
  ],
  transformers: [
    transformerVariantGroup()
  ]
});
