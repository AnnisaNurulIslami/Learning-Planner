import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getDaysLeft, calculateDailyTarget, getStatus } from './planner.js';
 
describe('Learning Planner Application Testing', () => {
 
    describe('Pengujian Fungsi getDaysLeft', () => {
        it('Harus menghitung selisih 14 hari dari 15 Juni ke 29 Juni 2026', () => {
            const days = getDaysLeft('2026-06-15', '2026-06-29');
            assert.strictEqual(days, 14);
        });
 
        it('Harus mengembalikan 0 jika deadline hari ini', () => {
            const days = getDaysLeft('2026-06-28', '2026-06-28');
            assert.strictEqual(days, 0);
        });
 
        it('Harus mengembalikan nilai negatif jika deadline sudah lewat', () => {
            const days = getDaysLeft('2026-06-28', '2026-06-23');
            assert.ok(days < 0);
        });
    });
 
    describe('Pengujian Fungsi calculateDailyTarget', () => {
        it('Harus menghasilkan target harian yang benar (Happy Path)', () => {
            const target = calculateDailyTarget(40, 14);
            assert.strictEqual(target, 4.29);
        });
 
        it('Harus mengembalikan 0 jika progress sudah 100%', () => {
            const target = calculateDailyTarget(100, 5);
            assert.strictEqual(target, 0);
        });
 
        it('Harus mengembalikan sisa progress jika deadline hari ini (daysLeft = 0)', () => {
            const target = calculateDailyTarget(60, 0);
            assert.strictEqual(target, 40);
        });
 
        it('Harus mengembalikan sisa progress jika deadline besok (daysLeft = 1)', () => {
            const target = calculateDailyTarget(70, 1);
            assert.strictEqual(target, 30);
        });
 
        it('Harus memicu error jika input progress di luar batas (Negative Path)', () => {
            assert.throws(() => {
                calculateDailyTarget(150, 14);
            }, /Progress harus berada di antara 0% sampai 100%/);
        });
    });
 
    describe('Pengujian Fungsi getStatus', () => {
        it('Harus mengembalikan SELESAI jika targetPerDay 0', () => {
            assert.strictEqual(getStatus(0, 5), '✅ SELESAI');
        });
 
        it('Harus mengembalikan DEADLINE TERLEWAT jika daysLeft negatif', () => {
            assert.strictEqual(getStatus(50, -3), '❌ DEADLINE TERLEWAT');
        });
 
        it('Harus mengembalikan DEADLINE HARI INI jika daysLeft 0', () => {
            assert.strictEqual(getStatus(40, 0), '🚨 DEADLINE HARI INI');
        });
 
        it('Harus mengembalikan status sesuai kategori beban harian', () => {
            assert.strictEqual(getStatus(2, 10),  '🟢 AMAN');
            assert.strictEqual(getStatus(5, 10),  '🟡 PERLU DIPERCEPAT');
            assert.strictEqual(getStatus(10, 10), '🔴 DARURAT');
        });
    });
 
});