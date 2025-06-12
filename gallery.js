document.addEventListener('DOMContentLoaded', function() {
    // Sample gallery data (replace with your actual images)
    const galleryData = [
        { 
            id: 1, 
            title: "Illustration moderne", 
            category: "illustration", 
            imageUrl: "images/image (5).png" 
        },
        { 
            id: 2, 
            title: "Affiche conférence", 
            category: "affiche", 
            imageUrl: "images/image2.png" 
        },
        { 
            id: 2, 
            title: "Affiche pour une journée de la fête des mères", 
            category: "affiche", 
            imageUrl: "images/image4.png" 
        },
        { 
            id: 3, 
            title: "Logo du dahira  siratikhal moutakhim de l'UASZ", 
            category: "logo", 
            imageUrl: "images/image (19).png" 
        },
        { 
            id: 4, 
            title: "video d'animation d'une affiche", 
            category: "video", 
            imageUrl: "images/image (9).png" 
        },
        { 
            id: 5, 
            title: "Personnage politique", 
            category: "illustration", 
            imageUrl: "images/image (8).png" 
        },
        { 
            id: 6, 
            title: "Affiche religieuse", 
            category: "affiche", 
            imageUrl: "images/image7.png" 
        },
        { 
            id: 7, 
            title: "Logo amicale des étudiants comorien de l'UASZ", 
            category: "logo", 
            imageUrl: "images/image16.png" 
        },
        { 
            id: 8, 
            title: "affiche pour une journée de sensibilisation", 
            category: "affiche", 
            imageUrl: "images/image (4).png" 
        },
        { 
            id: 2, 
            title: "Affiche conférence religieuse", 
            category: "affiche", 
            imageUrl: "images/image6.png" 
        },
        { 
            id: 2, 
            title: "Affiche pour une journée de synthése philosophique", 
            category: "affiche", 
            imageUrl: "images/image12.png" 
        },
        { 
            id: 2, 
            title: "Affiche pour une journée de la fête des mères", 
            category: "affiche", 
            imageUrl: "images/image (6).png" 
        },
        { 
            id: 2, 
            title: "Affiche pour une journée de la fête des mères", 
            category: "affiche", 
            imageUrl: "images/image17.png" 
        },
        { 
            id: 2, 
            title: "Affiche pour une journée de ndogou d'une amicale", 
            category: "affiche", 
            imageUrl: "images/image (3).png" 
        },
        { 
            id: 2, 
            title: "Affiche pour une journée de yéndou de la licence en ingénierie informatique", 
            category: "affiche", 
            imageUrl: "images/image1.png" 
        },
        { 
            id: 2, 
            title: "Affiche pour une vendeuse de patisserie", 
            category: "affiche", 
            imageUrl: "images/image13.png" 
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