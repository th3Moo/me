class CodeViewerApp {
    constructor() {
        this.elements = {
            tabs: document.getElementById('tabs'),
            fileTree: document.getElementById('file-tree'),
            fileTreeHeader: document.getElementById('file-tree-header'),
            codeBlock: document.getElementById('code-block'),
            currentFilePath: document.getElementById('current-file-path'),
            copyButton: document.getElementById('copy-button'),
        };

        this.state = {
            flutterFiles: [],
            djangoFiles: [],
            activeProject: 'flutter',
            activeFile: null,
        };
    }

    async init() {
        lucide.createIcons();
        this.addEventListeners();
        await this.fetchData();
        this.switchTab('flutter');
    }

    addEventListeners() {
        this.elements.tabs.addEventListener('click', (e) => {
            const button = e.target.closest('.tab-button');
            if (button && button.dataset.project) {
                this.switchTab(button.dataset.project);
            }
        });

        this.elements.fileTree.addEventListener('click', (e) => {
            const fileItem = e.target.closest('.file-tree-item');
            const folderItem = e.target.closest('.folder-item');

            if (fileItem) {
                const path = fileItem.dataset.path;
                const files = this.state.activeProject === 'flutter' ? this.state.flutterFiles : this.state.djangoFiles;
                const file = files.find(f => f.path === path);
                if (file) this.renderCode(file);
            } else if (folderItem) {
                folderItem.classList.toggle('open');
            }
        });

        this.elements.copyButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.state.activeFile) {
                navigator.clipboard.writeText(this.state.activeFile.content).then(() => {
                    const span = this.elements.copyButton.querySelector('span');
                    const icon = this.elements.copyButton.querySelector('i');
                    const originalText = span.textContent;
                    
                    span.textContent = 'Copied!';
                    icon.setAttribute('data-lucide', 'check');
                    lucide.createIcons();
                    
                    setTimeout(() => {
                        span.textContent = originalText;
                        icon.setAttribute('data-lucide', 'copy');
                        lucide.createIcons();
                    }, 2000);
                });
            }
        });
    }

    async fetchData() {
        try {
            const [flutterRes, djangoRes] = await Promise.all([
                fetch('data/flutter_code.json'),
                fetch('data/django_code.json'),
            ]);
            this.state.flutterFiles = await flutterRes.json();
            this.state.djangoFiles = await djangoRes.json();
        } catch (error) {
            console.error('Failed to fetch source code data:', error);
            this.elements.codeBlock.textContent = 'Error: Could not load source code files.';
        }
    }

    switchTab(projectName) {
        this.state.activeProject = projectName;

        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.project === projectName);
        });

        this.elements.fileTreeHeader.textContent = `${projectName} Project Files`;
        this.renderFileTree();
        
        const files = projectName === 'flutter' ? this.state.flutterFiles : this.state.djangoFiles;
        let defaultFile;
        if (projectName === 'flutter') {
            defaultFile = files.find(f => f.path.includes('universal_cashier_view.dart')) || files[0];
        } else {
            defaultFile = files.find(f => f.path === 'super_app/settings.py') || files[0];
        }
        this.renderCode(defaultFile);
    }

    renderFileTree() {
        this.elements.fileTree.innerHTML = '';
        const files = this.state.activeProject === 'flutter' ? this.state.flutterFiles : this.state.djangoFiles;
        files.sort((a, b) => a.path.localeCompare(b.path));

        if (this.state.activeProject === 'flutter') {
            this.renderFlatTree(files);
        } else {
            const tree = this.buildHierarchy(files);
            this.renderHierarchicalTree(tree, this.elements.fileTree);
        }
        lucide.createIcons();
    }

    renderFlatTree(files) {
        files.forEach(file => {
            const depth = file.path.split('/').length - 1;
            const itemEl = document.createElement('a');
            itemEl.className = 'file-tree-item';
            itemEl.dataset.path = file.path;
            itemEl.style.paddingLeft = `${0.5 + depth * 1}rem`;
            itemEl.innerHTML = `<i data-lucide="file-code-2" class="text-yellow-400/60"></i><span>${file.path.split('/').pop()}</span>`;
            this.elements.fileTree.appendChild(itemEl);
        });
    }
    
    buildHierarchy(files) {
        const tree = {};
        files.forEach(file => {
            file.path.split('/').reduce((level, part, idx, arr) => {
                if (!level[part]) {
                    level[part] = { _files: [] };
                }
                if (idx === arr.length - 1) {
                    level[part]._files.push(file);
                }
                return level[part];
            }, tree);
        });
        return tree;
    }

    renderHierarchicalTree(node, container) {
        Object.keys(node).sort().forEach(key => {
            if (key === '_files') return;

            const children = node[key];
            const files = children._files;

            if (files.length > 0 && Object.keys(children).length === 1) {
                files.forEach(file => this.createFileElement(file, container));
            } else {
                const folderContainer = this.createFolderElement(key, container);
                this.renderHierarchicalTree(children, folderContainer.querySelector('.folder-content'));
                files.forEach(file => this.createFileElement(file, folderContainer.querySelector('.folder-content')));
            }
        });
    }

    createFileElement(file, container) {
        const fileEl = document.createElement('a');
        fileEl.className = 'file-tree-item';
        fileEl.dataset.path = file.path;
        fileEl.innerHTML = `<i data-lucide="file-code-2"></i><span>${file.path.split('/').pop()}</span>`;
        container.appendChild(fileEl);
    }

    createFolderElement(name, container) {
        const folderContainer = document.createElement('div');
        folderContainer.innerHTML = `
            <div class="folder-item">
                <i data-lucide="chevron-right"></i>
                <i data-lucide="folder" class="text-yellow-400/80"></i>
                <span>${name}</span>
            </div>
            <div class="folder-content"></div>
        `;
        container.appendChild(folderContainer);
        return folderContainer;
    }

    renderCode(file) {
        if (!file) {
            this.elements.codeBlock.textContent = 'Select a file to view its content.';
            this.elements.currentFilePath.textContent = '';
            this.state.activeFile = null;
            return;
        }

        this.state.activeFile = file;
        this.elements.currentFilePath.textContent = file.path;
        this.elements.codeBlock.textContent = file.content;
        
        const extension = file.path.split('.').pop();
        const langMap = { 'dart': 'dart', 'py': 'python', 'txt': 'ini', 'md': 'markdown' };
        this.elements.codeBlock.className = `language-${langMap[extension] || 'plaintext'} !bg-transparent p-6 text-sm`;

        hljs.highlightElement(this.elements.codeBlock);

        document.querySelectorAll('.file-tree-item').forEach(el => {
            el.classList.toggle('active', el.dataset.path === file.path);
        });

        const activeItem = document.querySelector(`.file-tree-item.active`);
        if (activeItem) {
            activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new CodeViewerApp();
    app.init();
});
