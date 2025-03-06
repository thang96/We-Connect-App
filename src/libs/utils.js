export const timeSince = (dateString) => {
  const pastDate = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now - pastDate) / 1000); // Chênh lệch tính bằng giây

  if (diffInSeconds < 0) return "Thời gian ở tương lai"; // Kiểm tra nếu thời gian chưa xảy ra

  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  // const seconds = diffInSeconds % 60;
  if (days > 2) {
    return `${pastDate.getDate()}/${pastDate.getMonth()}/${pastDate.getFullYear()} lúc ${pastDate.getHours()} giờ`;
  }

  return `${days !== 0 ? `${days} ngày,` : ""} ${hours !== 0 ? `${hours} giờ,` : ""} ${minutes !== 0 ? `${minutes} phút trước` : "vừa xong"}`;
};

export const timeYYMMDD = (dateString)=>{
  const pastDate = new Date(dateString);
  return `${pastDate.getFullYear()}/${pastDate.getMonth()}/${pastDate.getDate()} ${pastDate.getHours()}:${pastDate.getMinutes()} `;
}
