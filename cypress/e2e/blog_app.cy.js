describe('Blog App', () => {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:8080/api/testing/reset');
        const user = {
            username: 'rammser',
            name: 'Erik',
            password: 'kaffe',
        };
        cy.request('POST', 'http://localhost:8080/api/users', user);
        cy.visit('http://localhost:8080');
    });

    it('Login form is shown', function () {
        cy.contains('Login');
        cy.contains('username');
        cy.contains('password');
    });

    it('user can log in with correct credentials', function () {
        cy.get('#username').type('rammser');
        cy.get('#password').type('kaffe');
        cy.get('#login-button').click();

        cy.contains('Erik logged in');
    });

    it('user cannot login with wrong credentials', function () {
        cy.get('#username').type('janne');
        cy.get('#password').type('salasana');
        cy.get('#login-button').click();

        cy.contains('invalid username or password');
    });

    it('A blog can be created', function () {
        cy.get('#username').type('rammser');
        cy.get('#password').type('kaffe');
        cy.get('#login-button').click();

        cy.contains('create').click();
        cy.get('input:first').type('Go To Statement Considered Harmful');
        cy.get('input').eq(1).type('Edsger Dijkstra');
        cy.get('input')
            .eq(2)
            .type(
                'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
            );

        cy.contains('save').click();
        cy.contains(
            'A new blog Go To Statement Considered Harmful by Edsger Dijkstra added'
        );
        cy.contains('Go To Statement Considered Harmful Edsger Dijkstra');
    });

    it('A blog can be liked', function () {
        cy.get('#username').type('rammser');
        cy.get('#password').type('kaffe');
        cy.get('#login-button').click();

        cy.contains('create').click();
        cy.get('input:first').type('Go To Statement Considered Harmful');
        cy.get('input').eq(1).type('Edsger Dijkstra');
        cy.get('input')
            .eq(2)
            .type(
                'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
            );

        cy.contains('save').click();
        cy.contains('view').click();
        cy.contains('like').click();
        cy.contains('likes 1');
    });

    it('A blog can be deleted by user who added it', function () {
        cy.get('#username').type('rammser');
        cy.get('#password').type('kaffe');
        cy.get('#login-button').click();

        cy.contains('create').click();
        cy.get('input:first').type('Go To Statement Considered Harmful');
        cy.get('input').eq(1).type('Edsger Dijkstra');
        cy.get('input')
            .eq(2)
            .type(
                'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
            );

        cy.contains('save').click();
        cy.contains('view').click();
        cy.contains('like').click();
        cy.contains('Remove').click();
        cy.contains('Go To Statement Considered Harmful').should('not.exist');
    });

    it('A blog cannot be deleted by other user', function () {
        const user = {
            username: 'rammser2',
            name: 'Erik2',
            password: 'kaffe2',
        };
        cy.request('POST', 'http://localhost:8080/api/users', user);
        cy.get('#username').type('rammser');
        cy.get('#password').type('kaffe');
        cy.get('#login-button').click();

        cy.contains('create').click();
        cy.get('input:first').type('Go To Statement Considered Harmful');
        cy.get('input').eq(1).type('Edsger Dijkstra');
        cy.get('input')
            .eq(2)
            .type(
                'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
            );

        cy.contains('save').click();
        cy.contains('Logout').click();

        cy.get('#username').type('rammser2');
        cy.get('#password').type('kaffe2');
        cy.get('#login-button').click();

        cy.contains('view').click();
        cy.contains('Remove').should('not.exist');
    });

    it('Blogs listed by likes', function () {
        cy.get('#username').type('rammser');
        cy.get('#password').type('kaffe');
        cy.get('#login-button').click();

        cy.contains('create').click();
        cy.get('input:first').type('Go To Statement Considered Harmful');
        cy.get('input').eq(1).type('Edsger Dijkstra');
        cy.get('input')
            .eq(2)
            .type(
                'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
            );
        cy.contains('save').click();

        cy.contains('create').click();
        cy.get('input:first').type('What Are the React Team Principles?');
        cy.get('input').eq(1).type('Dan Abramov');
        cy.get('input')
            .eq(2)
            .type('https://overreacted.io/what-are-the-react-team-principles/');
        cy.contains('save').click();

        cy.wait(2000);

        cy.get('div.blog')
            .contains('Go To Statement Considered Harmful')
            .parent()
            .contains('view')
            .click();

        for (let i = 0; i < 1; i++) {
            cy.get('div.blog')
                .contains('Go To Statement Considered Harmful')
                .parent()
                .contains('like')
                .click();
        }

        cy.get('div.blog')
            .contains('What Are the React Team Principles')
            .parent()
            .contains('view')
            .click();

        for (let i = 0; i < 2; i++) {
            cy.get('div.blog')
                .contains('What Are the React Team Principles')
                .parent()
                .contains('like')
                .click();
        }
        cy.get('div.blog').eq(0).contains('What Are the React Team Principles');
        cy.get('div.blog').eq(1).contains('Go To Statement Considered Harmful');

        for (let i = 0; i < 3; i++) {
            cy.get('div.blog')
                .contains('Go To Statement Considered Harmful')
                .parent()
                .contains('like')
                .click();
        }


        cy.get('div.blog').eq(0).contains('Go To Statement Considered Harmful');
    });
});
