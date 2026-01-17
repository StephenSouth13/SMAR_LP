"use client";

import {
  Type,
  AlignLeft,
  Mail,
  Phone,
  MapPin,
  Image,
  Video,
  Link as LinkIcon,
  Plus,
  Trash2
} from "lucide-react";
import { ContactSection } from "@/types/cms";

interface ContactConfigProps {
  data?: ContactSection;
  updateData: (data: ContactSection) => void;
}

const DEFAULT_DATA: ContactSection = {
  title: "",
  description: "",
  email: "",
  phone: "",
  address: "",
  google_map_url: "",
  google_map_embed: "",
  office_image_url: "",
  office_video_url: "",
  services: [],
  cta_label: "Đăng Ký Tư Vấn Ngay",
  privacy_note: "Cam kết bảo mật thông tin khách hàng 100%"
};

export default function ContactConfig({
  data = DEFAULT_DATA,
  updateData
}: ContactConfigProps) {
  const d = { ...DEFAULT_DATA, ...data };

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-500">

      {/* TEXT CONTENT */}
      <Block title="Nội dung dẫn dắt" icon={Type}>
        <Input
          label="Tiêu đề chính"
          value={d.title}
          onChange={(v) => updateData({ ...d, title: v })}
          highlight
        />
        <Textarea
          label="Mô tả"
          value={d.description}
          onChange={(v) => updateData({ ...d, description: v })}
        />
      </Block>

      {/* CONTACT INFO */}
      <Block title="Thông tin liên hệ" icon={Mail}>
        <Grid>
          <Input icon={Mail} label="Email" value={d.email} onChange={(v) => updateData({ ...d, email: v })} />
          <Input icon={Phone} label="Hotline" value={d.phone} onChange={(v) => updateData({ ...d, phone: v })} />
          <Input icon={MapPin} label="Địa chỉ" value={d.address} onChange={(v) => updateData({ ...d, address: v })} />
        </Grid>
      </Block>

      {/* MAP */}
      <Block title="Google Map" icon={MapPin}>
        <Input
          icon={LinkIcon}
          label="Google Map URL"
          value={d.google_map_url}
          onChange={(v) => updateData({ ...d, google_map_url: v })}
        />
        <Textarea
          label="Google Map Embed (iframe)"
          value={d.google_map_embed}
          onChange={(v) => updateData({ ...d, google_map_embed: v })}
          rows={4}
        />
      </Block>

      {/* MEDIA */}
      <Block title="Hình ảnh / Video văn phòng" icon={Image}>
        <Grid>
          <Input
            icon={Image}
            label="Ảnh văn phòng (URL)"
            value={d.office_image_url}
            onChange={(v) => updateData({ ...d, office_image_url: v })}
          />
          <Input
            icon={Video}
            label="Video văn phòng (URL)"
            value={d.office_video_url}
            onChange={(v) => updateData({ ...d, office_video_url: v })}
          />
        </Grid>
      </Block>

      {/* SERVICES */}
      <Block title="Danh sách dịch vụ (Dropdown)" icon={AlignLeft}>
        <div className="space-y-3">
          {(d.services || []).map((s, i) => (
            <div key={i} className="flex gap-3">
              <input
                className="flex-1 p-3 bg-gray-50 rounded-xl font-medium outline-none focus:ring-2 ring-blue-100"
                value={s}
                onChange={(e) => {
                  const next = [...(d.services || [])];
                  next[i] = e.target.value;
                  updateData({ ...d, services: next });
                }}
              />
              <button
                onClick={() =>
                  updateData({
                    ...d,
                    services: d.services?.filter((_, idx) => idx !== i)
                  })
                }
                className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              updateData({
                ...d,
                services: [...(d.services || []), ""]
              })
            }
            className="flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            <Plus size={14} /> Thêm dịch vụ
          </button>
        </div>
      </Block>

      {/* CTA */}
      <Block title="CTA & Cam kết" icon={AlignLeft}>
        <Grid>
          <Input label="Nút CTA" value={d.cta_label} onChange={(v) => updateData({ ...d, cta_label: v })} />
          <Input label="Cam kết bảo mật" value={d.privacy_note} onChange={(v) => updateData({ ...d, privacy_note: v })} />
        </Grid>
      </Block>
    </div>
  );
}

/* ---------- UI PARTS ---------- */

const Block = ({ title, icon: Icon, children }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] border shadow-sm space-y-6">
    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-blue-600">
      <Icon size={14} /> {title}
    </h3>
    {children}
  </div>
);

const Grid = ({ children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const Input = ({ label, value, onChange, icon: Icon, highlight }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1">
      {Icon && <Icon size={10} />} {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-4 rounded-xl outline-none focus:ring-2 ${
        highlight
          ? "font-black text-[#E31B23] text-xl italic bg-gray-50 ring-red-100"
          : "bg-gray-50 ring-blue-100"
      }`}
    />
  </div>
);

const Textarea = ({ label, value, onChange, rows = 3 }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase text-gray-400">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-blue-100"
    />
  </div>
);
