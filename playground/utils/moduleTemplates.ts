const moduleTemplates = {
    'utility': {
        url: 'github:simagar/utility',
    },
    'auth':
        {
            url: 'github:simagar/Auth',
            dependencies: ['@pinia-plugin-persistedstate/nuxt','pathe'],
            devDependencies: ['postcss']
        }
    ,
    'spinner': 'github:simagar/spinner',
}

export {
    moduleTemplates
}
