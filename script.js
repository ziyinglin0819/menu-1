document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 12; // 每頁顯示 12 道料理
    const grid = document.querySelector(".recipe-grid");
    const cards = Array.from(grid.querySelectorAll(".recipe-card"));
    const paginationContainer = document.getElementById("pagination");
    const searchInput = document.querySelector(".search-bar input");
    const searchBtn = document.querySelector(".search-bar button");
    
    let filteredCards = [...cards]; // 儲存篩選後的料理
    let currentPage = 1;

    // 顯示特定頁數的料理
    function showPage(page) {
        currentPage = page;
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // 先隱藏所有卡片
        cards.forEach(card => card.style.display = "none");

        // 顯示符合條件且屬於該頁面的卡片
        filteredCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = "block";
            }
        });

        renderPagination(totalPages);
    }

    // 產生分頁按鈕
    function renderPagination(totalPages) {
        paginationContainer.innerHTML = "";
        if (totalPages <= 1) return; // 不滿一頁就隱藏按鈕

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("a");
            btn.href = "#";
            btn.textContent = i;
            btn.classList.add("page-btn");
            if (i === currentPage) btn.classList.add("active");

            btn.addEventListener("click", function (e) {
                e.preventDefault();
                showPage(i);
                // 點擊換頁時自動滾動回食譜選單頂部
                document.querySelector(".menu-section").scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(btn);
        }
    }

    // 關鍵字搜尋過濾功能
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase(); // 取得輸入內容並轉小寫

        // 檢查料理標題(h3)或描述(p)是否包含關鍵字
        filteredCards = cards.filter(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const desc = card.querySelector(".recipe-info p").textContent.toLowerCase();
            return title.includes(query) || desc.includes(query);
        });

        // 搜尋後從第一頁開始顯示
        showPage(1);
    }

    // 監聽按鈕點擊與 Enter 鍵事件
    searchBtn.addEventListener("click", function(e) {
        e.preventDefault();
        performSearch();
    });

    searchInput.addEventListener("keyup", function(e) {
        if (e.key === "Enter") {
            performSearch();
        }
    });

    // 初始化：一開始顯示第一頁
    if (cards.length > 0) {
        showPage(1);
    }
});