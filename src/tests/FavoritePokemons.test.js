import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`É exibida na tela a mensagem No favorite pokemon found,
  caso a pessoa não tenha pokémons favoritos;`, () => {
    renderWithRouter(<App />);
    const favBtn = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favBtn);
    const favH2Title = screen.getByRole('heading', { level: 2,
      name: /Favorite pokémons/i });
    expect(favH2Title).toBeInTheDocument();
    const noFavoritePokems = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokems).toBeInTheDocument();
  });

  it('É exibido o card de pokémon favoritado', () => {
    renderWithRouter(<App />);
    const moreDetailsBtn = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsBtn);
    const addToFavBtn = screen.getByRole('checkbox', { id: /favorite/i });
    userEvent.click(addToFavBtn);
    const favBtn = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favBtn);
    const favH2Title = screen.getByRole('heading', { level: 2,
      name: /Favorite pokémons/i });
    expect(favH2Title).toBeInTheDocument();
    const favedPokeName = screen.getByTestId('pokemon-name');
    expect(favedPokeName.innerHTML).toBe('Pikachu');
  });
});
