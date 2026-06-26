import { getDaysLeft, calculateDailyTarget, getStatus } from './planner.js';

const myCourses = [
    {
        name: 'Front-End Web',
        currentProgress: 100,
        deadline: '2026-06-23'
    },
    {
        name: 'Web React',
        currentProgress: 55,
        deadline: '2026-06-29'
    },
    {
        name: 'Dasar AI',
        currentProgress: 37,
        deadline: '2026-06-30'
    },
    {
        name: 'Machine Learning',
        currentProgress: 0,
        deadline: '2026-07-02'
    },
    {
        name: 'Deep Learning',
        currentProgress: 0,
        deadline: '2026-07-03'
    },
    {
        name: 'Pemrog Python',
        currentProgress: 0,
        deadline: '2026-07-01'
    },
    {
        name: 'Sistem ML',
        currentProgress: 0,
        deadline: '2026-07-04'
    }
];

// Parameter Tanggal
const today = '2026-06-19';

const daysLeft = getDaysLeft(today, myCourses.deadline);

console.log('==========================================================');
console.log(`  LEARNING PLANNER MULTI-DEADLINE (HARI INI: ${today})`);
console.log('==========================================================');

myCourses.forEach(course => {
    // Menghitung sisa hari berdasarkan deadline
    const daysLeft = getDaysLeft(today, course.deadline);

    // Menghitung target harian berdasarkan sisa hari
    const targetHarian = calculateDailyTarget(course.currentProgress, daysLeft);
    const status = getStatus(targetHarian);
    const sisaProgress = 100 - course.currentProgress;

    console.log(`Nama Kelas: ${course.name}`);
    console.log(`Progress: ${course.currentProgress}% (Sisa ${sisaProgress}%)`);
    console.log(`Target/Deadline: ${course.deadline} (Sisa ${daysLeft} Hari)`);
    console.log(`Beban Harian: Minimal tambah ${targetHarian}% per hari`);
    console.log(`Status: ${status}`);
    console.log('-----------------------------------------------');
});