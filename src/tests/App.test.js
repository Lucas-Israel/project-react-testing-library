import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('01. O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const titleHome = screen.getByRole('link', { name: /home/i });
    expect(titleHome).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const titleAbout = screen.getByRole('link', { name: /about/i });
    expect(titleAbout).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const titleFavPoke = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(titleFavPoke).toBeInTheDocument();
  });

  it(`A aplicação é redirecionada para a página inicial, na URL / ao clicar no link 
  Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const homeBtn = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeH2Title = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(homeH2Title).toBeInTheDocument();
  });

  it(`A aplicação é redirecionada para a página de About, na URL /about,
  ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const aboutBtn = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutH2Title = screen.getByRole('heading',
      { level: 2, name: /about Pokédex/i });
    expect(aboutH2Title).toBeInTheDocument();
    const imgAlt = screen.getByAltText(/Pokédex/i);
    expect(imgAlt.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  it(`A aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const favoriteBtn = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favH2Title = screen.getByRole('heading',
      { level: 2, name: /Favorite pokémons/i });
    expect(favH2Title).toBeInTheDocument();
  });

  it(`A aplicação é redirecionada para a página Not Found ao entrar em uma
  URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/abc');
    const notFoundH2 = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    const imgAlt = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);
    expect(notFoundH2).toBeInTheDocument();
    expect(imgAlt).toBeInTheDocument();
    expect(imgAlt.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
