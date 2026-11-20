
import { useEffect, useRef, useState } from "react";
import {
    MessageCircle,
    Send,
    Loader2,
    UserRound,
} from "lucide-react";

import {
    dangNhapFirebase,
    layDanhSachCuocTroChuyen,
    langNgheTinNhan,
    guiTinNhanAdmin,
} from "../../../services/firebaseChatService";

interface CuocTroChuyen {
    id: string;
    ownerUid: string;
    ownerName: string;
    createdAt: any;
}

interface TinNhan {
    id: string;
    senderId: string;
    senderRole: "OWNER" | "ADMIN";
    content: string;
    createdAt: any;
}

function dinhDangThoiGian(timestamp: any) {
    if (!timestamp?.toDate) return "";

    return timestamp.toDate().toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function QuanLyDeXuat() {
    const [dangTai, setDangTai] = useState(true);
    const [loi, setLoi] = useState("");
    const [danhSach, setDanhSach] = useState<CuocTroChuyen[]>([]);
    const [cuocTroChuyenChon, setCuocTroChuyenChon] =
        useState<CuocTroChuyen | null>(null);

    const [tinNhans, setTinNhans] = useState<TinNhan[]>([]);
    const [noiDung, setNoiDung] = useState("");
    const [dangGui, setDangGui] = useState(false);

    const khungTinNhanRef = useRef<HTMLDivElement>(null);

    // 1. Đăng nhập Firebase và lấy danh sách cuộc trò chuyện
    useEffect(() => {
        let huyDangKy = () => {};

        const khoiTao = async () => {
            try {
                await dangNhapFirebase();

                huyDangKy = layDanhSachCuocTroChuyen(
                    (duLieu) => {
                        const conversations =
                            duLieu as CuocTroChuyen[];

                        setDanhSach(conversations);

                        setCuocTroChuyenChon((hienTai) => {
                            if (!hienTai) {
                                return conversations[0] ?? null;
                            }

                            return conversations.find(
                                (item) => item.id === hienTai.id
                            ) ?? conversations[0] ?? null;
                        });

                        setDangTai(false);
                    }
                );
            } catch (error) {
                console.error(error);
                setLoi(
                    "Không thể kết nối Firebase. Vui lòng kiểm tra đăng nhập và quyền truy cập."
                );
                setDangTai(false);
            }
        };

        khoiTao();

        return () => {
            huyDangKy();
        };
    }, []);

    // 2. Lắng nghe tin nhắn của OWNER đang chọn
    useEffect(() => {
        if (!cuocTroChuyenChon) {
            setTinNhans([]);
            return;
        }

        const huyLangNghe = langNgheTinNhan(
            cuocTroChuyenChon.ownerUid,
            (duLieu) => {
                setTinNhans(duLieu as TinNhan[]);
            }
        );

        return () => {
            huyLangNghe();
        };
    }, [cuocTroChuyenChon?.ownerUid]);

    // 3. Tự động cuộn xuống tin nhắn mới nhất
    useEffect(() => {
        khungTinNhanRef.current?.scrollTo({
            top: khungTinNhanRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [tinNhans]);

    // 4. ADMIN gửi tin nhắn
    const handleGuiTinNhan = async () => {
        if (!cuocTroChuyenChon || !noiDung.trim() || dangGui) {
            return;
        }

        try {
            setDangGui(true);

            await guiTinNhanAdmin(
                cuocTroChuyenChon.ownerUid,
                noiDung
            );

            setNoiDung("");
        } catch (error) {
            console.error(error);
            setLoi("Không thể gửi tin nhắn. Vui lòng thử lại.");
        } finally {
            setDangGui(false);
        }
    };

    if (dangTai) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center gap-3">
                <Loader2 className="animate-spin" />
                <span>Đang kết nối...</span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="mb-2 text-2xl font-bold text-gray-800">
                Quản lý đề xuất
            </h1>

            <p className="mb-6 text-sm text-gray-500">
                Trao đổi với chủ HomeStay về các đề xuất tiện ích và dịch vụ.
            </p>

            {loi && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {loi}
                </div>
            )}

            <div className="grid h-[calc(100vh-220px)] min-h-[500px] grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:grid-cols-[300px_1fr]">

                {/* DANH SÁCH OWNER */}
                <div className="flex flex-col border-r border-gray-200">
                    <div className="border-b p-4">
                        <h2 className="font-semibold text-gray-800">
                            Danh sách đề xuất
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">
                            {danhSach.length} cuộc trò chuyện
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {danhSach.length === 0 ? (
                            <div className="p-6 text-center text-sm text-gray-400">
                                Chưa có đề xuất nào.
                            </div>
                        ) : (
                            danhSach.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        setCuocTroChuyenChon(item)
                                    }
                                    className={`flex w-full items-center gap-3 border-b p-4 text-left transition hover:bg-gray-50 ${
                                        cuocTroChuyenChon?.id === item.id
                                            ? "bg-blue-50"
                                            : ""
                                    }`}
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <UserRound size={21} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-medium text-gray-800">
                                            {item.ownerName || "Chủ HomeStay"}
                                        </p>
                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            {item.ownerUid}
                                        </p>
                                    </div>

                                    <MessageCircle
                                        size={17}
                                        className="shrink-0 text-blue-500"
                                    />
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* KHUNG CHAT */}
                <div className="flex min-w-0 flex-col">
                    {!cuocTroChuyenChon ? (
                        <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
                            <MessageCircle size={48} />
                            <p className="mt-3">
                                Chọn một cuộc trò chuyện để xem tin nhắn
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Tiêu đề cuộc trò chuyện */}
                            <div className="border-b p-4">
                                <h2 className="font-semibold text-gray-800">
                                    {cuocTroChuyenChon.ownerName || "Chủ HomeStay"}
                                </h2>
                                <p className="mt-1 text-xs text-green-600">
                                    Đang kết nối trực tuyến
                                </p>
                            </div>

                            {/* Danh sách tin nhắn */}
                            <div
                                ref={khungTinNhanRef}
                                className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5"
                            >
                                {tinNhans.map((tinNhan) => {
                                    const laAdmin =
                                        tinNhan.senderRole === "ADMIN";

                                    return (
                                        <div
                                            key={tinNhan.id}
                                            className={`flex ${
                                                laAdmin
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                                                    laAdmin
                                                        ? "rounded-br-none bg-blue-600 text-white"
                                                        : "rounded-bl-none border bg-white text-gray-800"
                                                }`}
                                            >
                                                <p className="mb-1 text-xs font-semibold opacity-70">
                                                    {laAdmin
                                                        ? "ADMIN"
                                                        : "OWNER"}
                                                </p>

                                                <p className="whitespace-pre-wrap break-words text-sm">
                                                    {tinNhan.content}
                                                </p>

                                                <p className="mt-2 text-right text-[10px] opacity-60">
                                                    {dinhDangThoiGian(
                                                        tinNhan.createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Ô nhập tin nhắn */}
                            <div className="flex items-center gap-3 border-t bg-white p-4">
                                <input
                                    type="text"
                                    value={noiDung}
                                    onChange={(e) =>
                                        setNoiDung(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleGuiTinNhan();
                                        }
                                    }}
                                    placeholder="Nhập nội dung trả lời..."
                                    className="h-11 min-w-0 flex-1 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                />

                                <button
                                    onClick={handleGuiTinNhan}
                                    disabled={!noiDung.trim() || dangGui}
                                    className="flex h-11 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {dangGui ? (
                                        <Loader2
                                            size={20}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Send size={19} />
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuanLyDeXuat;
