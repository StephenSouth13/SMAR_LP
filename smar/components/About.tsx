import { Zap, Smartphone, ShieldCheck } from "lucide-react"; // Cần cài đặt thư viện lucide-react

const reasons = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Sản phẩm hóa dịch vụ",
    desc: "Không còn mơ hồ. Bạn cầm được SaleKit, nhìn được Website, đọc được kịch bản chốt Sales thực tế.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    title: "Đòn bẩy Công nghệ AI",
    desc: "Ứng dụng AI giúp sản xuất 10-15 video/tháng với chi phí tối ưu, tốc độ triển khai gấp 3 lần.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    title: "Hiệu quả ra kết quả",
    desc: "Chúng tôi tập trung vào 'lớp linh hồn' sản phẩm và nhân hiệu - thứ giúp bạn thoát khỏi cuộc chiến phá giá.",
  },
];


export const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề chính */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#004282] uppercase tracking-tight mb-4">
            Tại sao chọn con đường của SMAR?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Thế giới Agency truyền thống đang bão hòa với các dịch vụ hứa hẹn xa vời. SMAR chọn cách làm khác.
          </p>
        </div>

        {/* Danh sách các lý do (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="group p-10 bg-[#F8FAFC] rounded-[2.5rem] transition-all duration-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-transparent hover:border-gray-100"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              {/* Nội dung Card */}
              <h3 className="text-xl font-bold text-[#002D72] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};