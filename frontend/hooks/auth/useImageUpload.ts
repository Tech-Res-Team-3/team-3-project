import axios from "../../utils/axios";

export const useImageUpload = () => {
    // 1. Get a signed upload URL from backend
    const getSignedUrl = async (folder: string, filename: string, contentType: string = "image/jpeg") => {
        const res = await axios.post("/file-storage/signed-url", {
            path: filename,
            folder,
            contentType,
        });
        return res.data; // { url: signedUrl, filePath, publicUrl }
    };

    // 2. Upload the file to Firebase Storage using the signed URL
    const uploadToSignedUrl = async (signedUrl: string, fileBlob: Blob, contentType: string = "image/jpeg") => {
        await fetch(signedUrl, {
            method: "PUT",
            headers: { "Content-Type": contentType },
            body: fileBlob,
        });
    };

    // 3. Notify backend to save the image path in DB
    const saveImage = async (filePath: string, vehicleId?: number) => {
        const res = await axios.post("/file-storage/save-image", {
            filePath,
            vehicleId,
        });
        return res.data;
    };

    return { getSignedUrl, uploadToSignedUrl, saveImage };
};