import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const testID = 'pokemon-name';
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons;', () => {
    renderWithRouter(<App />);
    const pokedexH2Title = screen.getByRole('heading', { level: 2,
      name: /Encountered pokémons/i });
    expect(pokedexH2Title).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon
  é clicado e quando chegar no ultimo, voltar ao primeiro pokemon`, () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextBtn);
    const firstNextPokem = screen.getByTestId(testID);
    expect(firstNextPokem.innerHTML).toBe('Charmander');
    userEvent.click(nextBtn);
    const secondNextPokem = screen.getByTestId(testID);
    expect(secondNextPokem.innerHTML).toBe('Caterpie');
    const numberOfTimesNextBtnWasClicked = 2;
    pokemons.forEach((_a, i) => i < (pokemons.length - numberOfTimesNextBtnWasClicked)
    && userEvent.click(nextBtn));
    const toBeTheFirstPokem = screen.getByTestId(testID);
    expect(toBeTheFirstPokem.innerHTML).toBe('Pikachu');
  });

  it('Teste se é mostrado apenas um pokémon por vez;', () => {
    renderWithRouter(<App />);
    const dataTestId = screen.getAllByTestId(testID);
    expect(dataTestId.length).toBe(1);
  });

  describe('Teste se a Pokédex tem os botões de filtro', () => {
    it(`Deve existir um botão de filtragem para cada tipo de pokémon,
    sem repetição`, () => {
      renderWithRouter(<App />);
      const numberOfTypeBtnInScreen = 7;
      const btnTypeFilter = screen.getAllByTestId('pokemon-type-button');
      expect(btnTypeFilter.length).toBe(numberOfTypeBtnInScreen);
      const pokTyp = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
      btnTypeFilter.forEach((btn, i) => expect(btn.innerHTML).toContain(pokTyp[i]));
    });

    it(`A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos
    pokémons daquele tipo;`, () => {
      renderWithRouter(<App />);
      const testIDType = 'pokemon-type';
      const btnTypeFilter = screen.getAllByTestId('pokemon-type-button');
      userEvent.click(btnTypeFilter[0]);
      expect(btnTypeFilter[0].innerHTML).toBe('Electric');
      let renderingPokemType = screen.getByTestId(testIDType);
      expect(renderingPokemType.innerHTML).toBe('Electric');
      userEvent.click(btnTypeFilter[2]);
      renderingPokemType = screen.getByTestId(testIDType);
      expect(renderingPokemType.innerHTML).toBe('Bug');
      userEvent.click(btnTypeFilter[0]);
      expect(btnTypeFilter[0].innerHTML).toBe('Electric');
      renderingPokemType = screen.getByTestId(testIDType);
      expect(renderingPokemType.innerHTML).toBe('Electric');
      userEvent.click(btnTypeFilter[1]);
      expect(btnTypeFilter[1].innerHTML).toBe('Fire');
      let currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Charmander');
      const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextBtn);
      currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Rapidash');
    });

    it('O botão All precisa estar sempre visível.', () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByTestId('');
      expect(btnAll).not.toHaveAttribute('disabled');
    });

    it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
      const { history } = renderWithRouter(<App />);
      let btnAll = screen.getByTestId('');
      expect(btnAll.innerHTML).toBe('All');
      let currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Pikachu');
      let nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextBtn);
      currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Charmander');
      userEvent.click(nextBtn);
      currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Caterpie');
      history.push('/abc');
      history.push('/');
      currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Pikachu');
      nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextBtn);
      currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Charmander');
      btnAll = screen.getByTestId('');
      userEvent.click(btnAll);
      currentPokem = screen.getByTestId(testID);
      expect(currentPokem.innerHTML).toBe('Pikachu');
    });
  });
});
