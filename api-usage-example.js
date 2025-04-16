// 引入配置文件
const apiConfig = require('./api-config.json');

// 获取当前环境
const currentEnv = process.env.NODE_ENV || 'development';
const envConfig = apiConfig.apiConfig.environment[currentEnv];

// 构建请求URL
const baseUrl = envConfig.host + apiConfig.apiConfig.baseUrl;
const videoListUrl = baseUrl + apiConfig.apiEndpoints.video.list.path;

// 构建请求参数
const params = {
  daili: envConfig.daili,
  tag: '热门',
  ps: 20
};

// 计算签名（简化示例，实际应实现MD5算法）
const sign = calculateSign(params, envConfig.secretKey);
params.sign = sign;

// 发送请求（使用fetch作为示例）
fetch(videoListUrl + '?' + new URLSearchParams(params), {
  method: apiConfig.apiEndpoints.video.list.method
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    // 成功获取视频列表数据
    const videoListContainer = document.querySelector(apiConfig.apiEndpoints.video.list.usage.element);
    videoListContainer.innerHTML = renderVideoList(data.data);
  } else {
    console.error('获取视频列表失败:', data.msg);
  }
})
.catch(error => {
  console.error('请求错误:', error);
});

// 签名计算函数（简化示例）
function calculateSign(params, secretKey) {
  // 按照字母顺序排序参数
  const sortedKeys = Object.keys(params).sort();
  let signStr = '';
  sortedKeys.forEach(key => {
    signStr += `${key}=${params[key]}&`;
  });
  signStr = signStr.slice(0, -1) + secretKey;
  // 实际应使用MD5加密
  return 'simplified-sign-' + signStr;
}

// 渲染视频列表函数（示例）
function renderVideoList(videoData) {
  // 实际渲染逻辑
  return videoData.map(video => `<div>${video.title}</div>`).join('');
} 