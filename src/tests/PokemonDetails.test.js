import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const pikachuMoreDetailsPage = '/pokemons/25';
  const charmanderMoreDEtailsPage = '/pokemons/4';
  const moreDetails = 'More details';
  describe(`Teste se as informações detalhadas do pokémon selecionado 
  são mostradas na tela:`, () => {
    it(`A página deve conter um texto <name> Details, 
    onde <name> é o nome do pokémon;`, () => {
      const { history } = renderWithRouter(<App />);
      let currentPokemonMoreInfoBtn = screen.getByRole('link', { name: moreDetails });
      userEvent.click(currentPokemonMoreInfoBtn);
      let curPokemInfoH2Title = screen.getByRole('heading', { level: 2,
        name: 'Pikachu Details' });
      expect(curPokemInfoH2Title).toBeInTheDocument();
      expect(currentPokemonMoreInfoBtn).not.toBeInTheDocument();
      history.push('/');
      const nextBtn = screen.getByTestId('next-pokemon');
      userEvent.click(nextBtn);
      currentPokemonMoreInfoBtn = screen.getByRole('link', { name: moreDetails });
      userEvent.click(currentPokemonMoreInfoBtn);
      curPokemInfoH2Title = screen.getByRole('heading', { level: 2,
        name: 'Charmander Details' });
      expect(curPokemInfoH2Title).toBeInTheDocument();
      expect(currentPokemonMoreInfoBtn).not.toBeInTheDocument();
    });

    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      const detailsSection = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(detailsSection).toBeInTheDocument();
    });

    it(`A seção de detalhes deve conter um parágrafo com o resumo 
    do pokémon específico sendo visualizado.`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      let detailsSectionParagraph = screen
        .getByText(/This intelligent Pokémon roasts hard berries/i);
      expect(detailsSectionParagraph).toBeInTheDocument();
      history.push(charmanderMoreDEtailsPage);
      detailsSectionParagraph = screen
        .getByText(/The flame on its tail shows the strength of its life force/i);
    });
  });

  describe(`Teste se existe na página uma seção com os mapas
   contendo as localizações do pokémon:`, () => {
    it(`Na seção de detalhes deverá existir um heading h2 com o texto 
    Game Locations of <name>; onde <name> é o nome do pokémon exibido`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      let detailsSectionGameLocations = screen.getByRole('heading', { level: 2,
        name: 'Game Locations of Pikachu' });
      expect(detailsSectionGameLocations).toBeInTheDocument();
      history.push(charmanderMoreDEtailsPage);
      detailsSectionGameLocations = screen.getByRole('heading', { level: 2,
        name: 'Game Locations of Charmander' });
      expect(detailsSectionGameLocations).toBeInTheDocument();
    });

    it(`Todas as localizações do pokémon devem ser 
    mostradas na seção de detalhes;`, () => {
      const numberForCharmanderMaps = 4;
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      let imgForCurrentPokemLocation = screen.getAllByAltText('Pikachu location');
      expect(imgForCurrentPokemLocation.length).toBe(2);
      history.push(charmanderMoreDEtailsPage);
      imgForCurrentPokemLocation = screen.getAllByAltText('Charmander location');
      expect(imgForCurrentPokemLocation.length).toBe(numberForCharmanderMaps);
    });

    it(`Devem ser exibidos o nome da localização e uma imagem do 
    mapa em cada localização;`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      const imgForCurrentPokemLocation = screen.getAllByAltText('Pikachu location');
      const mapName1 = imgForCurrentPokemLocation[0].nextSibling;
      const mapName2 = imgForCurrentPokemLocation[1].nextSibling;
      expect(imgForCurrentPokemLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(mapName1.innerHTML).toMatch('Kanto Viridian Forest');
      expect(imgForCurrentPokemLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(mapName2.innerHTML).toMatch('Kanto Power Plant');
    });
  });

  describe(`Teste se o usuário pode favoritar um pokémon através da 
  página de detalhes:`, () => {
    it('A página deve exibir um checkbox que permite favoritar o pokémon;', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      const favIcon = screen.getByRole('checkbox', { id: 'favorite' });
      expect(favIcon).toBeInTheDocument();
    });

    it(`Cliques alternados no checkbox devem adicionar e remover respectivamente o 
    pokémon da lista de favoritos;`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      let favIcon = screen.getByRole('checkbox', { id: 'favorite' });
      userEvent.click(favIcon);
      history.push('/favorites');
      let favPokemonName = screen.getAllByTestId('pokemon-name');
      expect(favPokemonName[0].innerHTML).toBe('Pikachu');
      history.push(charmanderMoreDEtailsPage);
      favIcon = screen.getByRole('checkbox', { id: 'favorite' });
      userEvent.click(favIcon);
      history.push('/favorites');
      favPokemonName = screen.getAllByTestId('pokemon-name');
      expect(favPokemonName[1].innerHTML).toBe('Charmander');
    });

    it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuMoreDetailsPage);
      const favIconText = screen.getByLabelText('Pokémon favoritado?');
      expect(favIconText).toBeInTheDocument();
    });
  });
});
