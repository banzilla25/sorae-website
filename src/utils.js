export const getShopLink = () => {
  if (typeof navigator === 'undefined') return 'https://www.tokopedia.com/sorae-perfume';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile ? 'https://vt.tiktok.com/ZS9LaDVQv/?page=Mall' : 'https://www.tokopedia.com/sorae-perfume';
};
