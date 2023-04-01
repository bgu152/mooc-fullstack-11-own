import * as listHelper from '../utils/list_helper';

describe('total likes', () => {
    const listWithOneBlog: Blog[] = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ];

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    const bloglist: Blog[] = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
        {
            title: 'Some cool stuff',
            author: 'Ada',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        },
        {
            title: 'First blog',
            author: 'Erik',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        },
    ];

    test('when likes are missing, the like count is interpreted as zero', () => {
        const result = listHelper.totalLikes(bloglist);
        expect(result).toBe(19);
    });

    test('the most popular blog', () => {
        const result = listHelper.favoriteBlog(bloglist);
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        });
    });

    test('the author with most blogs', () => {
        const result = listHelper.mostBlogs(bloglist);
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2,
        });
    });

    test('the author with most likes', () => {
        const result = listHelper.mostLikes(bloglist);
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        });
    });
});
