document.addEventListener('DOMContentLoaded', function() {
    // Sample gallery data (replace with your actual images)
    const galleryData = [
        { 
            id: 1, 
            title: "Illustration abstraite", 
            category: "illustration", 
            imageUrl: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
        },
        { 
            id: 2, 
            title: "Affiche concert", 
            category: "affiche", 
            imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
        },
        { 
            id: 3, 
            title: "Logo minimaliste", 
            category: "logo", 
            imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
        },
        { 
            id: 4, 
            title: "Photo urbaine", 
            category: "photo", 
            imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
        },
        { 
            id: 5, 
            title: "Personnage cartoon", 
            category: "illustration", 
            imageUrl: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" 
        },
        { 
            id: 6, 
            title: "Affiche culturelle", 
            category: "affiche", 
            imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80" 
        },
        { 
            id: 7, 
            title: "Logo entreprise", 
            category: "logo", 
            imageUrl: "https://images.unsplash.com/photo-1611162616475-465b4c42f1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
        },
        { 
            id: 8, 
            title: "Paysage naturel", 
            category: "photo", 
            imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80" 
        }
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const loadMoreBtn = document.getElementById('load-more');
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const closeLightbox = document.getElementById('close-gallery-lightbox');

    let currentFilter = 'all';
    let visibleItems = 8;
    const itemsPerLoad = 8;

    // Initialize gallery
    function initGallery() {
        renderGalleryItems(getFilteredItems());
        setupEventListeners();
    }

    // Get filtered items based on current filter
    function getFilteredItems() {
        return currentFilter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === currentFilter);
    }

    // Render gallery items
    function renderGalleryItems(items, limit = visibleItems) {
        const itemsToShow = items.slice(0, limit);
        
        galleryGrid.innerHTML = itemsToShow.map(item => `
            <div class="gallery-item group" data-id="${item.id}" data-category="${item.category}">
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <span class="gallery-item-category">${getCategoryName(item.category)}</span>
                </div>
            </div>
        `).join('');

        // Hide load more button if all items are visible
        loadMoreBtn.style.display = limit >= items.length ? 'none' : 'inline-block';
    }

    // Get category name for display
    function getCategoryName(category) {
        const names = {
            'illustration': 'Illustration',
            'affiche': 'Affiche',
            'logo': 'Logo',
            'photo': 'Photographie'
        };
        return names[category] || category;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentFilter = this.dataset.filter;
                visibleItems = itemsPerLoad;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Render filtered items
                renderGalleryItems(getFilteredItems());
            });
        });

        // Load more button
        loadMoreBtn.addEventListener('click', function() {
            visibleItems += itemsPerLoad;
            renderGalleryItems(getFilteredItems(), visibleItems);
        });

        // Gallery items click (for lightbox)
        galleryGrid.addEventListener('click', function(e) {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                const itemId = parseInt(galleryItem.dataset.id);
                const item = galleryData.find(i => i.id === itemId);
                
                if (item) {
                    lightboxImg.src = item.imageUrl;
                    lightboxImg.alt = item.title;
                    lightboxTitle.textContent = item.title;
                    lightboxCategory.textContent = getCategoryName(item.category);
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Close lightbox
        closeLightbox.addEventListener('click', closeLightboxHandler);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxHandler();
            }
        });
    }

    function closeLightboxHandler() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Initialize the gallery
    initGallery();

    // Set first filter button as active
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('active');
    }
});