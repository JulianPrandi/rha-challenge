import {render, screen, cleanup} from '@testing-library/react';
import Pokedex from '../Pokedex/Pokedex';

afterEach(()=>{
   cleanup();
})

test('Title in place',()=>{
   render(<Pokedex/>);
   const title = screen.getByTestId('test1');
   expect(title).toBeInTheDocument();
   expect(title).toHaveTextContent('Pokedex')
});


test('Grid is rendered completly', ()=>{
   render(<Pokedex/>);
   const grid = screen.getByTestId('test2');
   expect(grid).toBeInTheDocument();
   expect(grid).toBeVisible();
});

test('Pokecard is in place', ()=>{
   render(<Pokedex/>);
   const grid = screen.getByTestId('test3');
   expect(grid).toBeInTheDocument();
   expect(grid).toBeDefined();
});