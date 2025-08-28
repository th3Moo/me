import { fileTree } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const fileTreeContainer = document.getElementById('file-tree');
    const codeBlock = document.getElementById('code-block');
    const filePathDisplay = document.getElementById('file-path');
    const copyButton = document.getElementById('copy-button');
    const copyText = document.getElementById('copy-text');
    const contentContainer = document.getElementById('code-container');
    
    let currentPath = '';

    function renderFileTree(node, container, path = '') {
        const ul = document.createElement('ul');
        if (path !== '') ul.classList.add('folder-content');
        
        node.forEach(item => {
            const li = document.createElement('li');
            const itemPath = `${path}/${item.name}`;

            if (item.type === 'folder') {
                const folderDiv = document.createElement('div');
                folderDiv.className = 'folder-item';
                folderDiv.innerHTML = `
                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                    <i data-lucide="folder" class="w-4 h-4 text-yellow-400"></i>
                    <span>${item.name}</span>
                `;
                folderDiv.addEventListener('click', (e) => {
                    e.stopPropagation();
                    folderDiv.classList.toggle('open');
                });
                li.appendChild(folderDiv);
                li.appendChild(renderFileTree(item.children, li, itemPath));
            } else {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'file-item';
                fileDiv.dataset.path = itemPath;
                fileDiv.innerHTML = `
                    <i data-lucide="${item.icon || 'file'}" class="w-4 h-4 text-gray-400"></i>
                    <span>${item.name}</span>
                `;
                li.appendChild(fileDiv);
            }
            ul.appendChild(li);
        });
        container.appendChild(ul);
        return ul;
    }

    async function loadFileContent(path) {
        if (!path) return;
        currentPath = path;

        document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
        const activeFileEl = document.querySelector(`[data-path="${path}"]`);
        if (activeFileEl) {
            activeFileEl.classList.add('active');
            let parent = activeFileEl.closest('.folder-content');
            while (parent) {
                const folderItem = parent.previousElementSibling;
                if(folderItem && folderItem.classList.contains('folder-item')) {
                    folderItem.classList.add('open');
                }
                parent = parent.parentElement.closest('.folder-content');
            }
        }
        
        filePathDisplay.textContent = path.substring(1); // remove leading '/'
        contentContainer.classList.remove('prose', 'prose-invert');
        codeBlock.removeAttribute('data-highlighted');

        try {
            const response = await fetch(`.${path}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();

            if (path.endsWith('.md')) {
                codeBlock.innerHTML = marked.parse(content);
                contentContainer.classList.add('prose', 'prose-invert', 'p-6');
                codeBlock.className = '';
            } else {
                codeBlock.textContent = content;
                codeBlock.className = `language-${path.split('.').pop()}`;
                hljs.highlightElement(codeBlock);
            }

        } catch (error) {
            codeBlock.textContent = `Error loading file: ${path}\n\n${error}`;
            codeBlock.className = 'language-text';
            hljs.highlightElement(codeBlock);
        }
    }

    fileTreeContainer.addEventListener('click', (e) => {
        const fileItem = e.target.closest('.file-item');
        if (fileItem) {
            const path = fileItem.dataset.path;
            loadFileContent(path);
        }
    });

    copyButton.addEventListener('click', () => {
        const textToCopy = codeBlock.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyText.textContent = 'Copied!';
            copyButton.querySelector('i').setAttribute('data-lucide', 'check');
            lucide.createIcons();
            setTimeout(() => {
                copyText.textContent = 'Copy';
                copyButton.querySelector('i').setAttribute('data-lucide', 'copy');
                lucide.createIcons();
            }, 2000);
        }, (err) => {
            copyText.textContent = 'Failed!';
            console.error('Failed to copy: ', err);
            setTimeout(() => {
                copyText.textContent = 'Copy';
            }, 2000);
        });
    });

    renderFileTree(fileTree, fileTreeContainer);
    lucide.createIcons();
    loadFileContent('/README.md');
});
