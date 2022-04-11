import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PostComponent from './PostComponent';
import { BrowserRouter } from 'react-router-dom';
import { Post } from './post';
import { Profile } from '../profile/profile';

describe('Post testing', () => {

  it('should show Oh Yeah', async () => {

    const aProfile: Profile = {
      id: '',
      first_name: '',
      last_name: '',
      profile_img: '',
      header_img: '',
      about_me: '',
      birthday: '',
      hobby: '',
      location: '',
      followers: [],
      user_id: '',
      follower_num: 0,
      following_num: 0
    }

    const aPost: Post = {
      id: '',
      title: 'Shreks Swamp',
      postText: '',
      contentType: '',
      date: new Date(),
      comments: [{
        commentId: '',
        commentText: "Donkey!",
        date: new Date(),
        author: null
      }],
      contentLink: '',
      authorID: '',
      groupID: '',
      groupName: ''
    }

    const dummyFunc = jest.fn();

    React.useState = jest.fn()
      .mockReturnValue([true, () => { }]);

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PostComponent post={aPost} leaveComment={dummyFunc} shouldUpdateLikes={[]} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText("Shreks Swamp")).toBeInTheDocument();
    expect(getByText("Donkey!")).toBeInTheDocument();

    const button = getByTestId("submitButton");
    fireEvent.click(button);
    expect(dummyFunc).toBeCalled();

    // const button2 = getByTestId("reverbButton");
    // const reverbFunc = jest.spyOn(util, "likePostFunc");
    // fireEvent.click(button2);
    // expect(reverbFunc).toBeCalled();
  })


});