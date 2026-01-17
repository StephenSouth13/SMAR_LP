--1. KHỞI TẠO CẤU TRÚC BẢNG (DATABASE SCHEMA)
--Phần này thiết lập các bảng lưu trữ nội dung Landing Page và dữ liệu khách hàng.

SQL

-- Kích hoạt extension để tạo UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Bảng lưu trữ nội dung các Section (CMS)
CREATE TABLE IF NOT EXISTS site_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    section_name TEXT UNIQUE NOT NULL, -- 'hero', 'about', 'sku', 'stats', 'testimonials'
    content JSONB NOT NULL,            -- Chứa toàn bộ dữ liệu động
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Bảng lưu trữ khách hàng từ Form liên hệ
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name TEXT,
    phone TEXT,
    service TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
2. DỮ LIỆU MẪU CHUẨN (INITIAL DATA)
Dữ liệu này được thiết kế để khớp hoàn toàn với các Interface đã lập trình.

SQL

-- HERO SECTION
INSERT INTO site_content (section_name, content) VALUES (
  'hero', 
  '{
    "badge": "SMAR 2026: ĐÓNG GÓI GIÁ TRỊ",
    "title": "Biến Dữ Liệu Con Người Thành Doanh Số Thực",
    "description": "Agency thực chiến tập trung vào Nhân hiệu (Personal Brand) và Phẩm hiệu (Product Brand).",
    "image_url": "https://images.unsplash.com/photo-1551434678-e076c223a692",
    "revenue_target": "1.5B+",
    "buttons": [
      {"label": "✨ Chẩn Đoán Với AI", "href": "#ai", "primary": true},
      {"label": "Xem dự án thực tế", "href": "#projects", "primary": false}
    ]
  }'
) ON CONFLICT (section_name) DO UPDATE SET content = EXCLUDED.content;

-- ABOUT SECTION
INSERT INTO site_content (section_name, content) VALUES (
  'about', 
  '{
    "title": "Tại sao chọn con đường của SMAR?",
    "description": "Thế giới Agency truyền thống đang bão hòa với các dịch vụ hứa hẹn xa vời. SMAR chọn cách làm khác.",
    "reasons": [
      {"icon": "Zap", "color": "text-yellow-500", "title": "Sản phẩm hóa dịch vụ", "desc": "Không còn mơ hồ. Bạn cầm được SaleKit, nhìn được Website..."},
      {"icon": "Smartphone", "color": "text-blue-500", "title": "Đòn bẩy Công nghệ AI", "desc": "Ứng dụng AI giúp sản xuất 10-15 video/tháng với chi phí tối ưu..."},
      {"icon": "ShieldCheck", "color": "text-green-500", "title": "Hiệu quả ra kết quả", "desc": "Chúng tôi tập trung vào lớp linh hồn sản phẩm và nhân hiệu..."}
    ]
  }'
) ON CONFLICT (section_name) DO UPDATE SET content = EXCLUDED.content;

-- SKU SECTION (DỊCH VỤ)
INSERT INTO site_content (section_name, content) VALUES (
  'sku', 
  '{
    "title": "Hệ Sinh Thái 5 SKU Cốt Lõi",
    "subtitle": "Được thiết kế để tăng trưởng theo mô hình 3G (Personal - Product - Business)",
    "skus": [
      {
        "title": "Personal Brand Foundation",
        "subtitle": "Khởi tạo Nhân Hiệu Core",
        "price": "18.000.000 đ",
        "tag": "SKU CỬA VÀO",
        "icon": "User",
        "features": ["Audit kênh cá nhân toàn diện", "Concept & Storytelling độc bản", "Bộ Profile 5 ảnh chuyên nghiệp", "Website cá nhân chuẩn SEO"]
      },
      {
        "title": "SaleKits Thực Chiến",
        "subtitle": "Bộ công cụ chốt Sales tối thượng",
        "price": "Từ 30.000.000 đ",
        "tag": "XƯƠNG SỐNG 2026",
        "isBestSeller": true,
        "icon": "Rocket",
        "features": ["E-catalogue chuyên nghiệp", "Slide Pitching bán hàng", "Landing Page chuyển đổi cao", "Sales Script & FAQ chốt khách"]
      }
    ],
    "combo": { "title": "Combo Bán Nhanh", "price": "Chỉ từ 50M" }
  }'
) ON CONFLICT (section_name) DO UPDATE SET content = EXCLUDED.content;

-- BẢO CHỨNG (STATS)
INSERT INTO site_content (section_name, content) VALUES (
  'stats', 
  '{
    "title": "BẢO CHỨNG THÀNH CÔNG",
    "description": "SMAR không hứa hẹn suông. Chúng tôi nói bằng dữ liệu và sự tin tưởng của các Brand lớn.",
    "image_url": null,
    "stats": [
      {"id": "s1", "value": "15+", "label": "DỰ ÁN/THÁNG", "color": "text-[#004282]", "isHidden": false},
      {"id": "s2", "value": "100%", "label": "TỶ LỆ HÀI LÒNG", "color": "text-[#E31B23]", "isHidden": false}
    ]
  }'
) ON CONFLICT (section_name) DO UPDATE SET content = EXCLUDED.content;

-- TESTIMONIALS (CẢM NHẬN)
INSERT INTO site_content (section_name, content) VALUES (
  'testimonials', 
  '{
    "testimonials": [
      {
        "id": "t1", 
        "author_name": "Trung Tâm AMA Vũng Tàu", 
        "content": "Hệ thống SaleKits của SMAR thực sự thay đổi cách đội ngũ chúng tôi tiếp cận học viên. Chuyên nghiệp hơn, thuyết phục hơn.", 
        "sku_used": "SaleKits Thực Chiến", 
        "rating": 5
      }
    ],
    "commitments": [
      {"id": "c1", "title": "Hệ sinh thái đối tác lớn", "desc": "Á Châu, Satra, Nippon...", "icon_name": "Award"},
      {"id": "c2", "title": "Đội ngũ Cố vấn dày dạn", "desc": "Mối quan hệ G3 (Brand lớn).", "icon_name": "CheckCircle"},
      {"id": "c3", "title": "Tiên phong Phẩm hiệu", "desc": "Làm linh hồn cho sản phẩm ngách.", "icon_name": "Globe"}
    ]
  }'
) ON CONFLICT (section_name) DO UPDATE SET content = EXCLUDED.content;
3. CHÍNH SÁCH BẢO MẬT (RLS POLICIES)
Đảm bảo khách có thể xem và Admin có thể sửa.

SQL

-- CHÍNH SÁCH BẢNG (site_content)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Content" ON site_content 
FOR SELECT USING (true); -- Mọi người đều xem được

CREATE POLICY "Admin All Access" ON site_content 
FOR ALL TO authenticated USING (true) WITH CHECK (true); -- Chỉ Admin đã login mới được sửa

-- CHÍNH SÁCH STORAGE (smar-assets)
-- Lưu ý: Bạn cần tạo bucket 'smar-assets' trong giao diện Storage trước.
CREATE POLICY "Public Assets View" ON storage.objects 
FOR SELECT USING ( bucket_id = 'smar-assets' ); -- Mọi người xem ảnh công khai

CREATE POLICY "Admin Upload Assets" ON storage.objects 
FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'smar-assets' ); -- Admin upload

CREATE POLICY "Admin Full Control Assets" ON storage.objects 
FOR UPDATE TO authenticated USING ( bucket_id = 'smar-assets' ); -- Admin sửa/xóa



INSERT INTO site_content (section_name, content)
VALUES (
  'contact',
  '{
    "title": "BÙNG NỔ 2026?",
    "description": "Để lại thông tin, đội ngũ chiến lược của SMAR sẽ liên hệ trực tiếp để tư vấn gói SKU phù hợp nhất với mô hình của bạn.",

    "email": "info@smar.vn",
    "phone": "093.xxx.xxxx",
    "address": "Innovation Hub, Quận 1 | Quận 7, TP.HCM",

    "google_map_url": "https://maps.google.com/?q=Innovation+Hub+HCMC",
    "google_map_embed": "<iframe src=\"https://www.google.com/maps/embed?...\" loading=\"lazy\"></iframe>",

    "office_image_url": "https://cdn.smar.vn/contact/office.jpg",
    "office_video_url": "https://cdn.smar.vn/contact/office.mp4",

    "services": [
      "Personal Brand Foundation",
      "Personal Growth",
      "Product Storytelling",
      "SaleKits Thực Chiến",
      "Product Growth",
      "Combo Bán Nhanh",
      "Tư vấn tổng thể chiến lược"
    ],

    "cta_label": "Đăng Ký Tư Vấn Ngay",
    "privacy_note": "Cam kết bảo mật thông tin khách hàng 100%"
  }'
)
ON CONFLICT (section_name)
DO UPDATE SET content = EXCLUDED.content;
