import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import BlogComponent from './BlogComponent';
import userEvent from '@testing-library/user-event';

test('renders author and title, not url, likes or user', () => {
    const blog: Blog = {
        author: 'Dijsktra',
        id: '63fe4628c46859df2e455ee8',
        likes: 42,
        title: 'New algo',
        url: 'https://drD.com',
        user: {
            username: 'rammser',
            name: 'Erik',
            id: '63fb66d190fd8fe020514cae',
        },
    };
    const fetchAndSetBlogs = jest.fn();
    const like = jest.fn();

    const { container } = render(
        <BlogComponent
            blog={blog}
            fetchAndSetBlogs={fetchAndSetBlogs}
            like={like}
        />
    );

    const authorSpan = container.querySelector('.author');
    expect(authorSpan).toHaveTextContent('Dijsktra');
    expect(authorSpan).toBeVisible();

    const titleSpan = container.querySelector('.title');
    expect(titleSpan).toHaveTextContent('New algo');
    expect(titleSpan).toBeVisible();

    const urlSpan = container.querySelector('.url');
    expect(urlSpan).not.toBeVisible();

    const likes = container.querySelector('.likes');
    expect(likes).not.toBeVisible();

    const user = container.querySelector('.user');
    expect(user).not.toBeVisible();
});

test('Clicking button makes likes visible', () => {
    const blog: Blog = {
        author: 'Dijsktra',
        id: '63fe4628c46859df2e455ee8',
        likes: 42,
        title: 'New algo',
        url: 'https://drD.com',
        user: {
            username: 'rammser',
            name: 'Erik',
            id: '63fb66d190fd8fe020514cae',
        },
    };
    const fetchAndSetBlogs = jest.fn();
    const like = jest.fn();

    const { container } = render(
        <BlogComponent
            blog={blog}
            fetchAndSetBlogs={fetchAndSetBlogs}
            like={like}
        />
    );

    const user = userEvent;

    const button = screen.getByText('view');

    user.click(button);

    const likes = container.querySelector('.likes');
    expect(likes).toBeVisible();
    expect(likes).toHaveTextContent('likes 42');
});

test('Blog is liked twice', () => {
    const blog: Blog = {
        author: 'Dijsktra',
        id: '63fe4628c46859df2e455ee8',
        likes: 42,
        title: 'New algo',
        url: 'https://drD.com',
        user: {
            username: 'rammser',
            name: 'Erik',
            id: '63fb66d190fd8fe020514cae',
        },
    };
    const fetchAndSetBlogs = jest.fn();
    const likeHandler = jest.fn();

    render(
        <BlogComponent
            blog={blog}
            fetchAndSetBlogs={fetchAndSetBlogs}
            like={likeHandler}
        />
    );

    const user = userEvent;

    const viewButton = screen.getByText('view');
    const likeButton = screen.getByText('like');

    user.click(viewButton);

    user.click(likeButton);
    user.click(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
});
