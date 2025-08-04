// 拍賣商品數據
const auctionItems = [
    {
        id: 1,
        title: "經典牛仔外套",
        description: "復古風格牛仔外套，100%純棉材質，適合春秋季節穿著。品牌：Levi's，尺寸：M",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
        currentBid: 1200,
        minBid: 1250,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2天後結束
        category: "男裝",
        bidHistory: [
            { bidder: "用戶A", amount: 1000, time: "2024-01-15 10:30" },
            { bidder: "用戶B", amount: 1100, time: "2024-01-15 11:15" },
            { bidder: "用戶C", amount: 1200, time: "2024-01-15 12:00" }
        ]
    },
    {
        id: 2,
        title: "優雅黑色洋裝",
        description: "經典小黑裙，適合正式場合。材質：聚酯纖維混紡，品牌：ZARA，尺寸：S",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
        currentBid: 800,
        minBid: 850,
        endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1天後結束
        category: "女裝",
        bidHistory: [
            { bidder: "用戶D", amount: 600, time: "2024-01-15 09:00" },
            { bidder: "用戶E", amount: 750, time: "2024-01-15 10:30" },
            { bidder: "用戶F", amount: 800, time: "2024-01-15 11:45" }
        ]
    },
    {
        id: 3,
        title: "運動休閒鞋",
        description: "舒適透氣的運動鞋，適合日常穿著和輕度運動。品牌：Nike，尺寸：US 9",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        currentBid: 2500,
        minBid: 2600,
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3天後結束
        category: "配件",
        bidHistory: [
            { bidder: "用戶G", amount: 2000, time: "2024-01-14 15:00" },
            { bidder: "用戶H", amount: 2300, time: "2024-01-15 08:30" },
            { bidder: "用戶I", amount: 2500, time: "2024-01-15 09:15" }
        ]
    },
    {
        id: 4,
        title: "時尚手提包",
        description: "真皮手提包，精緻工藝，適合商務和休閒場合。品牌：Coach，顏色：棕色",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        currentBid: 3200,
        minBid: 3300,
        endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4天後結束
        category: "配件",
        bidHistory: [
            { bidder: "用戶J", amount: 2800, time: "2024-01-14 12:00" },
            { bidder: "用戶K", amount: 3000, time: "2024-01-14 16:30" },
            { bidder: "用戶L", amount: 3200, time: "2024-01-15 10:00" }
        ]
    },
    {
        id: 5,
        title: "運動套裝",
        description: "高品質運動套裝，吸濕排汗材質，適合健身和戶外運動。品牌：Adidas，尺寸：L",
        image: "https://images.unsplash.com/photo-1506629905607-c7b0b9b5c8f8?w=400&h=400&fit=crop",
        currentBid: 1500,
        minBid: 1600,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5天後結束
        category: "運動服",
        bidHistory: [
            { bidder: "用戶M", amount: 1200, time: "2024-01-14 14:00" },
            { bidder: "用戶N", amount: 1400, time: "2024-01-15 09:30" },
            { bidder: "用戶O", amount: 1500, time: "2024-01-15 11:00" }
        ]
    },
    {
        id: 6,
        title: "絲質襯衫",
        description: "100%真絲襯衫，觸感柔滑，適合正式和半正式場合。顏色：白色，尺寸：M",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        currentBid: 2200,
        minBid: 2300,
        endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6天後結束
        category: "女裝",
        bidHistory: [
            { bidder: "用戶P", amount: 1800, time: "2024-01-14 11:00" },
            { bidder: "用戶Q", amount: 2000, time: "2024-01-14 17:30" },
            { bidder: "用戶R", amount: 2200, time: "2024-01-15 08:45" }
        ]
    }
];

// DOM 元素
let currentModal = null;
let countdownIntervals = [];

// 初始化頁面
document.addEventListener('DOMContentLoaded', function() {
    renderAuctionItems();
    setupEventListeners();
    startCountdowns();
});

// 渲染拍賣商品
function renderAuctionItems(filterCategory = null) {
    const auctionGrid = document.getElementById('auctionGrid');
    auctionGrid.innerHTML = '';

    const itemsToShow = filterCategory 
        ? auctionItems.filter(item => item.category === filterCategory)
        : auctionItems;

    itemsToShow.forEach(item => {
        const auctionCard = createAuctionCard(item);
        auctionGrid.appendChild(auctionCard);
    });
}

// 創建拍賣卡片
function createAuctionCard(item) {
    const card = document.createElement('div');
    card.className = 'auction-card';
    card.onclick = () => openModal(item);

    const timeLeft = getTimeLeft(item.endTime);
    
    card.innerHTML = `
        <div class="auction-image">
            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x400?text=衣服圖片'">
            <div class="auction-status">拍賣中</div>
        </div>
        <div class="auction-info">
            <h3>${item.title}</h3>
            <p class="auction-description">${item.description.substring(0, 80)}...</p>
            <div class="auction-details">
                <div class="current-bid">
                    <span>目前出價</span>
                    <span class="bid-amount">NT$ ${item.currentBid.toLocaleString()}</span>
                </div>
                <div class="time-left">
                    <span>剩餘時間</span>
                    <span class="time-countdown" data-end-time="${item.endTime.getTime()}">${timeLeft}</span>
                </div>
            </div>
            <button class="bid-button" onclick="event.stopPropagation(); openModal(${item.id})">
                <i class="fas fa-gavel"></i> 立即競標
            </button>
        </div>
    `;

    return card;
}

// 計算剩餘時間
function getTimeLeft(endTime) {
    const now = new Date().getTime();
    const timeLeft = endTime.getTime() - now;

    if (timeLeft <= 0) {
        return "已結束";
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `${days}天 ${hours}小時`;
    } else if (hours > 0) {
        return `${hours}小時 ${minutes}分鐘`;
    } else {
        return `${minutes}分鐘`;
    }
}

// 開啟模態框
function openModal(itemId) {
    const item = typeof itemId === 'object' ? itemId : auctionItems.find(i => i.id === itemId);
    if (!item) return;

    currentModal = item;
    const modal = document.getElementById('auctionModal');
    
    // 填充模態框內容
    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('modalCurrentBid').textContent = `NT$ ${item.currentBid.toLocaleString()}`;
    document.getElementById('modalTimeLeft').textContent = getTimeLeft(item.endTime);
    document.getElementById('bidInput').min = item.minBid;
    document.getElementById('bidInput').placeholder = `最低出價 NT$ ${item.minBid.toLocaleString()}`;

    // 渲染出價記錄
    renderBidHistory(item.bidHistory);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 關閉模態框
function closeModal() {
    const modal = document.getElementById('auctionModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentModal = null;
}

// 渲染出價記錄
function renderBidHistory(bidHistory) {
    const bidHistoryList = document.getElementById('bidHistoryList');
    bidHistoryList.innerHTML = '';

    if (bidHistory.length === 0) {
        bidHistoryList.innerHTML = '<p class="no-bids">尚無出價記錄</p>';
        return;
    }

    bidHistory.reverse().forEach((bid, index) => {
        const bidItem = document.createElement('div');
        bidItem.className = 'bid-item';
        if (index === 0) bidItem.classList.add('highest-bid');

        bidItem.innerHTML = `
            <div class="bid-info">
                <span class="bidder">${bid.bidder}</span>
                <span class="bid-time">${bid.time}</span>
            </div>
            <span class="bid-amount">NT$ ${bid.amount.toLocaleString()}</span>
        `;

        bidHistoryList.appendChild(bidItem);
    });
}

// 出價功能
function placeBid() {
    if (!currentModal) return;

    const bidInput = document.getElementById('bidInput');
    const bidAmount = parseInt(bidInput.value);

    if (!bidAmount || bidAmount < currentModal.minBid) {
        alert(`出價必須至少為 NT$ ${currentModal.minBid.toLocaleString()}`);
        return;
    }

    // 更新商品數據
    const itemIndex = auctionItems.findIndex(item => item.id === currentModal.id);
    if (itemIndex !== -1) {
        auctionItems[itemIndex].currentBid = bidAmount;
        auctionItems[itemIndex].minBid = bidAmount + 50;
        auctionItems[itemIndex].bidHistory.push({
            bidder: "您",
            amount: bidAmount,
            time: new Date().toLocaleString('zh-TW')
        });

        // 更新模態框顯示
        document.getElementById('modalCurrentBid').textContent = `NT$ ${bidAmount.toLocaleString()}`;
        document.getElementById('bidInput').min = bidAmount + 50;
        document.getElementById('bidInput').placeholder = `最低出價 NT$ ${(bidAmount + 50).toLocaleString()}`;
        renderBidHistory(auctionItems[itemIndex].bidHistory);

        // 更新主頁面顯示
        renderAuctionItems();

        // 清空輸入框
        bidInput.value = '';

        alert('出價成功！');
    }
}

// 設置事件監聽器
function setupEventListeners() {
    // 模態框關閉
    document.querySelector('.close').onclick = closeModal;
    document.getElementById('auctionModal').onclick = function(e) {
        if (e.target === this) closeModal();
    };

    // 出價按鈕
    document.getElementById('placeBidBtn').onclick = placeBid;

    // 分類篩選
    document.querySelectorAll('.category-card').forEach(card => {
        card.onclick = function() {
            const category = this.dataset.category;
            renderAuctionItems(category);
            
            // 滾動到拍賣區域
            document.getElementById('auctions').scrollIntoView({ 
                behavior: 'smooth' 
            });
        };
    });

    // 導航欄切換
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.onclick = function() {
        navMenu.classList.toggle('active');
    };

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA 按鈕
    document.querySelector('.cta-button').onclick = function() {
        document.getElementById('auctions').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };

    // Enter 鍵出價
    document.getElementById('bidInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            placeBid();
        }
    });
}

// 啟動倒計時
function startCountdowns() {
    // 清除現有的倒計時
    countdownIntervals.forEach(interval => clearInterval(interval));
    countdownIntervals = [];

    // 為每個拍賣商品設置倒計時
    const countdownElements = document.querySelectorAll('.time-countdown');
    
    countdownElements.forEach(element => {
        const endTime = parseInt(element.dataset.endTime);
        
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                element.textContent = "已結束";
                clearInterval(interval);
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            if (days > 0) {
                element.textContent = `${days}天 ${hours}小時`;
            } else if (hours > 0) {
                element.textContent = `${hours}小時 ${minutes}分鐘`;
            } else {
                element.textContent = `${minutes}分 ${seconds}秒`;
            }
        }, 1000);

        countdownIntervals.push(interval);
    });
}

// 頁面可見性變化時重新啟動倒計時
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setTimeout(startCountdowns, 100);
    }
});