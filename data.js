export const fileTree = [
    { name: 'README.md', type: 'file', icon: 'book-marked' },
    { name: 'requirements.txt', type: 'file', icon: 'list' },
    { name: 'manage.py', type: 'file', icon: 'terminal-square' },
    {
        name: 'super_app_backend', type: 'folder', children: [
            { name: '__init__.py', type: 'file', icon: 'file-code' },
            { name: 'asgi.py', type: 'file', icon: 'file-code' },
            { name: 'settings.py', type: 'file', icon: 'settings' },
            { name: 'urls.py', type: 'file', icon: 'link-2' },
            { name: 'wsgi.py', type: 'file', icon: 'file-code' },
        ]
    },
    {
        name: 'accounts', type: 'folder', children: [
            { name: 'apps.py', type: 'file', icon: 'box' },
            { name: 'models.py', type: 'file', icon: 'database' },
            { name: 'serializers.py', type: 'file', icon: 'file-json-2' },
            { name: 'views.py', type: 'file', icon: 'airplay' },
            { name: 'urls.py', type: 'file', icon: 'link-2' },
            { name: 'admin.py', type: 'file', icon: 'shield' },
            { name: '__init__.py', type: 'file', icon: 'file-code' },
        ]
    },
    {
        name: 'wallets', type: 'folder', children: [
            { name: 'apps.py', type: 'file', icon: 'box' },
            { name: 'models.py', type: 'file', icon: 'database' },
            { name: 'serializers.py', type: 'file', icon: 'file-json-2' },
            { name: 'views.py', type: 'file', icon: 'airplay' },
            { name: 'urls.py', type: 'file', icon: 'link-2' },
            { name: 'admin.py', type: 'file', icon: 'shield' },
            { name: 'tasks.py', type: 'file', icon: 'clock' },
            { name: 'utils.py', type: 'file', icon: 'wrench' },
            { name: '__init__.py', type: 'file', icon: 'file-code' },
        ]
    },
    {
        name: 'gaming', type: 'folder', children: [
            { name: 'apps.py', type: 'file', icon: 'box' },
            { name: 'models.py', type: 'file', icon: 'database' },
            { name: 'serializers.py', type: 'file', icon: 'file-json-2' },
            { name: 'views.py', type: 'file', icon: 'airplay' },
            { name: 'urls.py', type: 'file', icon: 'link-2' },
            { name: 'admin.py', type: 'file', icon: 'shield' },
            { name: '__init__.py', type: 'file', icon: 'file-code' },
        ]
    },
    {
        name: 'cashier', type: 'folder', children: [
            { name: 'apps.py', type: 'file', icon: 'box' },
            { name: 'views.py', type: 'file', icon: 'airplay' },
            { name: 'urls.py', type: 'file', icon: 'link-2' },
             { name: '__init__.py', type: 'file', icon: 'file-code' },
        ]
    },
    {
        name: 'payments', type: 'folder', children: [
            { name: 'apps.py', type: 'file', icon: 'box' },
            { name: 'views.py', type: 'file', icon: 'airplay' },
            { name: 'urls.py', type: 'file', icon: 'link-2' },
             { name: '__init__.py', type: 'file', icon: 'file-code' },
        ]
    },
];
