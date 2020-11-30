import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

//Cleanup garbage from testing
afterEach(cleanup);

describe("<App />", () => {
  //Makes snapshot of rendered HTML. If failed press U to update.
  it("Renders <App /> component correctly", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});