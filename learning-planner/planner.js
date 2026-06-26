/**
 * Menghitung sisa hari secara otomatis dari tanggal hari ini ke tanggal deadline
 * @param {string} todayStr - Tanggal hari ini dengan format 'YYYY-MM-DD'
 * @param {string} deadlineStr - Tanggal deadline dengan format 'YYYY-MM-DD'
 * @return {number} Jumlah sisa hari
 */

const getDaysLeft = (todayStr, deadlineStr) => {
    const today = new Date(todayStr);
    const deadline = new Date(deadlineStr);

    const timeDifference = deadline.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

/**
 * Menghitung target penambahan progress harian yang diperlukan untuk mencapai target progress pada tanggal deadline
 * @param {number} currentProgress - Progress saat ini dalam persen (0-100)
 * @param {number} daysLeft - Jumlah hari yang tersisa untuk mencapai target
 * @return {number} Target progress harian 
 */

const calculateDailyTarget = (currentProgress, daysLeft) => {
    if (currentProgress < 0 || currentProgress > 100) {
        throw new Error('Progress harus berada di antara 0% sampai 100%');
    }
    if (daysLeft <= 0) {
        throw new Error('Sisa hari harus lebih besar dari 0');
    }
    
    const remainingProgress = 100 - currentProgress;
    return Number((remainingProgress / daysLeft).toFixed(2));
};

/**
 * Menentukan status urgensi belajar berdasarkan beban target harian
 * @param {number} targetPerDay - Beban target progres per hari dalam persen
 * @return {string} Label status urgensi belajar
*/

const getStatus = (targetPerDay) => {
    if (targetPerDay <= 0) return 'SELESAI';
    if (targetPerDay <= 4) return 'AMAN';
    if (targetPerDay <= 8) return 'PERLU DIPERCEPAT';
    return 'DARURAT';
};

export { getDaysLeft, calculateDailyTarget, getStatus };