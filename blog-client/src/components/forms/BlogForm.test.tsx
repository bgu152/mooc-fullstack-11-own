import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('sending a blog', () => {
    const postBlog = jest.fn();

    const { container } = render(
        <BlogForm
            fetchAndSetBlogs={jest.fn()}
            setMessage={jest.fn()}
            toggleBlogForm={jest.fn()}
            postBlog={postBlog}
        />
    );

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');

    if (titleInput && authorInput && urlInput) {
        userEvent.type(titleInput, 'Announcing Rust 1.67.1');
        userEvent.type(authorInput, 'The Rust Release Team');
        userEvent.type(
            urlInput,
            'https://blog.rust-lang.org/2023/02/09/Rust-1.67.1.html'
        );

        const createButton = screen.getByText('save');

        userEvent.click(createButton);

        expect(postBlog.mock.calls).toHaveLength(1);
        // console.log(postBlog.mock.calls[0][0]);
        expect(postBlog.mock.calls[0][0].title).toBe('Announcing Rust 1.67.1');
        expect(postBlog.mock.calls[0][0].author).toBe('The Rust Release Team');
        expect(postBlog.mock.calls[0][0].url).toBe('https://blog.rust-lang.org/2023/02/09/Rust-1.67.1.html');
    } else {
        throw new Error('missing inputs');
    }
});
