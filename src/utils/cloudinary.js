export const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const cloudName = 'dy9vdjxmm'; // User provided cloud name
    const uploadPreset = 'travel_website_uploades'; // User provided preset

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
