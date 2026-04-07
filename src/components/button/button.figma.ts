import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/uKkZkyJQUzKE33GgsZCd7s/Teste-Figma-mcp-v2?node-id=19-2',
  {
    imports: ["import 'tok2/button'"],

    props: {
      label:   figma.string('Label'),
      variant: figma.enum('Style', {
        Primary:   'primary',
        Secondary: 'secondary',
        Outline:   'outline',
        Ghost:     'ghost',
      }),
      size: figma.enum('Size', {
        SM: 'sm',
        MD: 'md',
        LG: 'lg',
      }),
    },

    example: ({ label, variant, size }) => html`
      <ds-button
        variant="${variant}"
        size="${size}"
      >${label}</ds-button>
    `,
  }
);

// Disabled state — add the "disabled" attribute when State=Disabled in Figma
figma.connect(
  'https://www.figma.com/design/uKkZkyJQUzKE33GgsZCd7s/Teste-Figma-mcp-v2?node-id=19-2',
  {
    imports: ["import 'tok2/button'"],
    variant: { 'State': 'Disabled' },

    props: {
      label:   figma.string('Label'),
      variant: figma.enum('Style', {
        Primary:   'primary',
        Secondary: 'secondary',
        Outline:   'outline',
        Ghost:     'ghost',
      }),
      size: figma.enum('Size', {
        SM: 'sm',
        MD: 'md',
        LG: 'lg',
      }),
    },

    example: ({ label, variant, size }) => html`
      <ds-button
        variant="${variant}"
        size="${size}"
        disabled
      >${label}</ds-button>
    `,
  }
);
