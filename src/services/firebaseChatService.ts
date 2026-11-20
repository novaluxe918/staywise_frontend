
import {
    signInWithCustomToken,
    signOut
} from "firebase/auth";

import {
    collection,
    doc,
    getDoc,
    setDoc,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "firebase/firestore";

import { auth, db } from "../config/firebase";
import api from "./api";

// 1. Đăng nhập Firebase
export const dangNhapFirebase = async () => {
    const response = await api.get("/chat/firebase-token");

    const { firebaseToken } = response.data;

    if (!firebaseToken) {
        throw new Error("Không nhận được Firebase Token!");
    }

    const credential = await signInWithCustomToken(
        auth,
        firebaseToken
    );

    return credential.user;
};

// 2. Đăng xuất Firebase
export const dangXuatFirebase = async () => {
    await signOut(auth);
};

// 3. Gửi tin nhắn
export const guiTinNhan = async (
    noiDung: string,
    tenOwner: string
) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Bạn chưa đăng nhập Firebase!");
    }

    const idToken = await user.getIdTokenResult();
    const vaiTro = idToken.claims.role as "OWNER" | "ADMIN";

    if (vaiTro !== "OWNER" && vaiTro !== "ADMIN") {
        throw new Error("Bạn không có quyền gửi tin nhắn!");
    }

    const conversationRef = doc(
        db,
        "conversations",
        user.uid
    );

    const conversationSnapshot = await getDoc(conversationRef);

    // Nếu chưa có cuộc trò chuyện thì tạo mới
    if (!conversationSnapshot.exists()) {

        if (vaiTro !== "OWNER") {
            throw new Error("ADMIN không thể tự tạo cuộc trò chuyện!");
        }

        await setDoc(conversationRef, {
            ownerUid: user.uid,
            ownerName: tenOwner,
            createdAt: serverTimestamp()
        });
    }

    // Thêm tin nhắn vào cuộc trò chuyện
    const messagesRef = collection(
        conversationRef,
        "messages"
    );

    await addDoc(messagesRef, {
        senderId: user.uid,
        senderRole: vaiTro,
        content: noiDung.trim(),
        createdAt: serverTimestamp()
    });
};

// 4. Lắng nghe tin nhắn theo thời gian thực
export const langNgheTinNhan = (
    ownerUid: string,
    callback: (messages: any[]) => void
) => {

    const messagesRef = collection(
        db,
        "conversations",
        ownerUid,
        "messages"
    );

    const q = query(
        messagesRef,
        orderBy("createdAt", "asc")
    );

    return onSnapshot(q, (snapshot) => {

        const danhSach = snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
        }));

        callback(danhSach);
    });
};

// 5. ADMIN lấy danh sách cuộc trò chuyện
export const layDanhSachCuocTroChuyen = (
    callback: (conversations: any[]) => void
) => {

    const conversationsRef = collection(
        db,
        "conversations"
    );

    const q = query(
        conversationsRef,
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {

        const danhSach = snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
        }));

        callback(danhSach);
    });
};
