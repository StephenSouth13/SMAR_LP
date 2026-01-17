export const Stats = () => {
  return (
    <section id ="blog" className="py-20 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#004282] uppercase mb-4">
            BẢO CHỨNG THÀNH CÔNG
          </h2>
          <p className="text-gray-500 font-medium">
            SMAR không hứa hẹn suông. Chúng tôi nói bằng dữ liệu và sự tin tưởng của các Brand lớn.
          </p>
        </div>
        
        <div className="flex gap-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-[#004282]">15+</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
              DỰ ÁN/THÁNG
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-[#E31B23]">100%</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
              TỶ LỆ HÀI LÒNG
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};