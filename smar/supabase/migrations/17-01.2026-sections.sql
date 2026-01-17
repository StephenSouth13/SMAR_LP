-- 1. Tạo bảng lưu trữ nội dung các Section (Hero, About, Products...)
CREATE TABLE site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_name TEXT UNIQUE NOT NULL, -- Định danh: 'hero', 'navbar', 'footer'...
  content JSONB NOT NULL,            -- Lưu text, link ảnh, video vào đây
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tạo bảng lưu trữ thông tin khách hàng từ Form Contact
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  service TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Chèn dữ liệu mẫu cho Hero Section để bạn có cái mà Edit
INSERT INTO site_content (section_name, content) VALUES (
  'hero', 
  '{
    "title": "BIẾN DỮ LIỆU CON NGƯỜI THÀNH DOANH SỐ THỰC",
    "description": "SMAR là Agency thực chiến tập trung vào Nhân hiệu (Personal Brand) và Phẩm hiệu (Product Storytelling).",
    "image_url": "https://images.unsplash.com/photo-1551434678-e076c223a692",
    "revenue_target": "1.5B+"
  }'
) ON CONFLICT (section_name) DO NOTHING;