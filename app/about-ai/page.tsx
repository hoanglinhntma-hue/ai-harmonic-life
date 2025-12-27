import { Mascot } from "@/components/Mascot";
import { Pill } from "@/components/Pill";
import { Section } from "@/components/Section";
import { CardGrid, InfoCard } from "@/components/CardGrid";
import { ButtonLink } from "@/components/ButtonLink";

export default function AboutAIPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <Pill>1) Giới thiệu & Thuyết minh AI</Pill>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              AI Harmonic Life – Dao động quanh ta
            </h1>
            <p className="max-w-3xl text-slate-700">
              Học Dao động điều hòa (Vật lý 11) và Hàm lượng giác (Toán 11) bằng
              mô phỏng trực quan + trợ giảng AI dẫn dắt tư duy.
            </p>
          </div>
          <div className="hidden sm:block">
            <Mascot />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/simulator">Bắt đầu mô phỏng</ButtonLink>
          <ButtonLink href="/tutor" variant="secondary">
            Thử hỏi Trợ giảng AI
          </ButtonLink>
          <ButtonLink href="/bgk" variant="secondary">
            Xem Trang BGK
          </ButtonLink>
        </div>
      </header>

      <div className="mt-6 grid gap-6">
        <Section
          title="AI làm gì?"
          subtitle="Trong ứng dụng này, AI hỗ trợ 5 nhóm nhiệm vụ."
        >
          <CardGrid>
            <InfoCard title="1) Phân tích phương trình dao động">
              Tự nhận diện các tham số <b>A</b>, <b>ω</b>, <b>φ</b> trong{" "}
              <span className="font-mono">x(t)=A·cos(ωt+φ)</span> (hoặc dạng tương
              đương) và suy ra các đại lượng liên quan như chu kỳ, tần số.
            </InfoCard>

            <InfoCard title="2) Diễn giải ý nghĩa vật lý">
              Ví dụ: “A càng lớn → vật dao động càng ‘mạnh’ (biên độ lớn hơn)”.
            </InfoCard>

            <InfoCard title="3) Kết nối Toán – Lý – Đời sống">
              Từ hiện tượng (AC, sóng âm, nhịp tim, thủy triều…) AI gợi ý mô hình
              hàm tuần hoàn phù hợp và giải thích ý nghĩa tham số.
            </InfoCard>

            <InfoCard title="4) Trợ giảng kiểu Socrates">
              AI đặt câu hỏi định hướng: vị trí, vận tốc, gia tốc, dấu – cực trị,
              quan hệ pha…, giúp học sinh tự lập luận.
            </InfoCard>

            <InfoCard title="5) Cá nhân hóa học tập">
              Dựa trên câu trả lời/nhiệm vụ đã làm, AI gợi ý mức độ tiếp theo và
              chỉ ra lỗi sai khái niệm hay gặp.
            </InfoCard>
          </CardGrid>
        </Section>

        <Section title="AI không làm gì?" subtitle="Mục 'ăn điểm' về đạo đức học thuật.">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="text-sm font-bold text-amber-900">
              AI KHÔNG thay thế tư duy người học:
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900/90">
              <li>
                Không chép nguyên văn lời giải SGK/đáp án mẫu để học sinh sao chép.
              </li>
              <li>Không “làm hộ toàn bộ” khi học sinh chưa thử giải.</li>
              <li>Không đưa ra hướng dẫn gian lận kiểm tra/thi cử.</li>
            </ul>
          </div>
        </Section>

        <Section title="Đạo đức – an toàn – giới hạn">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold">An toàn dữ liệu</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>
                  Không yêu cầu thông tin cá nhân nhạy cảm (không cần họ tên thật,
                  không cần số điện thoại).
                </li>
                <li>
                  Chỉ lưu dữ liệu học tập tối thiểu: tiến độ, điểm nhiệm vụ, lịch
                  sử thao tác học tập.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold">Giới hạn của AI</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>AI có thể sai/thiếu trong một số trường hợp nhập liệu đặc biệt.</li>
                <li>
                  Khuyến nghị học sinh đối chiếu với lý thuyết và giáo viên khi cần.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold">Cam kết giáo dục</div>
              <p className="mt-2 text-sm text-slate-700">
                “AI chỉ hỗ trợ học tập, không thay thế tư duy và trách nhiệm học tập
                của người học.”
              </p>
            </div>
          </div>
        </Section>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/simulator">Bắt đầu mô phỏng</ButtonLink>
          <ButtonLink href="/tutor" variant="secondary">
            Thử hỏi Trợ giảng AI
          </ButtonLink>
          <ButtonLink href="/bgk" variant="secondary">
            Xem Trang BGK
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}