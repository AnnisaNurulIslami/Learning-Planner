/**
 * Mendapatkan tanggal hari ini secara otomatis dalam format 'YYYY-MM-DD'
 * @return {string} Tanggal hari ini
 */
const getTodayStr = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
 
/**
 * Menghitung sisa hari secara otomatis dari tanggal hari ini ke tanggal deadline
 * @param {string} todayStr - Tanggal hari ini dengan format 'YYYY-MM-DD'
 * @param {string} deadlineStr - Tanggal deadline dengan format 'YYYY-MM-DD'
 * @return {number} Jumlah sisa hari (bisa 0 atau negatif jika sudah lewat)
 */
const getDaysLeft = (todayStr, deadlineStr) => {
    const today = new Date(todayStr);
    const deadline = new Date(deadlineStr);
 
    const timeDifference = deadline.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};
 
/**
 * Menghitung target penambahan progress harian yang diperlukan
 * @param {number} currentProgress - Progress saat ini dalam persen (0-100)
 * @param {number} daysLeft - Jumlah hari yang tersisa
 * @return {number} Target progress harian
 */
const calculateDailyTarget = (currentProgress, daysLeft) => {
    if (currentProgress < 0 || currentProgress > 100) {
        throw new Error('Progress harus berada di antara 0% sampai 100%');
    }
 
    // Jika sudah selesai
    if (currentProgress === 100) return 0;
 
    // Jika deadline hari ini, besok, atau sudah lewat
    if (daysLeft <= 1) {
        return 100 - currentProgress; // harus selesai hari ini
    }
 
    const remainingProgress = 100 - currentProgress;
    return Number((remainingProgress / daysLeft).toFixed(2));
};
 
/**
 * Menentukan status urgensi belajar berdasarkan beban target harian
 * @param {number} targetPerDay - Beban target progres per hari dalam persen
 * @param {number} daysLeft - Sisa hari hingga deadline
 * @return {string} Label status urgensi belajar
 */
const getStatus = (targetPerDay, daysLeft) => {
    if (targetPerDay <= 0) return '✅ SELESAI';
    if (daysLeft < 0) return '❌ DEADLINE TERLEWAT';
    if (daysLeft === 0) return '🚨 DEADLINE HARI INI';
    if (targetPerDay <= 4) return '🟢 AMAN';
    if (targetPerDay <= 8) return '🟡 PERLU DIPERCEPAT';
    return '🔴 DARURAT';
};
 
export { getTodayStr, getDaysLeft, calculateDailyTarget, getStatus };
 