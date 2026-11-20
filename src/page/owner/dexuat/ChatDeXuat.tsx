
import { useEffect, useState, useRef } from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../../../config/firebase";
import {
    dangNhapFirebase,
    guiTinNhan,
} from "../../../services/firebaseChatService";

import {
    Send,
    MessageCircle,
    Loader2,
} from "lucide-react";

interface TinNhan {
    id: string;
    senderId: string;
    senderRole: "OWNER" | "ADMIN";
    content: string;
    createdAt: any;
}

function ChatDeXuat() {
    const [tinNhan, setTinNhan] = useState<TinNhan[]>([]);
    const [noiDung, setNoiDung] = useState("");
    const [dangTai, setDangTai] = useState(true);
    const [dangGui, setDangGui] = useState(false);
    const [loi, setLoi] = useState("");

    const khungTinNhanRef = useRef<HTMLDivElement>(null);

    // Đăng nhập Firebase và lắng nghe tin nhắn
    useEffect(() => {
        let huyLangNghe: (() => void) | undefined;
        let huy = false;

        const khoiTaoChat = async () => {
            try {
                setDangTai(true);
                setLoi("");

                const user = await dangNhapFirebase();

                if (huy) return;

                const messagesRef = collection(
                    db,
                    "conversations",
                    user.uid,
                    "messages"
                );

                const q = query(
                    messagesRef,
                    orderBy("createdAt", "asc")
                );

                huyLangNghe = onSnapshot(
                    q,
                    (snapshot) => {
                        setTinNhan(
                            snapshot.docs.map((item) => ({
                                id: item.id,
                                ...item.data(),
                            })) as TinNhan[]
                        );

                        setDangTai(false);
                    },
                    (error) => {
                        console.error(error);
                        setLoi("Không thể tải tin nhắn.");
                        setDangTai(false);
                    }
                );
            } catch (error) {
                console.error(error);
                setLoi("Không thể kết nối hệ thống chat.");
                setDangTai(false);
            }
        };

        khoiTaoChat();

        return () => {
            huy = true;
            huyLangNghe?.();
        };
    }, []);

    // Cuộn xuống tin nhắn mới nhất
    useEffect(() => {
        if (khungTinNhanRef.current) {
            khungTinNhanRef.current.scrollTop =
                khungTinNhanRef.current.scrollHeight;
        }
    }, [tinNhan]);

    // Gửi tin nhắn
    const handleGuiTinNhan = async () => {
        if (!noiDung.trim() || dangGui) return;

        try {
            setDangGui(true);
            setLoi("");

            await guiTinNhan(
                noiDung.trim(),
                "Chủ HomeStay"
            );

            setNoiDung("");
        } catch (error) {
            console.error(error);
            setLoi("Gửi tin nhắn thất bại.");
        } finally {
            setDangGui(false);
        }
    };

    // Gửi khi nhấn Enter
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleGuiTinNhan();
        }
    };

    // Định dạng thời gian
    const dinhDangThoiGian = (timestamp: any) => {
        if (!timestamp?.toDate) return "";

        return timestamp.toDate().toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
        });
    };

    return (
        <div className="min-h-[calc(100vh-100px)] bg-gray-50 p-4 md:p-6">

            <div className="mx-auto max-w-5xl">

                {/* Tiêu đề */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Đề xuất tiện ích & dịch vụ
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Trao đổi trực tiếp với quản trị viên StayWise
                        về các đề xuất tiện ích và dịch vụ.
                    </p>
                </div>

                {/* Khung chat */}
                <div className="flex h-[650px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Header chat */}
                    <div className="flex items-center gap-3 border-b border-gray-200 p-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <MessageCircle size={24} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                Quản trị viên StayWise
                            </h2>

                            <p className="text-sm text-green-600">
                                Kênh đề xuất tiện ích / dịch vụ
                            </p>
                        </div>

                    </div>

                    {/* Danh sách tin nhắn */}
                    <div
                        ref={khungTinNhanRef}
                        className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6"
                    >

                        {dangTai ? (
                            <div className="flex h-full items-center justify-center">
                                <Loader2
                                    className="animate-spin text-blue-600"
                                    size={32}
                                />
                            </div>
                        ) : tinNhan.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">

                                <div className="mb-4 rounded-full bg-blue-100 p-5 text-blue-600">
                                    <MessageCircle size={40} />
                                </div>

                                <h3 className="text-lg font-semibold text-gray-700">
                                    Chưa có cuộc trò chuyện
                                </h3>

                                <p className="mt-2 max-w-md text-sm text-gray-500">
                                    Hãy gửi đề xuất tiện ích hoặc dịch vụ.
                                    Quản trị viên sẽ phản hồi tại đây.
                                </p>

                            </div>
                        ) : (
                            <div className="space-y-4">

                                {tinNhan.map((item) => {
                                    const laTinNhanCuaMinh =
                                        item.senderRole === "OWNER";

                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex ${
                                                laTinNhanCuaMinh
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >

                                            <div
                                                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[70%] ${
                                                    laTinNhanCuaMinh
                                                        ? "rounded-br-sm bg-blue-600 text-white"
                                                        : "rounded-bl-sm border border-gray-200 bg-white text-gray-800"
                                                }`}
                                            >

                                                <p className={`mb-1 text-xs font-semibold ${
                                                    laTinNhanCuaMinh
                                                        ? "text-blue-100"
                                                        : "text-blue-600"
                                                }`}>
                                                    {laTinNhanCuaMinh
                                                        ? "Bạn"
                                                        : "ADMIN"}
                                                </p>

                                                <p className="whitespace-pre-wrap break-words">
                                                    {item.content}
                                                </p>

                                                <p className={`mt-2 text-right text-xs ${
                                                    laTinNhanCuaMinh
                                                        ? "text-blue-100"
                                                        : "text-gray-400"
                                                }`}>
                                                    {dinhDangThoiGian(
                                                        item.createdAt
                                                    )}
                                                </p>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>

                    {/* Báo lỗi */}
                    {loi && (
                        <div className="px-4 pt-2 text-sm text-red-600">
                            {loi}
                        </div>
                    )}

                    {/* Khung nhập */}
                    <div className="border-t border-gray-200 bg-white p-4">

                        <div className="flex items-end gap-3">

                            <textarea
                                value={noiDung}
                                onChange={(e) =>
                                    setNoiDung(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Nhập đề xuất tiện ích hoặc dịch vụ..."
                                rows={2}
                                maxLength={2000}
                                className="max-h-32 min-h-[48px] flex-1 resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                onClick={handleGuiTinNhan}
                                disabled={
                                    dangGui ||
                                    !noiDung.trim() ||
                                    dangTai
                                }
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                {dangGui ? (
                                    <Loader2
                                        className="animate-spin"
                                        size={20}
                                    />
                                ) : (
                                    <Send size={20} />
                                )}
                            </button>

                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                            Enter để gửi · Shift + Enter để xuống dòng
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ChatDeXuat;
