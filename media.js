       // ===== TAB SWITCHING =====
        function switchMediaTab(tabName, clickedBtn) {
            document.querySelectorAll('.media-tab').forEach(function (tab) {
                tab.classList.remove('active');
            });
            clickedBtn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(function (content) {
                content.classList.remove('active');
            });
            var selectedTab = document.getElementById('tab-' + tabName);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        }

        // ===== UNIVERSAL CARD TOGGLE - Only the clicked card opens/closes =====
        function toggleCard(cardId) {
            var card = document.getElementById(cardId);
            if (!card) return;

            // Check if this card is currently active
            var isActive = card.classList.contains('active');

            // Close ALL cards EVERYWHERE (complete isolation)
            var allCards = document.querySelectorAll('.news-card');
            for (var i = 0; i < allCards.length; i++) {
                allCards[i].classList.remove('active');
            }

            // If the clicked card wasn't active, open it now
            if (!isActive) {
                card.classList.add('active');
            }
        }

        // ===== MEDIA SCROLL =====
        function scrollMedia(containerId, direction) {
            var container = document.getElementById(containerId + '-scroll');
            if (container) {
                container.scrollBy({
                    left: direction * 340,
                    behavior: 'smooth'
                });
            }
        }

        // ===== FAQ ACCORDION =====
        function toggleFaq(el) {
            var item = el.parentElement;
            var isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function (i) {
                i.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        }

        // ===== ESC to close =====
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.news-card').forEach(function (c) {
                    c.classList.remove('active');
                });
                document.querySelectorAll('.faq-item').forEach(function (i) {
                    i.classList.remove('active');
                });
            }
        });