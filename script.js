// Dados dos produtos com preços em Meticais (MT)
const products = [
    {
        id: 1,
        name: "Mochila Urbana Executiva",
        price: 3750.00,
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "Ténis Minimalistas Brancos",
        price: 5000.00,
        category: "Calçado",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "Relógio Clássico Castanho",
        price: 8200.00,
        category: "Acessórios",
        image: "assets/relogio.jpg"
    },
    {
        id: 4,
        name: "Sérum Facial Hidratante",
        price: 1500.00,
        category: "Moda Feminina",
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=400&q=80"
    }
];

let cartCount = 0;

const productsGrid = document.getElementById('products-grid');
const cartCountElement = document.getElementById('cart-count');
const toastContainer = document.getElementById('toast-container');

// Formatar para Meticais
function formatMT(value) {
    return value.toLocaleString('pt-MZ', { minimumFractionDigits: 2 }) + ' MT';
}

// Sistema Toast (UX moderna)
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size: 16px;"></i> <span>${message}</span>`;
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Renderizar Produtos
function renderProducts() {
    productsGrid.innerHTML = '';

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatMT(product.price)}</div>
            </div>
            <button class="add-cart-btn" onclick="addToCart('${product.name}')">Adicionar</button>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Adicionar ao Carrinho
function addToCart(productName) {
    cartCount++;
    cartCountElement.textContent = cartCount;
    showToast(`"${productName}" adicionado ao carrinho!`);
}

// Observador de Scroll para Animações (Fade-in suave)
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initScrollReveal();
});

// ADICIONAR o side-bar do celular

const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Dispara a notificação Toast que já tínhamos criado
        if (typeof showToast === 'function') {
            showToast('Obrigado por subscrever a nossa newsletter!');
        } else {
            alert('Obrigado por subscrever a nossa newsletter!');
        }

        newsletterForm.reset();
    });
}

// ADICIONAR NO FINAL DO TEU SCRIPT.JS

const openMenuBtn = document.getElementById('open-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

// Função para abrir o menu lateral
if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
    });
}

// Função para fechar o menu lateral
function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
}

if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

const slideItems = document.querySelectorAll('.top-slide-item');
let currentSlide = 0;

function runTopSlider() {
    // Apenas executa o slider automaticamente em telemóveis e tablets (ecrãs < 1024px)
    if (window.innerWidth < 1024 && slideItems.length > 0) {
        slideItems[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slideItems.length;
        
        slideItems[currentSlide].classList.add('active');
    }
}

// Iniciar o intervalo de troca a cada 3.5 segundos
if (slideItems.length > 0) {
    setInterval(runTopSlider, 3500);
}

// Identifica automaticamente a página atual e destaca o link correspondente no menu
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

allNavLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }
});

// ADICIONAR NO FINAL DO TEU SCRIPT.JS (LÓGICA DOS FILTROS DA LOJA)

const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe active de todos os botões e adiciona ao clicado
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.textContent.trim();
            filterProducts(selectedCategory);
        });
    });
}

function filterProducts(category) {
    if (!productsGrid) return;

    if (category === 'Todos') {
        renderProducts(products); // Renderiza a lista completa
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered); // Renderiza apenas os produtos da categoria selecionada
    }
}

// Atualização leve na renderProducts para aceitar uma lista customizada
function renderProducts(itemsToRender = products) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    if (itemsToRender.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: #666;">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    itemsToRender.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatMT(product.price)}</div>
            </div>
            <button class="add-cart-btn" onclick="addToCart('${product.name}')">Adicionar</button>
        `;

        productsGrid.appendChild(productCard);
    });
}

// --- SISTEMA DE FILTRAGEM AUTOMÁTICA ENTRE PÁGINAS ---

// 1. Quando clicas num cartão de categoria na página inicial
const homeCategoryCards = document.querySelectorAll('.category-card');

if (homeCategoryCards.length > 0) {
    homeCategoryCards.forEach(card => {
        card.style.cursor = 'pointer'; // Torna o cursor em forma de mãozinha
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category) {
                // Guarda a categoria escolhida na memória do navegador
                localStorage.setItem('selectedCategory', category);
                // Redireciona para a página da loja
                window.location.href = 'loja.html';
            }
        });
    });
}

// 2. Quando a página da loja (loja.html) abre, aplica o filtro automaticamente se houver um guardado
if (window.location.pathname.includes('loja.html')) {
    window.addEventListener('DOMContentLoaded', () => {
        const savedCategory = localStorage.getItem('selectedCategory');
        
        if (savedCategory) {
            // Procura o botão de filtro correspondente e simula o clique nele
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                if (btn.textContent.trim().toLowerCase() === savedCategory.toLowerCase()) {
                    btn.click();
                }
            });
            
            // Limpa o armazenamento para não filtrar novamente ao atualizar a página
            localStorage.removeItem('selectedCategory');
        }
    });
}
