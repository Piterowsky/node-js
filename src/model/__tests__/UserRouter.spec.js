import router from '../../route/UserRouter';

describe('Item router should has correct paths', () => {
    test('Path correctness', () => {
        const paths = [
            { path: '/', method: 'get' },
            { path: '/:id', method: 'get' },
            { path: '/', method: 'post' },
            { path: '/:id', method: 'put' },
            { path: '/:id', method: 'delete' },
        ];

        paths.forEach((route) => {
            const result = router.stack.find((s) => s.route.path === route.path && s.route.methods[route.method]);
            expect(result).toBeTruthy();
        });
    });
});
