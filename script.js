document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const overlay = document.getElementById('overlay');

    // ===========================================
    // ส่วนควบคุมการขยายและย่อการ์ดเมนู
    // ===========================================
    const menuGrid = document.querySelector('.menu-grid');
    if (menuGrid) {
        menuGrid.addEventListener('click', function(e) {
            if (e.target.classList.contains('read-more-btn')) {
                const card = e.target.closest('.menu-card');
                if (card) expandCard(card);
            }
            if (e.target.classList.contains('close-btn')) {
                const card = e.target.closest('.menu-card');
                if (card) collapseCard(card);
            }
        });
    }

    function expandCard(card) {
        card.classList.add('card-expanded');
        if (overlay) overlay.classList.add('visible');
        body.classList.add('body-no-scroll');
    }

    function collapseCard(card) {
        card.classList.remove('card-expanded');
        if (overlay) overlay.classList.remove('visible');
        body.classList.remove('body-no-scroll');
    }

    // ===========================================
    // ส่วนควบคุม Modal ข้อเสนอแนะ
    // ===========================================
    const suggestionsBtn = document.getElementById('suggestions-btn');
    const suggestionsModal = document.getElementById('suggestions-modal');
    
    // ตรวจสอบว่ามีปุ่มและ modal ในหน้านั้นๆ หรือไม่
    if (suggestionsBtn && suggestionsModal) {
        const closeModalBtn = suggestionsModal.querySelector('.close-modal-btn');

        suggestionsBtn.addEventListener('click', function(e) {
            e.preventDefault(); // ป้องกันการเลื่อนหน้า
            suggestionsModal.classList.add('visible');
            if (overlay) overlay.classList.add('visible');
            body.classList.add('body-no-scroll');
        });

        closeModalBtn.addEventListener('click', function() {
            suggestionsModal.classList.remove('visible');
            if (overlay) overlay.classList.remove('visible');
            body.classList.remove('body-no-scroll');
        });
    }

    // ===========================================
    // คลิกที่ Overlay เพื่อปิดทุกอย่าง
    // ===========================================
    if (overlay) {
        overlay.addEventListener('click', function() {
            // ปิดการ์ดที่ขยายอยู่
            const expandedCard = document.querySelector('.menu-card.card-expanded');
            if (expandedCard) collapseCard(expandedCard);
            
            // ปิด Modal ที่เปิดอยู่
            if (suggestionsModal && suggestionsModal.classList.contains('visible')) {
                suggestionsModal.classList.remove('visible');
                overlay.classList.remove('visible');
                body.classList.remove('body-no-scroll');
            }
        });
    }

    // ===========================================
    // ส่วนควบคุมปุ่ม "Load More" (ในหน้า index.html)
    // ===========================================
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        const hiddenCards = document.querySelectorAll('.hidden-card');
        if (hiddenCards.length > 0) {
            loadMoreBtn.addEventListener('click', function() {
                hiddenCards.forEach(card => card.classList.remove('hidden-card'));
                loadMoreBtn.style.display = 'none';
            });
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
});