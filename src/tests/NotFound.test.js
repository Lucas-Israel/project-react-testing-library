import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se a página contém um heading h2 com o texto
  Page requested not found;`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/abc');
    const notFoundH2Title = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundH2Title).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/abc');
    const notFoundImg = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(notFoundImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
