import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const moreDetails = 'More details';
  describe(`Teste se é renderizado um card com as informações
  de determinado pokémon`, () => {
    const nextPoke = 'next-pokemon';
    it('O nome correto do pokémon deve ser mostrado na tela;', () => {
      renderWithRouter(<App />);
      let currentPokemon = screen.getByTestId('pokemon-name');
      expect(currentPokemon.innerHTML).toBe('Pikachu');
      const nextBtn = screen.getByTestId(nextPoke);
      userEvent.click(nextBtn);
      currentPokemon = screen.getByTestId('pokemon-name');
      expect(currentPokemon.innerHTML).toBe('Charmander');
    });

    it('O tipo correto do pokémon deve ser mostrado na tela;', () => {
      renderWithRouter(<App />);
      let currentPokemonType = screen.getByTestId('pokemon-type');
      expect(currentPokemonType.innerHTML).toBe('Electric');
      const nextBtn = screen.getByTestId(nextPoke);
      userEvent.click(nextBtn);
      currentPokemonType = screen.getByTestId('pokemon-type');
      expect(currentPokemonType.innerHTML).toBe('Fire');
    });

    it('O peso médio do pokémon deve ser exibido', () => {
      renderWithRouter(<App />);
      const currentPokemonWeight = screen.getByTestId('pokemon-weight');
      expect(currentPokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    });

    it(`A imagem do pokémon deve ser exibida. Ela deve conter um atributo
    src com a URL da imagem e um atributo alt com o texto <name> sprite,
    onde <name> é o nome do pokémon.`, () => {
      renderWithRouter(<App />);
      let currentPokemonImg = screen.getByRole('img', { alt: 'Pikachu sprite' });
      expect(currentPokemonImg.alt).toBe('Pikachu sprite');
      expect(currentPokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      const nextBtn = screen.getByTestId(nextPoke);
      userEvent.click(nextBtn);
      currentPokemonImg = screen.getByRole('img', { alt: 'Charmander sprite' });
      expect(currentPokemonImg.alt).toBe('Charmander sprite');
      expect(currentPokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    });

    it(`Teste se o card do pokémon indicado na Pokédex contém um link de navegação
    para exibir detalhes deste pokémon. `, () => {
      renderWithRouter(<App />);
      let currentPokemonMoreInfo = screen.getByRole('link', { name: moreDetails });
      expect(currentPokemonMoreInfo.href).toMatch(/\/pokemons\/25/i);
      const nextBtn = screen.getByTestId(nextPoke);
      userEvent.click(nextBtn);
      currentPokemonMoreInfo = screen.getByRole('link', { name: moreDetails });
      expect(currentPokemonMoreInfo.href).toMatch(/\/pokemons\/4/i);
    });

    it(`Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento
    da aplicação para a página de detalhes de pokémon;`, () => {
      const { history } = renderWithRouter(<App />);
      let currentPokemonMoreInfo = screen.getByRole('link', { name: moreDetails });
      userEvent.click(currentPokemonMoreInfo);
      let { pathname } = history.location;
      expect(pathname).toMatch(/\/pokemons\/25/i);
      history.push('/');
      const nextBtn = screen.getByTestId(nextPoke);
      userEvent.click(nextBtn);
      currentPokemonMoreInfo = screen.getByRole('link', { name: moreDetails });
      userEvent.click(currentPokemonMoreInfo);
      ({ pathname } = history.location);
      expect(pathname).toMatch(/\/pokemons\/4/i);
    });
  });

  describe('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    it(`O ícone deve ser uma imagem com o atributo src contendo o
     caminho /star-icon.svg;`, () => {
      const { history } = renderWithRouter(<App />);
      const currentPokemonMoreInfo = screen.getByRole('link', { name: moreDetails });
      userEvent.click(currentPokemonMoreInfo);
      const currentPokemonFavIcon = screen.getByRole('checkbox', { id: 'favorite' });
      userEvent.click(currentPokemonFavIcon);
      history.push('/favorites');
      const favIcon = screen.getByAltText('Pikachu is marked as favorite');
      expect(favIcon.src).toMatch(/star-icon.svg/);
    });

    it(`A imagem deve ter o atributo alt igual a <pokemon> 
    is marked as favorite, onde <pokemon> é o nome do pokémon exibido.`, () => {
      const { history } = renderWithRouter(<App />);
      const nextBtn = screen.getByTestId('next-pokemon');
      userEvent.click(nextBtn);
      const currentPokemonMoreInfo = screen.getByRole('link', { name: moreDetails });
      userEvent.click(currentPokemonMoreInfo);
      const currentPokemonFavIcon = screen.getByRole('checkbox', { id: 'favorite' });
      userEvent.click(currentPokemonFavIcon);
      history.push('/favorites');
      const favPokemon0 = screen.getByAltText('Pikachu is marked as favorite');
      const favPokemon1 = screen.getByAltText('Charmander is marked as favorite');
      expect(favPokemon0).toBeInTheDocument();
      expect(favPokemon1).toBeInTheDocument();
    });
  });
});
