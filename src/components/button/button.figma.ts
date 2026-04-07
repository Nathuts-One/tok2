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
      disabled: figma.enum('State', {
        Disabled: true,
        Default:  false,
        Hover:    false,
        Pressed:  false,
      }),
    },

    example: ({ label, variant, size, disabled }) => html`
      <ds-button
        variant="${variant}"
        size="${size}"
        ${disabled ? 'disabled' : ''}
      >${label}</ds-button>
    `,
  }
);
