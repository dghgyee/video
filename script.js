// 返回首页
function goToIndex() {
    window.location.href = 'index.html';
}

function goToVideoPlayFree() {
    window.location.href = 'video-play-free.html';
}

function goToVideoPlayVIP() {
    window.location.href = 'video-play-vip.html';
}

function goToinfos() {
    window.location.href = 'infos.html';
}

function goTomine() {
    window.location.href = 'mine.html';
}

function goToLogin() {
    window.location.href = 'login.html';
}

// 选择性别start
function toggleGenderDropdown() {
    const dropdown = document.getElementById('gender-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function selectGender(gender) {
    const displayButton = document.getElementById('gender-display');
    if (displayButton) {
        displayButton.innerHTML = `${gender} <i class="fas fa-chevron-right ml-2"></i>`;
        document.getElementById('gender-dropdown').classList.add('hidden');  // 隐藏下拉
    }
}

// 点击页面其他地方关闭下拉
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('gender-dropdown');
    const button = document.getElementById('gender-display');
    if (dropdown && !dropdown.classList.contains('hidden') && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});
// 选择性别end

// 视频播放页面的功能
function showPricingOverlay() {
    const overlay = document.getElementById('pricing-overlay');
    if (overlay) {
        overlay.style.display = 'block';
    }
}

function hidePricingOverlay() {
    const overlay = document.getElementById('pricing-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function openTab(tabName, event) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');  // Hide all tab contents
    });
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');  // Show the selected tab
    }

    const tabButtons = document.querySelectorAll('.flex.border-b.border-gray-200.mb-4 > button');
    tabButtons.forEach(button => {
        button.classList.remove('tab-active');  // Remove active class from all buttons
        button.classList.remove('text-primary');  // Remove primary color
        button.classList.add('text-gray-500');  // Add gray color
    });
    
    // Get the actual button element, even if clicked on its child
    const clickedButton = event.currentTarget;
    if (clickedButton) {
        clickedButton.classList.add('tab-active');  // Add active class to the clicked button
        clickedButton.classList.remove('text-gray-500');  // Remove gray color
        clickedButton.classList.add('text-primary');  // Add primary color
    }
}

function toggleLike() {
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
        // Check current state by looking at the button's class
        if (likeButton.classList.contains('text-gray-400')) {
            // Currently unliked, change to liked
            likeButton.classList.remove('text-gray-400');
            likeButton.classList.add('text-primary'); // Use primary color for liked state
        } else {
            // Currently liked, change to unliked
            likeButton.classList.remove('text-primary');
            likeButton.classList.add('text-gray-400'); // Use gray color for unliked state
        }
    }
}

// 分类和筛选功能
let selectedCategory = null;  // 存储选中的分类
let selectedSort = null;      // 存储选中的排序

// 硬编码的 mock 数据 (更新后，基于 video-play-free.html 推荐内容)
const mockData = [
  {
    "id": 1,
    "title": "夜色浪漫：城市爱情故事",
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/2b658cccedd2feb93bc75181da5216e6.jpg",
    "tag": "电影", // 分配到电影分类
    "type": "免费",
    "duration": "1:45:22",
    "views": "12.5万", // 使用字符串以匹配示例
    "uploadTime": "3天前" // 保持或更新上传时间
  },
  {
    "id": 2,
    "title": "迷雾之城 第三季",
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/589051a20c069ddaef1e1779c4457f16.jpg",
    "tag": "电视剧", // 分配到电视剧分类
    "type": "VIP",
    "duration": "45:12",
    "views": "8.7万",
    "uploadTime": "1周前"
  },
  {
    "id": 3,
    "title": "星辰乐队 2025演唱会",
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/44f44f1818110f231a2b8a3cf04d3909.jpg",
    "tag": "音乐", // 分配到音乐分类
    "type": "免费",
    "duration": "3:52", // 注意：这个时长较短，可能是片段或单曲
    "views": "15.3万",
    "uploadTime": "2天前"
  },
  {
    "id": 4,
    "title": "城市爱情故事续集预告", // 稍作修改
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/2b658cccedd2feb93bc75181da5216e6.jpg",
    "tag": "电影",
    "type": "免费",
    "duration": "2:10",
    "views": "9.8万",
    "uploadTime": "5天前"
  },
  {
    "id": 5,
    "title": "迷雾之城 特别篇", // 稍作修改
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/589051a20c069ddaef1e1779c4457f16.jpg",
    "tag": "电视剧",
    "type": "VIP",
    "duration": "55:00",
    "views": "5.2万",
    "uploadTime": "1个月前"
  },
  {
    "id": 6,
    "title": "星辰乐队 幕后花絮", // 稍作修改
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/44f44f1818110f231a2b8a3cf04d3909.jpg",
    "tag": "音乐",
    "type": "免费",
    "duration": "12:30",
    "views": "18.1万",
    "uploadTime": "1天前"
  },
  {
    "id": 7,
    "title": "浪漫都市夜景合集", // 稍作修改
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/2b658cccedd2feb93bc75181da5216e6.jpg",
    "tag": "生活", // 分配到生活分类
    "type": "免费",
    "duration": "8:15",
    "views": "20.5万",
    "uploadTime": "4天前"
  },
  {
    "id": 8,
    "title": "悬疑剧推荐：迷雾之城解析", // 稍作修改
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/589051a20c069ddaef1e1779c4457f16.jpg",
    "tag": "综艺", // 分配到综艺分类
    "type": "VIP",
    "duration": "25:40",
    "views": "6.6万",
    "uploadTime": "2周前"
  },
  {
    "id": 9,
    "title": "演唱会灯光舞美设计", // 稍作修改
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/44f44f1818110f231a2b8a3cf04d3909.jpg",
    "tag": "科技", // 分配到科技分类
    "type": "免费",
    "duration": "6:55",
    "views": "11.9万",
    "uploadTime": "3周前"
  },
  {
    "id": 10,
    "title": "爱情电影经典片段回顾", // 稍作修改
    "thumbnail": "https://ai-public.mastergo.com/ai/img_res/2b658cccedd2feb93bc75181da5216e6.jpg",
    "tag": "电影",
    "type": "免费",
    "duration": "1:05:10",
    "views": "14.2万",
    "uploadTime": "6天前"
  }
];

// 分页相关变量
let currentPage = 1;
const pageSize = 8;
let allVideoData = []; // 用于存储过滤后的数据

// 获取视频列表函数 (使用硬编码数据)
async function fetchVideoList(tag = "全部", page = 1) {
    try {
        const data = mockData; 
        if (tag !== "全部") {
            allVideoData = data.filter(video => video.tag === tag);
        } else {
            allVideoData = data;
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return allVideoData.slice(startIndex, endIndex);
    } catch (error) {
        console.error('处理视频数据时出错:', error);
        return [];
    }
}

// 签名计算函数（简化示例）
function calculateSign(params, secretKey) {
  const sortedKeys = Object.keys(params).sort();
  let signStr = '';
  sortedKeys.forEach(key => {
    signStr += `${key}=${params[key]}&`;
  });
  signStr = signStr.slice(0, -1) + secretKey;
  return 'simplified-sign-' + signStr;
}

// 渲染视频列表函数 (修正后)
function renderVideoList(videoData, append = false) {
    const videoListContainer = document.querySelector('.video-list-container');
    if (!videoListContainer) {
        console.error('视频列表容器未找到');
        return;
    }

    if (!append) {
        videoListContainer.innerHTML = ''; // 清空现有内容
    }

    if (!videoData || videoData.length === 0) {
        if (!append) {
             videoListContainer.innerHTML = '<p class="text-white col-span-2 text-center">没有找到相关视频。</p>'; // 显示提示信息
        }
    } else {
        videoData.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card rounded-lg overflow-hidden bg-card cursor-pointer'; 
            videoCard.onclick = (function(type) {
                return function() {
                    const targetPage = type === 'VIP' ? 'video-play-vip.html' : 'video-play-free.html';
                    window.location.href = targetPage;
                };
            })(video.type);
            
            // 修正：移除无效注释，并将 object-top 改为 object-center
            videoCard.innerHTML = `
                <div class="relative video-player"> 
                    <img src="${video.thumbnail}" alt="${video.title || '视频封面'}" class="absolute top-0 left-0 w-full h-full object-cover object-top"> {/* 改为 object-center */}
                    <div class="video-type absolute top-2 right-2 text-white text-xs px-2 py-0.5 rounded bg-opacity-50">${video.type}</div> 
                    <div class="absolute bottom-2 left-2 flex items-center text-white text-xs">
                        <i class="fas fa-eye mr-1 text-xs"></i>
                        <span>${video.views || '0'}</span> 
                    </div>
                    <div class="video-duration absolute bottom-2 right-2 text-white text-xs px-1.5 py-0.5 rounded bg-black bg-opacity-50">${video.duration || '0:00'}</div>
                </div>
                <div class="p-2">
                    <h3 class="text-sm font-medium text-white truncate text-ellipsis">${video.title || '无标题'}</h3> 
                </div>
            `;
            videoListContainer.appendChild(videoCard);
        });
    }

    // 更新加载更多按钮的可见性逻辑 (保持不变)
    const loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        const totalItems = allVideoData.length;
        // 使用 videoListContainer.children.length 获取当前实际渲染的卡片数量
        const currentlyDisplayedItems = videoListContainer.querySelectorAll('.video-card').length; 

        if (currentlyDisplayedItems >= totalItems) {
             loadMoreButton.style.display = 'none'; 
        } else {
             loadMoreButton.style.display = 'flex'; 
        }
    }
}

// 加载更多视频
function loadMoreVideos() {
    currentPage++;
    fetchVideoList(selectedCategory || "全部", currentPage).then(videoData => {
        renderVideoList(videoData, true); // 追加渲染
    });
}

const fetchCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 确保分类列表与 mock 数据中的 tag 一致
            resolve([
                "全部", "电影", "电视剧", "综艺", "动漫", "纪录片", "音乐", "游戏", "生活", "科技", "体育"  
            ]);
        }, 0); // 模拟网络延迟
    });
};

const renderButtons = async () => {
    const categories = await fetchCategories();
    const buttonContainer = document.getElementById('button-container');
    if (!buttonContainer) {
        console.error('按钮容器未找到');
        return;
    }

    const parentDiv = buttonContainer.parentElement;  // 获取父容器
    if (!parentDiv) {
        console.error('按钮容器的父元素未找到');
        return;
    }

    selectedCategory = "全部";  // 设置"全部"为默认选中

    // 清空旧按钮，防止重复添加
    buttonContainer.innerHTML = '';

    // 创建并添加动态按钮，包括"全部"
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = "flex-shrink-0 bg-gray-800 text-white px-4 py-1.5 rounded-full text-sm";
        button.textContent = category;
        button.dataset.category = category; // 设置数据属性
        if (category === selectedCategory) {
            button.classList.add('bg-primary', 'text-white'); // 如果已选中，高亮
            button.classList.remove('bg-gray-800');
        }
        button.addEventListener('click', async () => { // 改为 async
            if (selectedCategory === category) {
                 // 点击当前选中分类，不执行任何操作或根据需求执行特定逻辑
                 console.log(`分类 "${category}" 已选中`);
                 return;
            } else {
                selectedCategory = category;  // 选中新分类
            }
            updateMainButtons();  // 更新主按钮样式

            // 添加逻辑以重新获取和渲染视频
            currentPage = 1; // 重置页码
            try {
                const videoData = await fetchVideoList(selectedCategory, currentPage);
                renderVideoList(videoData, false); // 重新渲染，不追加
            } catch (error) {
                console.error(`获取分类 "${selectedCategory}" 的视频数据时出错:`, error);
            }
        });
        buttonContainer.appendChild(button);  // 添加到按钮容器
    });

    // 创建筛选按钮并固定在父容器的右边
    // 检查筛选按钮是否已存在，避免重复添加
    if (!parentDiv.querySelector('.filter-button')) {
        const filterButton = document.createElement('button');
        filterButton.className = "absolute right-0 top-0 flex-shrink-0 bg-gray-700 text-white px-3 py-1.5 rounded-full text-sm filter-button"; // 添加用于识别的类
        filterButton.innerHTML = '<i class="fas fa-sliders-h text-xs"></i>';
        filterButton.addEventListener('click', () => {
            const filterMask = document.getElementById('filter-mask');
            if (filterMask) {
                filterMask.style.width = '70%';
                filterMask.style.right = '0';
                updateFilterMask();  // 更新遮罩中的 UI 以显示选中状态
            }
        });
        // 确保父容器有 relative 定位，以便 absolute 定位生效
        if (getComputedStyle(parentDiv).position === 'static') {
            parentDiv.style.position = 'relative';
        }
        parentDiv.appendChild(filterButton);
    } else {
        console.log('筛选按钮已存在');
    }
};

function updateMainButtons() {
    const buttonContainer = document.getElementById('button-container');
    if (!buttonContainer) return;

    const allButtons = buttonContainer.querySelectorAll('button[data-category]'); // 选择带有 data-category 的按钮
    allButtons.forEach(otherBtn => {
        if (otherBtn.dataset.category === selectedCategory) {
            otherBtn.classList.add('bg-primary', 'text-white');
            otherBtn.classList.remove('bg-gray-800');
        } else {
            otherBtn.classList.remove('bg-primary', 'text-white');
            otherBtn.classList.add('bg-gray-800');
        }
    });
}

function updateFilterMask() {
    fetchCategories().then(categories => {
        const categoryList = document.querySelector('#filter-mask ul');
        if (!categoryList) return;

        categoryList.innerHTML = '';  // 清空现有内容
        categories.forEach(category => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = category;
            // 更新类名以反映选中状态
            btn.className = `w-full text-md p-2 rounded hover:bg-primary ${category === selectedCategory ? 'bg-primary text-white' : 'bg-gray-700 text-white'}`;
            btn.addEventListener('click', () => {
                if (selectedCategory !== category) {
                    selectedCategory = category;
                    updateFilterMask();  // 重新更新遮罩 UI
                    updateMainButtons(); // 同步更新主按钮样式
                    // 注意：筛选遮罩关闭时才应用更改并刷新视频列表
                }
            });
            li.appendChild(btn);
            categoryList.appendChild(li);
        });
    });

    // 更新排序按钮的状态
    const sortButtons = document.querySelectorAll('#filter-mask .sort-button');
    sortButtons.forEach(btn => {
        // 更新类名以反映选中状态
        btn.className = `w-full p-2 rounded hover:bg-primary sort-button ${btn.textContent === selectedSort ? 'bg-primary text-white' : 'bg-gray-700 text-white'}`;
        btn.onclick = function() {
            if (selectedSort === btn.textContent) {
                selectedSort = null; // 取消选中
            } else {
                selectedSort = btn.textContent; // 选中
            }
            updateFilterMask(); // 重新更新排序按钮 UI
            // 注意：筛选遮罩关闭时才应用更改并刷新视频列表
        };
    });
}

// 关闭筛选遮罩并应用筛选/排序，然后刷新视频列表
async function closeFilterMask() { // 改为 async
    const filterMask = document.getElementById('filter-mask');
    if (filterMask) {
        filterMask.style.right = '-70%';
    }
    // 应用筛选和排序后，重新获取并渲染视频列表
    currentPage = 1; // 重置页码
    try {
        // 注意：fetchVideoList 目前只支持按 tag 筛选，排序逻辑需要额外实现
        console.log(`应用筛选：分类=${selectedCategory}, 排序=${selectedSort || '无'}`);
        const videoData = await fetchVideoList(selectedCategory || "全部", currentPage);
        // 这里可以根据 selectedSort 对 videoData 进行排序
        // 例如: if (selectedSort === '按最新发布') videoData.sort(...)
        renderVideoList(videoData, false); // 重新渲染
    } catch (error) {
        console.error('应用筛选/排序并获取视频数据时出错:', error);
    }
}

// 页面加载时执行
window.onload = async function() {
    // 首先渲染按钮
    if (document.getElementById('button-container')) {
        try {
            await renderButtons(); // 等待按钮渲染完成
            console.log('分类按钮渲染完成');
        } catch (error) {
             console.error('渲染分类按钮时出错:', error);
        }
    } else {
        console.error('按钮容器在页面加载时未找到');
    }

    // 然后获取并渲染视频列表
    currentPage = 1;
    try {
        // 使用 renderButtons 中设置的默认 selectedCategory
        const videoData = await fetchVideoList(selectedCategory || "全部", currentPage);
        console.log('获取到初始视频数据:', videoData);
        renderVideoList(videoData);
    } catch (error) {
        console.error('获取初始视频数据时出错:', error);
    }

    // 不再需要随机化标签，因为数据中已包含 type
    // randomizeVideoTags();
};

function goBack() {
    window.history.back();
}
