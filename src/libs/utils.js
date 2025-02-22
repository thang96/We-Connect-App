export const timeSince = (dateString) => {
  const pastDate = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now - pastDate) / 1000); // Chênh lệch tính bằng giây

  if (diffInSeconds < 0) return "Thời gian ở tương lai"; // Kiểm tra nếu thời gian chưa xảy ra

  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return `${days !== 0 ? `${days} ngày,` : ""} ${hours} giờ, ${minutes} phút, ${seconds} giây trước`;
};
