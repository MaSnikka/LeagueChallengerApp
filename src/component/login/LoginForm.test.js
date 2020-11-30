import React from 'react';
import {fireEvent, render} from "@testing-library/react";
import {LoginForm} from "./LoginForm";
import {handleSubmit} from "./Util";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("all tests", () => {
    it("form renders correctly", () => {
        const {getByTestId} = render(<LoginForm/>)

        expect(getByTestId("login-form")).toBeTruthy();
    })

    describe("Input value", () => {
        it("email updates on change", () => {
            const { getByPlaceholderText } = render(<LoginForm/>)

            const emailInput = getByPlaceholderText('email');

            fireEvent.change(emailInput, {target: {value: "test"}})

            expect(emailInput.value).toBe("test");
        })
        it("password updates on change", () => {
            const { getByPlaceholderText } = render(<LoginForm/>)

            const passwordInput = getByPlaceholderText('password');

            fireEvent.change(passwordInput, {target: {value: "test"}})

            expect(passwordInput.value).toBe("test");
        })
    })

    describe("login button", () => {
        describe("without required fields", () => {
            it("gives fitting error message", () => {
                const loginRequestedMock = jest.fn();

                const result = handleSubmit("", "", loginRequestedMock);
                expect(result.message).toBe("Required fields need input");
            })
            it("loginRequested not called", () => {
                const loginRequestedMock = jest.fn();

                handleSubmit("", "", loginRequestedMock);
                expect(loginRequestedMock).not.toHaveBeenCalled();
            })
        })
        describe("with correct required fields", () => {
            //test values
            var mock = new MockAdapter(axios);
            const data = {
                message: "Correct information",
                player: {
                    id: 1,
                    accountId: "sncBC-WhJBIIQr88gxAK9j1X0V3DDofgYdl1-6lY8sDHtLc",
                    leagueId: "ackYuY6s-6_jkzUKWaGISlLsNqy4_MRgLF80UIoPDFl0QTk",
                    puuid: "M4EF_2IMnQ_VZ4hUfFzTUgUIx5LVHYLhno9NyEY4HAo6PWyUpg937oZ-CyAlHfHwFuL1YF7cF18Ozg",
                }
            };

            mock.onPost("http://localhost:8080/account/login").reply(200, data);

            const email = "bas.van.eck@live.nl";
            const password = "Halloikbenkoen!1";

            it("gives fitting message", () => {
                const loginRequestedMock = jest.fn();

                return handleSubmit(email, password, loginRequestedMock).then(data => {
                    expect(data.message).toBe("Correct information");
                });
            })
            it("loginRequested called", () => {
                const loginRequestedMock = jest.fn();

                return handleSubmit(email, password, loginRequestedMock).then(data => {
                    expect(loginRequestedMock).toHaveBeenCalled();
                });
            })
        })
    })

})
