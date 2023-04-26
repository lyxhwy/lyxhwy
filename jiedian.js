function base64Decode(str) {
  return atob(str);
}

function base64Encode(str) {
  return btoa(str);
}

function modifyHost(subscriptionContent, newHost) {
  const decodedContent = base64Decode(subscriptionContent);
  const nodeUrls = decodedContent.split('\n');

  const modifiedNodeUrls = nodeUrls.map((url) => {
    if (url.startsWith('vmess://') || url.startsWith('vless://') || url.startsWith('trojan://')) {
      const prefix = url.slice(0, 8);
      const decodedUrl = base64Decode(url.slice(8));
      const config = JSON.parse(decodedUrl);
      if (config.add) {
        config.add = newHost;
        return prefix + base64Encode(JSON.stringify(config));
      }
    }
    return url;
  });

  const modifiedSubscription = modifiedNodeUrls.join('\n');
  return base64Encode(modifiedSubscription);
}

// 使用方式：
// 1. 从 Sub-Store 获取原始订阅内容，将其作为参数传递给 modifyHost 函数。
// 2. 将 modifyHost 函数的第二个参数替换为 "tms.dingtalk.com"。
// 3. 函数返回修改后的订阅内容，您可以将其导入到您的代理客户端中。

const subscriptionContent = 'your_subscription_base64_encoded_content';
const newHost = 'tms.dingtalk.com';
const modifiedSubscriptionContent = modifyHost(subscriptionContent, newHost);
console.log(modifiedSubscriptionContent);
