import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  it('É exibido na tela um h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutH2Title = screen.getByRole('heading', { level: 2,
      name: /About Pokédex/i });
    expect(aboutH2Title).toBeInTheDocument();
  });

  it('O atributo src da imagem está correto ', () => {
    renderWithRouter(<About />);
    const imgAltText = screen.getByAltText('Pokédex');
    expect(imgAltText.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
