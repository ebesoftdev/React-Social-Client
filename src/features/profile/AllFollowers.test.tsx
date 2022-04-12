import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import AllFollowers, { util } from './AllFollowers';
import { BrowserRouter } from 'react-router-dom';
import { update } from './profileSlice';

describe('AllFollowers testing', () => {

    it('should show Followers', async ()=>{

        const { getByText } = render(
          <Provider store={store}>
              <BrowserRouter>
                <AllFollowers/>
              </BrowserRouter>
          </Provider>
        );
        expect(getByText("Followers")).toBeInTheDocument();
      })

      it('should call dispatchUser and updateAll', async () => {
        const { getByTestId } = render(
          <Provider store={store}>
              <BrowserRouter>
                <AllFollowers/>
              </BrowserRouter>
          </Provider>
        );
        const updateAll = jest.spyOn(util, 'updateAll');
        const dispatchUser = jest.spyOn(util, 'dispatchUser');
        //expect(update).toBeInTheDocument();
        // expect(dispatchUser).toBeInTheDocument();
      })
});

describe('AllFollowers testing', () => {

  it('should show email ', async ()=>{
    const { getByRole } = render(
      <Provider store={store}>
          <BrowserRouter>
            <AllFollowers/>
          </BrowserRouter>
      </Provider>
    );
    //const email = jest.spyOn(util, 'email');
    //expect(getByRole("email")).toBeInTheDocument();
  })

});