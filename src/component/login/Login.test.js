import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

//Cleanup garbage from testing
afterEach(cleanup);

describe("<Login />", () => {
    //Makes snapshot of rendered HTML. If failed press U to update.
    it("Renders <Login /> component correctly", () => {
        const { asFragment } = render(<Router><Login /></Router>)
        expect(asFragment()).toMatchSnapshot();
    });

});