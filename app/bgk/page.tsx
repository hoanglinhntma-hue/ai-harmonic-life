import { Pill } from "@/components/Pill";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ButtonLink";

export default function BGKPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <Pill>3) Trang BGK</Pill>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Tóm tắt chấm thi (đọc 30 giây là hiểu)
        </h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Mục tiêu – tính sáng tạo – hiệu quả – an toàn dữ liệu – minh chứng dùng được thật.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink href="/demo">Mở Chế độ Demo</ButtonLink>
          <ButtonLink href="/about-ai" variant="secondary">
            Xem Thuyết minh AI
          </ButtonLink>
        </div>
      </header>

      <div className="mt-6 grid gap-6">
        <Section title="Mục tiêu">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Giúp học sinh hiểu bản chất dao động điều hòa thông qua hàm số lượng giác.</li>
            <li>Kết nối Toán 11 ↔ Vật lý 11 ↔ đời sống, tăng năng lực mô hình hóa.</li>
            <li>Tăng hứng thú học tập bằng mô phỏng trực quan + tương tác.</li>
          </ul>
        </Section>

        <Section title="Tính sáng tạo">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>
              Mô phỏng dao động + đồ thị đồng thời (x–v–a) để “thấy Toán biến thành Vật lý”.
            </li>
            <li>
              AI “giải mã” phương trình dao động: tách tham số + diễn giải tự nhiên.
            </li>
            <li>Trợ giảng AI theo kiểu Socrates: hỏi – gợi mở – phản hồi theo ngữ cảnh mô phỏng.</li>
          </ul>
        </Section>

        <Section title="Hiệu quả giáo dục dự kiến">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold">Học sinh nắm vững</div>
              <p className="mt-2 text-sm text-slate-700">
                Vai trò A, ω, φ; quan hệ pha; cực trị; dấu của gia tốc…
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold">Học sinh hình thành</div>
              <p className="mt-2 text-sm text-slate-700">
                Năng lực mô hình hóa (từ hiện tượng → hàm số), năng lực tự học.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold">Giáo viên có</div>
              <p className="mt-2 text-sm text-slate-700">
                Thống kê tiến độ, lỗi sai phổ biến, mức độ hoàn thành theo lớp/nhiệm vụ.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Yếu tố AI (AI đảm nhiệm gì)">
          <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
            <li>Nhận dạng phương trình & tham số dao động</li>
            <li>Suy luận quan hệ Toán–Lý theo ngữ cảnh mô phỏng</li>
            <li>Cá nhân hóa gợi ý học tập</li>
            <li>Diễn giải bằng ngôn ngữ tự nhiên</li>
            <li>Phát hiện lỗi sai khái niệm phổ biến và đề xuất ôn tập</li>
          </ol>
        </Section>

        <Section title="An toàn dữ liệu – đạo đức">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Thu thập tối thiểu dữ liệu học tập, ưu tiên ẩn danh (mã lớp + nickname).</li>
            <li>Không lưu thông tin nhạy cảm.</li>
            <li>Có cảnh báo: “AI hỗ trợ học tập, không thay thế tư duy”.</li>
            <li>Cơ chế phân quyền: HS chỉ xem dữ liệu của mình, GV chỉ xem lớp mình.</li>
          </ul>
        </Section>

        <Section title="Minh chứng “dùng được thật”">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Chế độ Demo 1-click, có dữ liệu mẫu.</li>
            <li>Có lịch sử học tập và báo cáo tiến độ (mở rộng theo DB sau).</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/demo">Mở demo ngay</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Về trang chủ
            </ButtonLink>
          </div>
        </Section>
      </div>
    </main>
  );
}